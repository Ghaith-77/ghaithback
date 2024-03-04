let {Books} = require("./modles/book")
let {authe} = require("./modles/auth")
let {dataBooks,authors} = require("./dataBooks")
let dbConect = require("./Middlewares/dbConect")
require("dotenv").config()

dbConect()
 async function  seeddata(){
    try {
        console.log("books sdd");
        await Books.insertMany(dataBooks)
        console.log("books add");
        
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}
 async function seedAuthor(){
    try {
        console.log("books add");
        await authe.insertMany(authors)
        console.log("books add");
        
    }catch(error){
        console.log(error);
        process.exit(1)
    }
}
async function  deleteData(){
    try {
        await Books.deleteMany()
        console.log("books deleted");
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
if(process.argv[2] === "-imp"){
    seeddata()
}
if(process.argv[2]==="-delete"){
    deleteData()
}else if(process.argv[2]==="-impAuth"){
    seedAuthor()
}










// Import Books (seeding database)
const importBooks = async () => {
    try {
        await Book.insertMany(books);
        console.log("Books Imported");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Import Authors (seeding database)
const importAuthors = async () => {
    try {
        await Author.insertMany(authors);
        console.log("Authors Imported");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

// Remove Books
const removeBooks = async () => {
    try {
        await Book.deleteMany();
        console.log("Books Removed!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

if(process.argv[2] === "-import") {
    importBooks();
} else if (process.argv[2] === "-remove") {
    removeBooks();
} else if (process.argv[2] === "-import-authors") {
    importAuthors();
}