const nodemailer = require('nodemailer');

module.exports.sendEmail = (req, res) => {
  const output = `
    <h3>Hello ${req.body.name},</h3>
    <p>You test message</p>
    <p>${req.body}</p>
  `;

  // async..await is not allowed in global scope, must use a wrapper
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: 'mail.rizne.in.ua',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'testit@rizne.in.ua', // generated ethereal user
        pass: 'testIT123TEST' // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Test_IT 👻" <testit@rizne.in.ua>', // sender address
      to: req.body.email, // list of receivers
      subject: 'Hello it test ✔', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.render('contact', {msg: 'Email has been sent'});
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

  main().catch(console.error);
};
