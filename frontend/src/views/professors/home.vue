<template>
  <v-app id="inspire">
    <v-content>
      <v-card
    max-width="344"
    class="mx-auto mt-5"
  >
    <v-card-title>Welcome Professor:<br>{{firstname}} {{lastname}}</v-card-title>
    
     <v-card-text>Matricule: {{matricule}}</v-card-text>
    
  </v-card>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "professorHome",
  data() {
    return {
        firstname: "",
        lastname: "",
        matricule: ""
    };
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    async fetchProfile() {
      const token = window.localStorage.getItem("authProf");
      return axios({
        method: "get",
        url: "http://localhost:3000/api/professor/",
        headers: {
            "access-token" : token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
          
          if(response.data.message) this.$router.push({ name: "professorLogin" });
          else {
              const payload = {
              matricule:  response.data.matricule,
              firstname : response.data.firstname.toUpperCase(),
              lastname : response.data.lastname.toUpperCase()
          }
          this.$store.commit('changeProfessor', payload);
           alert('done')
              this.matricule = payload.matricule
              this.firstname = payload.firstname;
              this.lastname = payload.lastname;
              } 
      })
    }
  }
};
</script>