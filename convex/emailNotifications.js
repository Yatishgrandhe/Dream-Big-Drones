"use node";

import { internal } from "./_generated/api";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[character]);
}

export const sendSubmission = internalAction({
  args: { submissionId: v.id("contactSubmissions") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.NOTIFICATION_TO_EMAIL;
    if (!apiKey || !recipient) return null;
    const submission = await ctx.runQuery(internal.contacts.getForNotification, { id: args.submissionId });
    if (!submission) return null;
    const details = [
      ["Name", submission.name], ["Email", submission.email], ["Phone", submission.phone ?? "Not provided"],
      ["Location", submission.location], ["Shoot type", submission.shootType], ["Preferred date", submission.preferredDate ?? "Flexible"],
    ].map(([label, value]) => `<tr><td style="padding:8px 14px 8px 0;color:#5B6670">${label}</td><td style="padding:8px 0;color:#102C46"><strong>${escapeHtml(value)}</strong></td></tr>`).join("");
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Dream Big Drones <onboarding@resend.dev>", to: [recipient],
        subject: `New Dream Big Drones inquiry — ${submission.name}`,
        html: `<main style="font-family:Arial,sans-serif;padding:32px;max-width:640px"><p style="color:#D99027;font-size:12px;font-weight:700;letter-spacing:.12em;text-transform:uppercase">New project inquiry</p><h1 style="color:#102C46;font-size:30px">${escapeHtml(submission.name)} wants to talk about a view.</h1><table style="border-collapse:collapse;margin:24px 0">${details}</table><h2 style="color:#102C46;font-size:18px">Project details</h2><p style="color:#102C46;line-height:1.7;white-space:pre-wrap">${escapeHtml(submission.projectDetails)}</p></main>`,
      }),
    });
    if (!response.ok) throw new Error(`Resend notification failed with ${response.status}.`);
    await ctx.runMutation(internal.contacts.markNotificationSent, { id: args.submissionId });
    return null;
  },
});
