const nodemailer = require('nodemailer');
const base64Img = require('base64-img');

module.exports.sendEmail = async (req, res) => {
  const email = req.body.email;
  const img = req.body.image;
  const userAnswersId = req.body.userAnswersId;

  base64Img.img(img, './public/images', userAnswersId, function (err) {
    if (err) console.log(err);
  });

  const output = `
    <h3>Добрый день!</h3>
    <p>Результат Вашего теста </p>
    <img src="https://testit.co.ua/images/${userAnswersId}.png" alt="image graph result" width="350" height="200"/>
    <p>Для более подробного ознакомления с результатом, перейдите по ссылке ниже</p>
    <p>Пожалуйста нажмите <a href="https://testit.co.ua/result/${userAnswersId}">тут</a></p>
  `;

  // console.log(output);
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
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Test_IT 👻" <testit@rizne.in.ua>', // sender address
      to: email, // list of receivers
      subject: 'Результат вашего теста ✔', // Subject line
      html: output // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    res.status(200).json({
      message: 'Email send success'
    });
  }

  await main().catch(console.error);
};
