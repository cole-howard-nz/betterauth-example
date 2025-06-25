import nodemailer from 'nodemailer'

interface SendEmailProps {
  to: string,
  text: string,
  subject: string,
}

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  }
})

export const sendEmail = async ({ to, text, subject }: SendEmailProps) => {
  await transporter.sendMail({
    to,
    text,
    subject,
    from: process.env.EMAIL_FROM,
    html: 
    `
    <p>You requested a password reset</p>
    <p>${ text }</p>

    <p>If you did not request a reset. Disregard this email</p>
    `
  })
}