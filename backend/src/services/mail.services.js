import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: config.EMAIL_USER,
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET,
        refreshToken: config.GOOGLE_REFRESH_TOKEN
    }

})

transporter.verify((error, success) => {
    if (error) {
        console.log("Error setting up email transporter", error);
    } else {
        console.log("✅ Email transporter is ready to send messages");
    }
})


export const sendMail = async (to, subject, text, html) => {
    const mailOptions = {
        from: config.EMAIL_USER,
        to,
        subject,
        text,
        html
    }
    try {
        const response = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to} with subject: ${subject}`);

        return response;
    }
    catch (error) {
        console.error(`Error sending email to ${to} with subject: ${subject}`, error);
        throw new Error("Failed to send email");
    }
}