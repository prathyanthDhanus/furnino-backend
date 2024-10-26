const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);
module.exports = {
  sendSms: async (phoneNumber, otp) => {

  const info = await client.messages
  .create({
    body: ` your Furnino app account verification code is ${otp}.`,
    from: '+14155994594',
    to: `${phoneNumber}`
  })

   
  if (info.status.includes("queued")) return true
  // if (info.status.includes("approved")) return true
  else return false
 
  }
  }