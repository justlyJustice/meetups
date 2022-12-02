import { useRouter } from "next/router";
import Head from "../components/Head";

import NewMeetForm from "../components/meetups/NewMeetupForm";

const NewMeetup = () => {
  const router = useRouter();

  const addMeetUp = async (meetupData) => {
    await fetch(`/api/new-meetup`, {
      body: JSON.stringify(meetupData),
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push(`/`);
  };

  return (
    <>
      <Head
        title={`Add a New Meetup`}
        description="Create your own meetup and create amazing networking opportunities!"
        image={`https://scontent.fabb1-1.fna.fbcdn.net/v/t39.30808-6/311948514_673722751019868_6522478645293240476_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=19026a&_nc_eui2=AeHGiogscUW0-l1zML2zSR9JaTJuR9vou_ppMm5H2-i7-t0Yq_J2UhlAUeyBgVOt9UwYepqd7uqnFHahOdHwW9Jn&_nc_ohc=BXufQfmAKJ4AX_0WtXF&_nc_zt=23&_nc_ht=scontent.fabb1-1.fna&oh=00_AfC7b67FqyBIc8Xy6l8_5duTijfuC75V6kOTTknMPjKPTw&oe=638FDDFF`}
      />
      <NewMeetForm onAddMeetup={addMeetUp} />;
    </>
  );
};

export default NewMeetup;
