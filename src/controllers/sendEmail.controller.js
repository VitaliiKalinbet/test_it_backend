const nodemailer = require('nodemailer');
const base64Img = require('base64-img');

module.exports.sendEmail = async (req, res) => {
  const email = req.body.email;
  const img = req.body.image;
  const userAnswersId = req.body.userAnswersId;

    base64Img.img(img, './public/images', userAnswersId, function (err) {
    if (err) {
      console.log(err);
      res.status(404).json({
          message: err.message
        });
    }
  });

  const output = `
    <h3>Добрый день!</h3>
    <p>Результат Вашего теста </p>
    <img src="https://testit.co.ua/images/${userAnswersId}.png" alt="image graph result" width="350" height="200"/>
    <p>Для более подробного ознакомления с результатом, перейдите по ссылке ниже</p>
    <p>Пожалуйста нажмите <a href="https://testit.co.ua/result/${userAnswersId}">тут</a></p>
  `;
   //async..await is not allowed in global scope, must use a wrapper
  function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testit.goit@gmail.com', // generated ethereal user
        pass: 'goit34GH@#' // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Test_IT 👻" <testit.goit@gmail.com>', // sender address
      to: email, // list of receivers
      subject: 'Hello it you result test ✔', // Subject line
      html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
      if(err) {
        console.log(err);
        res.status(404).json({
          message: err.message
        });
      } else {
        console.log(info);
        res.status(200).json({
          message: 'Email send success'
        });
      }
});

    res.status(200).json({
      message: 'Email send success'
    });
  }

  main();
};
