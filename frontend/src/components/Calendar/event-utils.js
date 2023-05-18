import api from '@/CustomerApiService.js';

let eventGuid = 0;
let customers = [];

// Import customers from the database
export function getCustomers() {
  return api.getAllCustomers().then((data) => {
    customers = data;
    return customers;
  });
}

export function initializeEvents() {
  return getCustomers().then((customers) => {
    return customers.map((customer) => {
      const startDate = calculateStartDate(customer.groom_day, customer.cust_since_date);

      return {
        id: createEventId(),
        title: customer.customer_name,
        start: startDate,
        allDay: true, // Set to true if it's an all-day event
        daysOfWeek: [getDayOfWeek(customer.groom_day)],
        // Add any additional properties as needed
      };
    });
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
  INITIAL_EVENTS.push(...events);
});

export function createEventId() {
  return String(eventGuid++);
}
