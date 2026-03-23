"use server";

import { getResend } from "@/lib/resend";
import { redirect } from "next/navigation";

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: "Final Touch <hello@finaltouchsports.com>",
      to: "finaltouch2026.us@gmail.com",
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    return { success: true, message: "Thank you for your message." };
  } catch (error) {
    console.error("Error sending contact email:", error);
    return { success: false, message: "Failed to send message. Please try again later." };
  }
}

export async function sendAthleteApplication(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const sport = formData.get("sport") as string;
  const handle = formData.get("handle") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !sport || !handle || !message) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const resend = getResend();
    await resend.emails.send({
      from: "Final Touch Sponsorship <sponsorship@finaltouchsports.com>",
      to: "finaltouch2026.us@gmail.com",
      subject: `New Athlete Application: ${name} (${sport})`,
      text: `Name: ${name}\nEmail: ${email}\nSport: ${sport}\nSocial: ${handle}\n\nWhy Final Touch?:\n${message}`,
    });

    return { success: true, message: "Application submitted successfully." };
  } catch (error) {
    console.error("Error sending athlete application:", error);
    return { success: false, message: "Failed to submit application. Please try again." };
  }
}
