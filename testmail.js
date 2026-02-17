const nodemailer = require("nodemailer");

async function test() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "testrajeev0482@gmail.com",
      pass: "ttdsmwzyiwscmdhn"
    }
  });

  await transporter.sendMail({
    from: "rajiv.prasad42k@gmail.com",
    to: "testrajeev0482@gmail.com",
    subject: "Test Mail",
    text: "Working!"
  });

  console.log("Mail sent");
}

test();
