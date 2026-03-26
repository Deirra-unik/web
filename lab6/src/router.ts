import Router from '@koa/router';
import type { Context } from 'koa';
import { sendContactEmail } from './mailer';

const router = new Router();

interface ContactBody {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/api/contact', async (ctx: Context) => {
    const { name, email, subject, message } = ctx.request.body as ContactBody;

    if (!name || !email || !subject || !message) {
        ctx.status = 400;
        ctx.body = { success: false, error: "Усі поля обов'язкові." };
        return;
    }

    if (!emailRegex.test(email)) {
        ctx.status = 400;
        ctx.body = { success: false, error: 'Некоректний формат email.' };
        return;
    }

    try {
        await sendContactEmail({ name, email, subject, message });
        ctx.status = 200;
        ctx.body = { success: true, message: 'Лист успішно надіслано!' };
    } catch (err) {
        console.error('Помилка відправки:', err);
        ctx.status = 500;
        ctx.body = { success: false, error: 'Помилка сервера при надсиланні листа.' };
    }
});

export default router;