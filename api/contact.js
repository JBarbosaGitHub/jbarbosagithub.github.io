import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const { email, subject, description } = req.body;

  // Validate required fields
  if (!email || !subject || !description) {
    return res.status(400).json({ message: 'Faltam campos obrigatórios.' });
  }

  const smtpPort = Number(process.env.SMTP_PORT);
  const isSecure = smtpPort === 465;

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: isSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Formulário de Contacto: ${subject}`,
      text: `Nova mensagem do formulário de contacto:\n\nEmail: ${email}\nAssunto: ${subject}\n\nMensagem:\n${description}`,
      html: `<h2>Nova mensagem do formulário de contacto</h2><p><strong>Email:</strong> ${email}</p><p><strong>Assunto:</strong> ${subject}</p><p><strong>Mensagem:</strong></p><p>${description.replace(/\n/g, '<br>')}</p>`
    });

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar email:', error);
    res.status(500).json({ message: 'Erro ao enviar email.' });
  }
} 