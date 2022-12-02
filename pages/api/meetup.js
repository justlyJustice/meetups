/* api/meetups */
/* GET api/meetups */
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await MongoClient.connect(process.env.MONGO_URI);
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    try {
      const meetup = await meetupsCollection.findOne({
        _id: ObjectId(req.params.id),
      });
      res.status(200).json({ success: true, data: meetup });
    } catch (error) {
      res.status(400).json({ sucess: false, error });
    }

    client.close();
  }
};

export default handler;
