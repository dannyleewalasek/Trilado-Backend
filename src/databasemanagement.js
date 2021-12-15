const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@trilado.rd8a1.mongodb.net/Trilado?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

const testConnection = () => {
  console.log("test");
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log(collection);
    console.log("running");
    client.close();
  });
};

export default testConnection;
