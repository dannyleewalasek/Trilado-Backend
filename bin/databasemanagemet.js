const { MongoClient } = require("mongodb");
const uri = `mongodb+srv://${process.env.MONGOU_SERNAME}:${process.env.MONGO_PASSWORD}@trilado.rd8a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const testConnection = () => {
  client.connect((err) => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    console.log(collection);
    client.close();
  });
};

export default testConnection;
