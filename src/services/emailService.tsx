import SMTP_CONFIG from '../config/smtp';
import * as nodemailer from "nodemailer";

async function sendEmailData(transporter, text, subject, from, to) {
    const mailSend = await transporter.sendMail({
        text: {text},
        subject: {subject},
        from: {from},
        to: {to},
    });
}

export function sendEmailService(text, subject, from, to) {

    const transporter = nodemailer.createTransport({
        host: SMTP_CONFIG.host,
        port: SMTP_CONFIG.port,
        secure: false,
        auth: {
            user: SMTP_CONFIG.user,
            pass: SMTP_CONFIG.pass,
        },
        tls: {
            rejectUnauthorized: false
        }

});
    sendEmailData(transporter, text, subject, from, to)
}