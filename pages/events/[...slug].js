import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getFilteredEvents } from "@/helpers/api-util";

import Button from "@/components/ui/Button";
import ErrorAlert from "@/components/ui/ErrorAlert";

import EventList from "@/components/events/EventList";
import ResultsTitle from "@/components/events/ResultsTitle";
import HeaderContent from "@/components/header-content/HeaderContent";

const fetcher = (url) => fetch(url).then((res) => res.json());

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const fetchURL = process.env.NEXT_PUBLIC_FIREBASE_EVENTES_DATABASE_URL;

  const { data, error } = useSWR(`${fetchURL}events.json`, fetcher);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <HeaderContent
      title="Filtered Events"
      metaName="description"
      metaContent={`A list of filtered events.`}
    />
  )
  
  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  pageHeadData = (
    <HeaderContent
      title="Filtered Events"
      metaName="description"
      metaContent={`All events for ${numMonth}/${numYear}`}
    />
  );

  // put hasError if you are using getSerSideProps
  if ( 
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  
  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    );
  });

  // const filteredEvents = props.events; this is for getSerSideProps

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the choosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const date = new Date(props.date.year, props.date.month - 1); this is for getSerSideProps
  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <Fragment>
        {pageHeadData}
        <ResultsTitle date={date} />
        <EventList events={filteredEvents} />
      </Fragment>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;
  
//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true
//       },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth
//       }
//     }
//   }
// }

export default FilteredEventsPage;
