<template>
  <v-app id="inspire">
    <v-content>
      <v-card
    max-width="344"
    class="mx-auto mt-5"
  >
    <v-card-title>Welcome Admin:<br>{{firstname}} {{lastname}}</v-card-title>
    
     <v-card-text>Matricule: {{matricule}}</v-card-text>
    
  </v-card>
    </v-content>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "adminHome",
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
      const token = window.localStorage.getItem("authAdmin");
      return axios({
        method: "get",
        url: "http://localhost:3000/administration/",
        headers: {
            "access-token" : token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then((response) => {
          
          if(response.data.message) this.$router.push({ name: "adminLogin" });
          else {
              const payload = {
              matricule:  response.data.matricule,
              firstname : response.data.firstname.toUpperCase(),
              lastname : response.data.lastname.toUpperCase()
          }
          
          this.$store.commit('changeAdmin', payload);
           
              this.matricule = payload.matricule
              this.firstname = payload.firstname;
              this.lastname = payload.lastname;
              } 
      })
    }
  }
};
</script>