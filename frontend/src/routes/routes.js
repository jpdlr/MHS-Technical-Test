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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
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
        meta: { requiresAuth: true },
      },
    ],
  },
];

export default routes;
