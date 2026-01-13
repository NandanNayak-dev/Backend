const mongoose=require("mongoose")
const Todo=require("./models/todo")

main().then(() => console.log("Database connected"))
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TODOAPP');
}
let allTodos=[
    {message:"Learn NodeJS"},
    {message:"Learn ExpressJS"},
    {message:"Learn MongoDB"},
    {message:"Build a Todo App"},
]
Todo.insertMany(allTodos)