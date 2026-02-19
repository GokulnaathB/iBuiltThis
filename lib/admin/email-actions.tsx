"use server";

import { resend } from "../email";

export async function sendRejectionMail(email: string, productName: string) {
  await resend.emails.send({
    from: "iBuiltThis <onboarding@resend.dev>",
    to: email,
    subject: "Update on your product submission",
    html: `
        <p>Dear there,</p>

        <p>Thank you for submitting <strong>${productName}</strong>.</p>

        <p>After careful consideration, we regret to inform you that your product doesn't align with our platform's current goals.</p>

        <p>We truly appreciate your effort and encourage you to keep building!</p>

        <p>Best regards, <br/>IbUiltThis Team</p>
`,
  });
}
export async function sendApprovalMail(email: string, productName: string) {
  await resend.emails.send({
    from: "iBuiltThis <onboarding@resend.dev>",
    to: email,
    subject: "Update on your product submission",
    html: `
    <p>Dear there,</p>

    <p>Thank you for submitting <strong>${productName}</strong>.</p>

    <p>And we absolutely love it!!!! It's now live on our page. Go have a look ;)</p>

    <p>Best Regards, <br/>iBuiltThis Team</p>
    `,
  });
}
