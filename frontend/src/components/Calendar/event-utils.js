import api from '@/CustomerApiService.js';
import store from '@/store.js';

let eventGuid = 0;

// Import customers from the database
export async function getCustomers() {
  const loggedGroomer = store.state.loggedGroomer;
  if (loggedGroomer) {
    return await api.getAllCustomersForGroomer(loggedGroomer);
  }
  return []; // Return an empty array if loggedGroomer is not defined
}

export function initializeEvents() {
  return getCustomers().then((customers) => {
    const events = [];

    customers.forEach((customer) => {
      if (customer.groom_frequency === 'Weekly') {
        const startDate = calculateStartDate(customer.groom_day, customer.cust_since_date);
        const event = {
          id: createEventId(),
          title: customer.customer_name,
          start: startDate,
          startRecur: startDate,
          daysOfWeek: [getDayOfWeek(customer.groom_day)],
        };
        events.push(event);
      } else if (customer.groom_frequency === 'EveryOtherWeek') {
        const startDate = calculateStartDate(customer.groom_day, customer.cust_since_date);
        const event = {
          id: createEventId(),
          title: customer.customer_name,
          start: startDate,
          allDay: true,
        };
        events.push(event);

        // Repeat event creation for 1 year
        for (let i = 1; i <= 26; i++) {
          const nextStartDate = new Date(startDate);
          nextStartDate.setDate(nextStartDate.getDate() + 14 * i);

          const nextEvent = {
            id: createEventId(),
            title: customer.customer_name,
            start: nextStartDate,
            allDay: true,
          };
          events.push(nextEvent);
        }
      } else if (customer.groom_frequency === 'Monthly') {
        const groomDayIndex = getDayOfWeek(customer.groom_day);
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        // Find the first occurrence of groom_day in the current or next month
        let month = currentMonth;
        let year = currentYear;
        let firstStartDate = calculateStartDate(customer.groom_day, `${year}-${month + 1}-01`);

        if (firstStartDate < currentDate) {
          if (month === 11) {
            year++;
            month = 0;
          } else {
            month++;
          }
          firstStartDate = calculateStartDate(customer.groom_day, `${year}-${month + 1}-01`);
        }

        const event = {
          id: createEventId(),
          title: customer.customer_name,
          start: firstStartDate,
          allDay: true,
        };
        events.push(event);

        // Repeat event creation for 11 more times
        for (let i = 1; i <= 11; i++) {
          if (month === 11) {
            year++;
            month = 0;
          } else {
            month++;
          }
          const nextStartDate = calculateStartDate(customer.groom_day, `${year}-${month + 1}-01`);

          const nextEvent = {
            id: createEventId(),
            title: customer.customer_name,
            start: nextStartDate,
            allDay: true,
          };
          events.push(nextEvent);
        }
      }
    });

    return events;
  }).catch((error) => {
    console.error('Error initializing events:', error);
    return []; // Return an empty array if an error occurs
  });
}

function calculateStartDate(groomDay, custSinceDate) {
  const dayOfWeek = getDayOfWeek(groomDay);
  const start = new Date(custSinceDate);
  start.setDate(start.getDate() + (dayOfWeek - start.getDay() + 7) % 7);
  return start;
}

function getDayOfWeek(dayString) {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return daysOfWeek.indexOf(dayString);
}

export const INITIAL_EVENTS = [];

initializeEvents().then((events) => {
  INITIAL_EVENTS.length = 0; // Clear the array before pushing new events
  INITIAL_EVENTS.push(...events);
});

export function createEventId() {
  return String(eventGuid++);
}
