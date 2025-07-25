

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_PORT == "465", // true for port 465, false for 587
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD,
    },
});

export const sendMail = async (email, subject, content) => {
    try {
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: email,
            subject,
            html: content,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Mail has been sent:", info.messageId);
    } catch (error) {
        console.error("❌ Error sending email:", error.message);
    }
};


