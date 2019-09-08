import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    studentLogged: false,
    professorLogged: false,
    responsibleLogged: false,
    adminLogged: false,
    matricule: "",
    firstname: "NOTES",
    lastname: "Manager"
  },
  mutations: {
    changeStudent(state, payload) {
      state.matricule = payload.matricule;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.studentLogged = true;
    },
    changeProfessor(state, payload) {
      state.matricule = payload.matricule;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.professorLogged = true;
    },
    changeResponsible(state, payload) {
      state.matricule = payload.matricule;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.responsibleLogged = true;
    },
    changeAdmin(state, payload) {
      state.matricule = payload.matricule;
      state.firstname = payload.firstname;
      state.lastname = payload.lastname;
      state.adminLogged = true;
    },
    studentLogout(state) {
      state.matricule = "";
      state.firstname = "Student Portal ";
      state.lastname = "NOTES Manager";
      state.studentLogged = false;
    },
    professorLogout(state) {
      state.matricule = "";
      state.firstname = "Professor Portal ";
      state.lastname = "NOTES Manager";
      state.professorLogged = false;
    },
    responsibleLogout(state) {
      state.matricule = "";
      state.firstname = "Responsibles Portal ";
      state.lastname = "NOTES Manager";
      state.responsibleLogged = false;
    },
    adminLogout(state) {
      state.matricule = "";
      state.firstname = "Admin Portal ";
      state.lastname = "NOTES Manager";
      state.adminLogged = false;
    }
  },
  getters: {
    matricule: state => state.matricule,
    lastname: state => state.lastname,
    firstname: state => state.firstname,
    studentLogged: state => state.studentLogged,
    professorLogged: state => state.professorLogged,
    responsibleLogged: state => state.responsibleLogged,
    adminLogged: state => state.adminLogged
  }
});
