<template>
  <v-app id="inspire">
    <v-content>
      <v-card
    max-width="344"
    class="mx-auto mt-5"
  >
    <v-card-title>Welcome Mr:<br>{{firstname}} {{lastname}}</v-card-title>
    
     <v-card-text>Matricule: {{matricule}}</v-card-text>
    
  </v-card>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "responsibleHome",
  data() {
    return {
        firstname: "",
        lastname: "",
        matricule: ""
    };
  },
  mounted() {
    this.lock();
    this.fetchProfile();
  },
  methods: {
    async lock(){
    const token = window.localStorage.getItem("authResp");
    return axios({
      method: "GET",
      url: "http://localhost:3000/api/responsable/",
        headers: {
          "access-token" : token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
          
          if(response.data.message) this.$router.push({ name: "responsibleLogin" });
          else {
              const payload = {
              matricule:  response.data.matricule,
              firstname : response.data.firstname.toUpperCase(),
              lastname : response.data.lastname.toUpperCase()
          }
          this.$store.commit('changeResponsible', payload);
              this.matricule = payload.matricule
              this.firstname = payload.firstname;
              this.lastname = payload.lastname;
              } 
      })
    },
    async fetchProfile() {
      const token = window.localStorage.getItem("authResp");
      return axios({
        method: "get",
        url: "http://localhost:3000/api/responsable/",
        headers: {
            "access-token" : token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
          
          if(response.data.message) this.$router.push({ name: "responsibleLogin" });
          else {
              const payload = {
              matricule:  response.data.matricule,
              firstname : response.data.firstname.toUpperCase(),
              lastname : response.data.lastname.toUpperCase()
          }
          this.$store.commit('changeResponsible', payload);
           
              this.matricule = payload.matricule
              this.firstname = payload.firstname;
              this.lastname = payload.lastname;
              } 
      })
    }
  }
};
</script>