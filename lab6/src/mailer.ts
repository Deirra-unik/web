import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,
    auth: {
        user: 'apikey',
        pass: process.env.SEND_GRID
    }
});

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
    const { name, email, subject, message } = data;

    await transporter.sendMail({
        from: process.env.OWNER_EMAIL as string,
        to: process.env.OWNER_EMAIL as string,
        subject: `[Контакт] ${subject}`,
        html: `
    <h2>Нове повідомлення з форми</h2>
    <p><strong>Ім'я:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Тема:</strong> ${subject}</p>
    <p><strong>Повідомлення:</strong><br>${message}</p>
  `,
    });
}