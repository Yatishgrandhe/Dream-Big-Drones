import { RateLimiter, HOUR, MINUTE } from "@convex-dev/rate-limiter";
import { getAuthUserId } from "@convex-dev/auth/server";
import { paginationOptsValidator, paginationResultValidator } from "convex/server";
import { ConvexError, v } from "convex/values";
import { components } from "./_generated/api";
import { internal } from "./_generated/api";
import { internalMutation, internalQuery, mutation, query } from "./_generated/server";

const statuses = v.union(v.literal("new"), v.literal("read"), v.literal("replied"), v.literal("archived"));
const shootTypes = v.union(
  v.literal("Property or place"),
  v.literal("Event or gathering"),
  v.literal("Brand story or campaign"),
  v.literal("Something else"),
);
const submission = v.object({
  _id: v.id("contactSubmissions"),
  _creationTime: v.number(),
  name: v.string(),
  email: v.string(),
  phone: v.optional(v.string()),
  location: v.string(),
  shootType: shootTypes,
  preferredDate: v.optional(v.string()),
  projectDetails: v.string(),
  consent: v.boolean(),
  status: statuses,
  createdAt: v.number(),
  sourcePage: v.optional(v.string()),
  notificationSent: v.boolean(),
});

const rateLimiter = new RateLimiter(components.rateLimiter, {
  contactForm: { kind: "token bucket", rate: 4, period: HOUR, capacity: 4 },
  failedAdminLogin: { kind: "fixed window", rate: 5, period: MINUTE },
});

function emailKey(email) {
  return email.trim().toLowerCase();
}

function dayKey(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 10);
}

async function incrementMetric(ctx, key, delta) {
  const metric = await ctx.db.query("submissionMetrics").withIndex("by_key", (q) => q.eq("key", key)).unique();
  if (metric) await ctx.db.patch(metric._id, { value: metric.value + delta });
  else await ctx.db.insert("submissionMetrics", { key, value: delta });
}

async function requireAdmin(ctx) {
  const userId = await getAuthUserId(ctx);
  const administrator = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const user = userId ? await ctx.db.get(userId) : null;
  if (!user || !administrator || user.email?.toLowerCase() !== administrator) {
    throw new ConvexError("Not authorized.");
  }
}

export const submit = mutation({
  args: {
    name: v.string(), email: v.string(), phone: v.optional(v.string()), location: v.string(),
    shootType: shootTypes, preferredDate: v.optional(v.string()), projectDetails: v.string(),
    consent: v.boolean(), sourcePage: v.optional(v.string()), honeypot: v.optional(v.string()),
  },
  returns: v.id("contactSubmissions"),
  handler: async (ctx, args) => {
    if (args.honeypot) throw new ConvexError("Unable to send this message.");
    const email = emailKey(args.email);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ConvexError("Enter a valid email address.");
    if (!args.consent) throw new ConvexError("Consent is required to send your details.");
    if (args.name.trim().length < 2 || args.location.trim().length < 2 || args.projectDetails.trim().length < 12) {
      throw new ConvexError("Please complete the required project details.");
    }
    const limit = await rateLimiter.limit(ctx, "contactForm", { key: email });
    if (!limit.ok) throw new ConvexError("Please wait a few minutes before sending another inquiry.");
    const createdAt = Date.now();
    const id = await ctx.db.insert("contactSubmissions", {
      name: args.name.trim(), email, ...(args.phone?.trim() ? { phone: args.phone.trim() } : {}),
      location: args.location.trim(), shootType: args.shootType,
      ...(args.preferredDate ? { preferredDate: args.preferredDate } : {}),
      projectDetails: args.projectDetails.trim(), consent: true, status: "new", createdAt,
      ...(args.sourcePage ? { sourcePage: args.sourcePage } : {}), notificationSent: false,
    });
    await incrementMetric(ctx, "total", 1);
    await incrementMetric(ctx, "new", 1);
    await incrementMetric(ctx, `day:${dayKey(createdAt)}`, 1);
    await ctx.scheduler.runAfter(0, internal.emailNotifications.sendSubmission, { submissionId: id });
    return id;
  },
});

export const getForNotification = internalQuery({
  args: { id: v.id("contactSubmissions") },
  returns: v.union(submission, v.null()),
  handler: async (ctx, args) => await ctx.db.get(args.id),
});

export const markNotificationSent = internalMutation({
  args: { id: v.id("contactSubmissions") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { notificationSent: true });
    return null;
  },
});

export const listForAdmin = query({
  args: { status: v.optional(statuses), email: v.optional(v.string()), paginationOpts: paginationOptsValidator },
  returns: paginationResultValidator(submission),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    if (args.email?.trim()) {
      return await ctx.db.query("contactSubmissions").withIndex("by_email", (q) => q.eq("email", emailKey(args.email))).order("desc").paginate(args.paginationOpts);
    }
    if (args.status) {
      return await ctx.db.query("contactSubmissions").withIndex("by_status_and_createdAt", (q) => q.eq("status", args.status)).order("desc").paginate(args.paginationOpts);
    }
    return await ctx.db.query("contactSubmissions").withIndex("by_createdAt").order("desc").paginate(args.paginationOpts);
  },
});

export const getForAdmin = query({
  args: { id: v.id("contactSubmissions") },
  returns: v.union(submission, v.null()),
  handler: async (ctx, args) => { await requireAdmin(ctx); return await ctx.db.get(args.id); },
});

export const metricsForAdmin = query({
  args: {},
  returns: v.object({ total: v.number(), newCount: v.number(), today: v.number() }),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const today = dayKey(Date.now());
    const [total, newCount, todayCount] = await Promise.all([
      ctx.db.query("submissionMetrics").withIndex("by_key", (q) => q.eq("key", "total")).unique(),
      ctx.db.query("submissionMetrics").withIndex("by_key", (q) => q.eq("key", "new")).unique(),
      ctx.db.query("submissionMetrics").withIndex("by_key", (q) => q.eq("key", `day:${today}`)).unique(),
    ]);
    return { total: total?.value ?? 0, newCount: newCount?.value ?? 0, today: todayCount?.value ?? 0 };
  },
});

export const updateStatus = mutation({
  args: { id: v.id("contactSubmissions"), status: statuses },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const row = await ctx.db.get(args.id);
    if (!row) throw new ConvexError("Submission not found.");
    if (row.status === args.status) return null;
    if (row.status === "new") await incrementMetric(ctx, "new", -1);
    if (args.status === "new") await incrementMetric(ctx, "new", 1);
    await ctx.db.patch(args.id, { status: args.status });
    return null;
  },
});
