import CalendarLayout from "@/pages/Layout/CalendarLayout.vue";
import Calendar from "@/pages/Calendar.vue";
import UserProfile from "@/pages/UserProfile.vue";
import CustomerList from "@/pages/CustomerList.vue";
import PetList from "@/pages/PetList.vue";
import Login from "@/pages/Login.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/calendar",
    component: CalendarLayout,
    redirect: "/calendar",
    children: [
      {
        path: "/",
        name: "Calendar",
        component: Calendar,
      },
    ],
  },
  {
    path: "/customerlist",
    component: CalendarLayout,
    redirect: "/customerlist",
    children: [
      {
        path: "/",
        name: "Customer List",
        component: CustomerList,
      },
    ],
  },
  {
    path: "/petlist",
    component: CalendarLayout,
    redirect: "/petlist",
    children: [
      {
        path: "/",
        name: "Pet List",
        component: PetList,
      },
    ],
  },
  {
    path: "/user",
    component: CalendarLayout,
    redirect: "/user",
    children: [
      {
        path: "/",
        name: "User Profile",
        component: UserProfile,
      },
    ],
  },
];

export default routes;
