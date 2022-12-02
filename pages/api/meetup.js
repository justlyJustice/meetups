/* api/meetups */
/* GET api/meetups */
import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const mongoClient = new MongoClient(process.env.MONGO_URI);
    await mongoClient.connect();

    const db = mongoClient.db();

    const meetupsCollection = db.collection("meetups");

    try {
      const meetup = await meetupsCollection.findOne({ _id: req.params.id });
      res.status(200).json({ success: true, data: meetup });
    } catch (error) {
      res.status(400).json({ sucess: false, error });
    }

    mongoClient.close();
  }
};

export default handler;
