import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../components/meetups/MeetupDetail";
import Head from "../components/Head";

const MeetupDetails = ({ meetup }) => {
  return (
    <>
      <Head
        title={meetup.title}
        description={meetup.description}
        image={meetup.image}
      />

      <MeetupDetail
        image={meetup.image}
        alt={meetup.title}
        title={meetup.title}
        address={meetup.address}
        description={meetup.description}
      />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  const paths = meetups.map((meetup) => ({
    params: {
      meetupId: meetup._id.toString(),
    },
  }));

  return {
    fallback: "blocking",
    paths,
  };
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });

  client.close();

  return {
    props: {
      meetup: {
        id: meetup._id.toString(),
        address: meetup.address,
        description: meetup.description,
        title: meetup.title,
        image: meetup.image,
      },
    },
  };
}

export default MeetupDetails;
