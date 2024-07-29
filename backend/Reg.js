const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

app.use(cors({
    origin:'*'
}))

const User = require('./User')


// email password: zhftujrrjoggxglw
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'sabyasachisarangi23@gmail.com',
            pass: 'mmaqlyutwcizqzke',
         },
    secure: true,
});

//DB Manage  'mongodb://localhost:27017/name of database'
const mongoString = 'mongodb+srv://sabyasachisarangi23:12345@cluster0.8hi3zvm.mongodb.net/gmaildb';

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})


app.get('/', (req, res) => {
    res.send('Product API Example')
})

app.post('/send_otp',async (req, res) => {
    
    const email = req.body.email
    const otp = req.body.otp

    const mailData = {
          from: 'sabyasachisarangi23@gmail.com',  // sender address
          to: email ,   // list of receivers
          subject: 'OTP for new Registration',
          text: 'Euphoria Genx',
          html: '<b>Hey there! </b><br> Your OTP is '+otp+'<br/>',
        };
    
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              res.send({message: 'failed'})
            else
              res.send({message: 'success'});
         });
})

app.post('/user_register',async (req, res) => {
    const data = new User({
        email: req.body.email,
        name: req.body.name,        
        password: req.body.password
    
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
app.post('/addCourse',async (req, res) => {
    const data = new Course({
        email: req.body.email,
        cname: req.body.cname
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})
app.listen(5000, () => {
    console.log(`Server Started at ${5000}`)
})

//

