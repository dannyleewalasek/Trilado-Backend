const MongoClient = require("mongodb").MongoClient;

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://localhost:27017/test");
}

const insertLikes = (likes: number[]) => {
  console.log("ff");
  console.log(likes.join(""));
};

export { insertLikes };
