import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, subject, description, to } = req.body;

  // Validate required fields
  if (!email || !subject || !description || !to) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: to,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      text: `
        Nova mensagem do formulário de contacto:
        
        Email: ${email}
        Assunto: ${subject}
        
        Mensagem:
        ${description}
      `,
      html: `
        <h2>Nova mensagem do formulário de contacto</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${description.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
} 