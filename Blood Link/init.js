const mongoose=require("mongoose")
const Donation=require("./models/donation")
main().then(() => console.log("Database connected"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BloodDonation');
}
let allDonors=[
  {
    name: "Amit Sharma",
    email: "amit.sharma@gmail.com",
    bloodGroup: "A+",
    date: new Date()
  },
  {
    name: "Priya Verma",
    email: "priya.verma@gmail.com",
    bloodGroup: "B+",
    date: new Date()
  },
  {
    name: "Rohit Kumar",
    email: "rohit.kumar@gmail.com",
    bloodGroup: "O+",
    date: new Date()
  },
  {
    name: "Sneha Patel",
    email: "sneha.patel@gmail.com",
    bloodGroup: "AB+",
    date: new Date()
  },
  {
    name: "Nikhil Rao",
    email: "nikhil.rao@gmail.com",
    bloodGroup: "O-",
    date: new Date()
  }
]
Donation.insertMany(allDonors)
