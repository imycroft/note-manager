import Vue from "vue";
import Router from "vue-router";
import Login from "./views/students/login.vue";
import Home from "./views/students/home.vue";
import Consult from "./views/students/consult.vue"
import Claim from "./views/students/claim.vue"
//professors imports
import professorLogin from "./views/professors/login.vue";
import professorHome from "./views/professors/home.vue"; 

//responsibles imports
import responsibleLogin from "./views/responsibles/login.vue";
import responsibleHome from "./views/responsibles/home.vue"; 
import manageResponsible from "./views/responsibles/manageStudents.vue";

//admin imports
import adminLogin from "./views/admin/login.vue";
import adminHome from "./views/admin/home.vue"; 
import manageStudents from "./views/admin/manageStudents";


Vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/students/login",
      name: "studentLogin",
      component: Login
    },
    {
      path: "/students/home",
      name: "studentHome",
      component: Home
    },
    {
        path: "/students/consult",
        name: "studentConsult",
        component: Consult
      },
      {
        path: "/students/claim",
        name: "studentClaim",
        component: Claim
      },
      //Professors routes
      {
        path: "/professors/login",
        name: "professorLogin",
        component: professorLogin
      },
      {
        path: "/professors/home",
        name: "professorHome",
        component: professorHome
      },
      //Responsibles routes
      {
        path: "/responsibles/login",
        name: "responsibleLogin",
        component: responsibleLogin
      },
      {
        path: "/responsibles/home",
        name: "responsibleHome",
        component: responsibleHome
      },
      //
      {
        path: "/responsibles/manage-students",
        name: "manageResponsible",
        component: manageResponsible
      },
      //Admin routes
      {
        path: "/admin/login",
        name: "adminLogin",
        component: adminLogin
      },
      {
        path: "/admin/home",
        name: "adminHome",
        component: adminHome
      },
      {
        path: "/admin/manage-students",
        name: "manageStudents",
        component: manageStudents
      },
  ]
});

export default router;
