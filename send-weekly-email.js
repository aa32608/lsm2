// This script can be used to trigger the weekly marketing emails via the backend API.
// You can run it with: node send-weekly-email.js
// Make sure to set the ADMIN_SECRET_KEY and API_BASE environment variables.

import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const API_BASE = process.env.API_BASE || "http://localhost:5000";
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY;

async function triggerWeeklyEmails() {
  if (!ADMIN_SECRET_KEY) {
    console.error("ADMIN_SECRET_KEY is not set in .env");
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/api/admin/send-weekly-marketing`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ adminKey: ADMIN_SECRET_KEY }),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(`Successfully triggered weekly emails. Sent to ${data.sentCount} users.`);
    } else {
      console.error("Failed to trigger weekly emails:", data.error || response.statusText);
    }
  } catch (error) {
    console.error("Error triggering weekly emails:", error);
  }
}

triggerWeeklyEmails();
