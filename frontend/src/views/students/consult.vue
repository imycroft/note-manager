<template>
  <v-container fluid>
    <v-simple-table>
      <thead>
        <tr>
          <th class="text-left">Module</th>
          <th class="text-left">Note</th>
          <th class="text-left">Reclamation</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mod in modules" :key="mod.module">
          <td>{{ mod.module }}</td>
          <td>{{ mod.note }}</td>
           <td>{{ mod.pv }}</td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-card max-width="344" class="mx-auto mt-5">
      <v-card-title>PV Final</v-card-title>
      <v-card-text>Moyenne: {{pv_final.Moyenne}} <br> Remarque: {{pv_final.Remarque}}</v-card-text>
    
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "studentHome",
  data() {
    return {
      modules: [],
      pv_final: {}
    };
  },
  mounted() {
    this.lock();
    this.fetchNote();
  },
  methods: {
    
    async lock(){
    const token = window.localStorage.getItem("auth");
    return axios({
      method: "GET",
      url: "http://localhost:3000/api/student/",
        headers: {
          "access-token" : token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
          
          if(response.data.message) this.$router.push({ name: "studentLogin" });
          else {
              const payload = {
              matricule:  response.data.matricule,
              firstname : response.data.firstname.toUpperCase(),
              lastname : response.data.lastname.toUpperCase()
          }
          this.$store.commit('change', payload);
              this.matricule = payload.matricule
              this.firstname = payload.firstname;
              this.lastname = payload.lastname;
              } 
      })
    },
    async fetchNote() {
      const token = window.localStorage.getItem("auth");
      return axios({
        method: "get",
        url: "http://localhost:3000/api/student/marks",
        headers: {
          "access-token": token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(response => {
        if (response.data.message) this.$router.push({ name: "studentLogin" });
        else {
          this.modules = response.data.modules;
          this.pv_final = response.data.PV_final;
          
        }
      });
    }
  }
};
</script>