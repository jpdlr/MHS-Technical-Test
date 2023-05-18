import CalendarLayout from "@/pages/Layout/CalendarLayout.vue";
import Calendar from "@/pages/Calendar.vue";
import UserProfile from "@/pages/UserProfile/UserProfile.vue";
import CustomerList from "@/pages/Customers/CustomerList.vue";
import PetList from "@/pages/Pets/PetList.vue";
import Login from "@/pages/Login/Login.vue";
import Register from "@/pages/Login/Register.vue";

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
    path: "/register",
    component: Register
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
    path: "/new_customer",
    component: CalendarLayout,
    redirect: "/new_customer",
    children: [
      {
        path: "/",
        component: () => import("@/pages/Customers/NewCustomer.vue"),
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
    path: "/new_pet",
    component: CalendarLayout,
    redirect: "/new_pet",
    children: [
      {
        path: "/",
        component: () => import("@/pages/Pets/NewPet.vue"),
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
