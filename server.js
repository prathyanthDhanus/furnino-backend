require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT;
const url = process.env.MONGODB_URL;

//momgodb connection setup
mongoose
  .connect(url)
  .then(() => console.log("MongoDB Atlas connected"))
  .catch((error) => console.log("Error connecting to MongoDB:", error));

  //start the server
  app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
  });


  