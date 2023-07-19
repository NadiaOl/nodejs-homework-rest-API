import app from "./app.js";

import mongoose from 'mongoose';
const DB_HOST = "mongodb+srv://NadiaOl:GjkVfh111@cluster0.czygkg6.mongodb.net/contacts_reader?retryWrites=true&w=majority";

mongoose.set('strictQuery', true)

mongoose.connect(DB_HOST)
.then(() => { 
  app.listen(3000)
  console.log("Database connection successful")})
.catch(error => {
  console.log(error.message);
  process.exit(1);
})

