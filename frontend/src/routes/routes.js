import CalendarLayout from "@/pages/Layout/CalendarLayout.vue";

import Calendar from "@/pages/Calendar.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CustomerList from "@/pages/CustomerList.vue";
import PetList from "@/pages/PetList.vue";

const routes = [
  {
    path: "/",
    component: CalendarLayout,
    redirect: "/calendar",
    children: [
      {
        path: "calendar",
        name: "Calendar",
        component: Calendar,
      },
      {
        path: "customerlist",
        name: "Customer List",
        component: CustomerList,
      },
      {
        path: "petlist",
        name: "Pet List",
        component: PetList,
      },      
      {
        path: "user",
        name: "User Profile",
        component: UserProfile,
      },
    ],
  },
];

export default routes;
