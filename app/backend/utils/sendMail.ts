require("dotenv").config();
import nodemailer, { Transporter } from "nodemailer"
import ejs from "ejs";
import path from "path";

interface IEmailOptions {
    email: string,
    subject: string,
    template: string,
    data: { [key: string]: any },
}

const sendMail = async (options: IEmailOptions): Promise<void> => {
 
    const smtpSetting = {
        service: process.env.SMTP_SERVICE,
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: true,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    }

    const transporter: Transporter = nodemailer.createTransport(smtpSetting);

    const { email, subject, template, data } = options;

    // Get the path to the email templae file
    const templatePath = path.join(__dirname, "../mails", template)

    // Render the email tamplate with EJS
    const html = await ejs.renderFile(templatePath, data);

    const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html
    }

    await transporter.sendMail(mailOptions);
}

export default sendMail;