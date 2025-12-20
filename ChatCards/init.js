const mongoose=require("mongoose")
const Chat=require("./models/chat")
main().then(() => console.log("Database connected"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
let allChats=[

  {
    from: "Rahul",
    to: "Anjali",
    msg: "Good morning!",
    created_at: new Date()
  },
  {
    from: "Meera",
    to: "Amit",
    msg: "How are you?",
    created_at: new Date()
  },
  {
    from: "Karan",
    to: "Sonia",
    msg: "Let's meet soon.",
    created_at: new Date()
  },
  {
    from: "Neha",
    to: "Ravi",
    msg: "Thanks for helping.",
    created_at: new Date()
  },
  {
    from: "Vikram",
    to: "Priya",
    msg: "See you later.",
    created_at: new Date()
  },
  {
    from: "Divya",
    to: "Shivam",
    msg: "Have a great day!",
    created_at: new Date()
  },
  {
    from: "Aryan",
    to: "Neha",
    msg: "Got your message.",
    created_at: new Date()
  }
]


Chat.insertMany(allChats)
