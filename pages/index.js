import { getFeaturedEvents } from "@/helpers/api-util";

import EventList from "@/components/events/EventList";
import HeaderContent from "@/components/header-content/HeaderContent";

function HomePage(props) {
  return (
    <> 
      <div>
        <HeaderContent 
          title="NextJS Events"
          metaName="description"
          metaContent="Find a lot of events that allow you to evolve..."
        />
        <EventList events={props.events} />
      </div>
    </>
  )
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800
  }
}

export default HomePage;