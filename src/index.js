require("dotenv").config();
const express = require('express');
const hbs = require('hbs');
const nodemailer = require("nodemailer");
const path = require('path');
const app = express();
const staticPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../views")
const partialPath = path.join(__dirname,"../views/partial")
hbs.registerPartials(viewsPath);
hbs.registerPartials(partialPath);
app.set("view engine","hbs");
app.use(express.static('.'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.get("/",(req,res) => {
    res.render("home");
})

app.get("/contact",(req,res) => {
    res.render("contact");
})

app.get("/about",(req,res) => {
    res.render("about");
})


app.get('*', (req, res) => {
    res.send("Page not found...")
})

// Send mail route
app.post("/send", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
       service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Mail from ${name}  (${subject})`,
      text: message
    });
    res.send("Email sent successfully ✅");
  } catch (err) {
    console.log(err);
    res.send("Error sending email ❌");
  }
});




app.listen(3000,() => {
    console.log('Server is running on port 3000')
})