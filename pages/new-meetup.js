import Head from "next/head";
import { useRouter } from "next/router";

import NewMeetForm from "../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetUp = async (meetupData) => {
    const response = await fetch(`/api/new-meetup`, {
      body: JSON.stringify(meetupData),
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    router.push(`/`);
  };

  return (
    <>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Create your own meetup and create amazing networking opportunities!"
        />
      </Head>
      <NewMeetForm onAddMeetup={addMeetUp} />;
    </>
  );
};

export default NewMeetup;
