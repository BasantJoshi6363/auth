import nodemailer from "nodemailer"

export const sendMail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            html: `<h1>Hi, Welcome to our website</h1> your verification code is ${text}`,
            subject,
            text,
        };
        await transporter.sendMail(mailOptions);
    } catch (error) {
        return error.message;
    }
}
