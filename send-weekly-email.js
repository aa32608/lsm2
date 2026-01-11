const admin = require("firebase-admin");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

// Initialize Firebase Admin SDK
admin.initializeApp();

const db = admin.database();
const mailgun = new Mailgun(formData);

// Your Mailgun API key and domain
const mailgunClient = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY, // Store your API key in environment variables
});
const mailgunDomain = "your-mailgun-domain"; // Replace with your Mailgun domain

// Function to send weekly marketing emails
exports.sendWeeklyMarketingEmails = async (req, res) => {
  try {
    // 1. Fetch all users from the database
    const usersRef = db.ref("users");
    const snapshot = await usersRef.once("value");
    const users = snapshot.val();

    if (!users) {
      console.log("No users found.");
      res.status(200).send("No users found.");
      return;
    }

    // 2. Filter for subscribed users
    const subscribedUsers = Object.values(users).filter(
      (user) => user.subscribedToMarketing
    );

    if (subscribedUsers.length === 0) {
      console.log("No users subscribed to marketing emails.");
      res.status(200).send("No users subscribed to marketing emails.");
      return;
    }

    // 3. Compose the email
    const emailSubject = "Your Weekly Update from Local Support Market!";
    const emailText = `
      Hello,

      Here's your weekly update from Local Support Market. 
      Check out the latest listings and offers!

      [Link to your website]

      Best,
      The Local Support Market Team
    `;

    // 4. Send the email to each subscribed user
    const emailPromises = subscribedUsers.map((user) => {
      const messageData = {
        from: `Local Support Market <mailgun@${mailgunDomain}>`,
        to: user.email,
        subject: emailSubject,
        text: emailText,
      };
      return mailgunClient.messages.create(mailgunDomain, messageData);
    });

    await Promise.all(emailPromises);

    console.log(`Weekly emails sent to ${subscribedUsers.length} users.`);
    res
      .status(200)
      .send(`Weekly emails sent to ${subscribedUsers.length} users.`);
  } catch (error) {
    console.error("Error sending weekly emails:", error);
    res.status(500).send("Error sending weekly emails.");
  }
};
