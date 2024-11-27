import transporter from '../email';

export const sendWelcomeEmail = async (email: string, name: string) => {
  const mailOptions = {
    from: '"Explora Perú" <adelle.pollich@ethereal.email>',
    to: email,
    subject: '¡Bienvenido a Explora Perú!',
    text: `Hola ${name}, gracias por unirte a nuestra comunidad.`,
    html: `<h1>Hola ${name}!</h1><p>Gracias por unirte a Explora Perú. ¡Estamos emocionados de ayudarte a explorar el Perú!</p>`
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Resultado del envío:', result);
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${email}`);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    throw new Error('No se pudo enviar el correo.');
  }
};
