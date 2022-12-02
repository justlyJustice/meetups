/* api/new-meetup */
/* POST api/new-meetup */
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    const mongoResponse = await new MongoClient(
      process.env.MONGO_URI
    ).connect();
    const db = mongoResponse.db();

    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);

    mongoResponse.close();

    res.status(201).json({ message: "Sucess", data: result });
  }
};

export default handler;
