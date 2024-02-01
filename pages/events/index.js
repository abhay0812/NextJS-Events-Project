import { useRouter } from "next/router";

import { getAllEvents } from "@/helpers/api-util";

import EventList from "../../components/events/EventList";

import EventsSearch from "@/components/events/EventsSearch";
import HeaderContent from "@/components/header-content/HeaderContent";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <div>
      <HeaderContent 
        title="All Events"
        metaName="description"
        metaContent="Find a lot of events that allow you to evolve..."
      />
      <EventsSearch onSearch={findEventsHandler} />
      <EventList events={events} />
    </div>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events
    },
    revalidate: 60
  }
}

export default AllEventsPage;