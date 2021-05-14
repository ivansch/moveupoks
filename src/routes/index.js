const {
  Router
} = require('express');
const router = Router();

const nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var mailAccountUser = 'info@moveuphomebuyers.com'
var mailAccountPassword = 'ievsxikcaflnpjhz'

var toEmailAddress = 'info@moveuphomebuyers.com'

router.post('/send-email', async (req, res) => {
  const {
    name,
    email,
    phone,
    message
  } = req.body;
  var fromEmail = ` ${email}`;
  contentHTML = `
        <h1>User Information MoveUp</h1>
        <ul>
            <li>Username: ${name}</li>
            <li>User Email: ${email}</li>
            <li>PhoneNumber: ${phone}</li>
            <li>Address: ${message}</li>
        </ul>
    `;

  var transport = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    secure: true,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: mailAccountUser,
      pass: mailAccountPassword
    }
  }))

  var mail = {
    from: fromEmail,
    to: toEmailAddress,
    subject: "MoveUp",
    text: "Contacto",
    html: contentHTML
  }

  transport.sendMail(mail, function(error, response) {
    if (error) {
      console.log(error);
    } else {
      console.log("Message sent: " + response.message);
    }

    transport.close();
  });
  res.redirect('/index.html');

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

module.exports = router;