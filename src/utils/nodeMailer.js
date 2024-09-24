const nodemailer = require('nodemailer')


module.exports={

    sendEmail:async(email,otp,name)=>{
        
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.APP_EMAIL,
                pass: process.env.APP_PASSWORD
            },
            requireTLS: true,
            logger: true
        })

        const info = await transporter.sendMail({
            // from: process.env.EMAIL,
            from: process.env.APP_EMAIL,
            to: email,
            subject: `OTP  for Laundry app verification`,
            html: `<h4>Dear ${name},</h4>
            <p>This is to acknowledge the details of your login. Login has been processed successfully.</p>
            
            <ul>
              <li><strong>OTP: ${otp}</strong></li>
              
            </ul>
            <p>OTP will Expire in <strong> 5 minutes</strong></p>
            <p>Thank you for your login. If you have any queries, contact the Laundry info team.</p>
            <p>Best regards,</p>
            <h4>Laundry</h4>
            `,
            
            headers: { 'x-myheader': 'test header' }
        })


        if (info.accepted.includes(email)) return true
        else return false

    }
}