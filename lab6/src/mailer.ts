import Mailjet from 'node-mailjet';

const mailjet = Mailjet.apiConnect(
    process.env.MAILJET_API_KEY as string,
    process.env.MAILJET_API_SECRET as string
);

console.log(process.env.MAILJET_API_KEY,  process.env.MAILJET_API_SECRET)

export interface ContactPayload {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function sendContactEmail(data: ContactPayload): Promise<void> {
    const { name, email, subject, message } = data;

    const htmlMessage = escapeHtml(message).replace(/\n/g, '<br>');
    const request = await mailjet
        .post('send', { version: 'v3.1' })
        .request({
            Messages: [
                {
                    From: {
                        Email: "pilot@mailjet.com",
                        Name: "Mailjet Pilot"
                    },
                    To: [
                        {
                            Email: "passenger1@mailjet.com",
                            Name: "passenger 1"
                        }
                    ],
                    Subject: "Your email flight plan!",
                    TextPart: "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
                    HTMLPart: "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
                }
            ]
        })

    console.log(request.response.data);
}