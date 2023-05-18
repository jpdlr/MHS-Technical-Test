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
    return customers.map((customer) => {
      const startDate = calculateStartDate(customer.groom_day, customer.cust_since_date);

      if (customer.groom_frequency === 'Weekly') {
        return {
          id: createEventId(),
          title: customer.customer_name,
          start: startDate,
          startRecur: startDate,
          daysOfWeek: [getDayOfWeek(customer.groom_day)],
        }
      } else if (customer.groom_frequency === 'EveryOtherWeek') {
        return {
          id: createEventId(),
          title: customer.customer_name,
          start: startDate,
          allDay: true,
        }

      } else if (customer.groom_frequency === 'Monthly') {
        return {
          id: createEventId(),
          title: customer.customer_name,
          start: startDate,
          allDay: true,
        }
      }
    });
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
