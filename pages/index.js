import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";
import Head from "../components/Head";

function Home(props) {
  return (
    <>
      <Head
        title="React Meetups"
        description="Browse a list of highly active React meetups!"
        image={`https://scontent.fabb1-2.fna.fbcdn.net/v/t39.30808-6/316680185_698706968521446_4640148166721952523_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEtoxxiHaOCrsm53gAwrDVHLb31te-kquAtvfW176Sq4NCOY6yc35bR60i49sAWFTI3Ernkjtqrumu54RPDkLSa&_nc_ohc=C0eiX-_esCcAX_UIrox&_nc_zt=23&_nc_ht=scontent.fabb1-2.fna&oh=00_AfCZjtLWnsP3L-7EIFY4bF-CaVNqDDlFdqjrYlimhKlQeA&oe=63904207`}
      />

      <MeetupList meetups={props.meetups} />
    </>
  );
}

/* export const getServerSideProps = async (context) => {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}; */

export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URI);
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        address: meetup.address,
        title: meetup.title,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default Home;
