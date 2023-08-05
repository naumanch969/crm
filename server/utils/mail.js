export const sendMail = async (to, subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: { user: process.env.SENDER_EMAIL, pass: process.env.SENDER_EMAIL_PASSWORD }
        });
        const info = await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: to,
            subject: subject,
            html: html,
        });
        transporter.sendMail(info)

    } catch (error) {

    }
}