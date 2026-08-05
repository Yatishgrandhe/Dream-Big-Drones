import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const submissionStatus = v.union(
  v.literal("new"),
  v.literal("read"),
  v.literal("replied"),
  v.literal("archived"),
);

export default defineSchema({
  ...authTables,
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    location: v.string(),
    shootType: v.union(
      v.literal("Property or place"),
      v.literal("Event or gathering"),
      v.literal("Brand story or campaign"),
      v.literal("Something else"),
    ),
    preferredDate: v.optional(v.string()),
    projectDetails: v.string(),
    consent: v.boolean(),
    status: submissionStatus,
    createdAt: v.number(),
    sourcePage: v.optional(v.string()),
    notificationSent: v.boolean(),
    intake: v.optional(v.any()),
  })
    .index("by_status_and_createdAt", ["status", "createdAt"])
    .index("by_email", ["email"])
    .index("by_createdAt", ["createdAt"]),
  submissionMetrics: defineTable({
    key: v.string(),
    value: v.number(),
  }).index("by_key", ["key"]),
});
