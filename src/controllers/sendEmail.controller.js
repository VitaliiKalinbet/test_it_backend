// const nodemailer = require('nodemailer');
const emailJS	= require('emailjs');

module.exports.sendEmail = (req, res) => {

  const email = req.body.email;
  const img = req.body.image;
  const userAnswersId = req.body.userAnswersId;

  const output = `
    <h3>Hello,</h3>
    <p>You test result</p>
    <img src="${img}" alt="image graph result"/>
    <p>if you want see detail result</p>
    <p>please click to this <a href="http://194.44.175.186:41410/result/${userAnswersId}">link</a></p>
  `;

const server 	= emailJS.server.connect({
  user:    'goit',
  password:'goit34GH@#',
  host:    'smtp.testit.co.ua',
  ssl:     true
});

// send the message and get a callback with an error or details of the message that was sent
server.send({
  text:    output,
  from:    'TestIT <result@testit.co.ua>',
  to:      email,
  subject: 'testing emailjs'
}, function(err, message) {
  console.log(err || message);
});

res.status(200).json({message: 'email send successfully' });
  // async..await is not allowed in global scope, must use a wrapper
  // async function main() {
  //   // create reusable transporter object using the default SMTP transport
  //   let transporter = nodemailer.createTransport({
  //     host: 'mail.rizne.in.ua',
  //     port: 465,
  //     secure: true, // true for 465, false for other ports
  //     auth: {
  //       user: 'testit@rizne.in.ua', // generated ethereal user
  //       pass: 'testIT123TEST' // generated ethereal password
  //     }
  //   });

  //   // setup email data with unicode symbols
  //   let mailOptions = {
  //     from: '"Test_IT 👻" <testit@rizne.in.ua>', // sender address
  //     to: email, // list of receivers
  //     subject: 'Hello it you result test ✔', // Subject line
  //     html: output // html body
  //   };

  //   // send mail with defined transport object
  //   let info = await transporter.sendMail(mailOptions);

  //   console.log('Message sent: %s', info.messageId);
  //   // Preview only available when sending through an Ethereal account
  //   console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

  //   res.status(200).json({
  //     message: 'Email send success'
  //   });
  //   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  //   // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  // }

  // main().catch(console.error);
};
