<template>
  <v-container fluid mt-5>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center" class="grey lighten-5" style="height: 300px;">
          <form>
            <v-text-field v-model="pv" name="pv" label="PV" required></v-text-field>
            <v-select v-model="select" :items="modules" label="Modules" required></v-select>
            <v-btn class="mr-4" v-on:click="submit()">submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </form>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row align="center" justify="center">
          <v-alert
            v-if = "success"
           
            
            :type = "type"
            class = "mb-4"
          >{{alertText}}</v-alert>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import qs from "querystring";
export default {
  name: "studentHome",
  data() {
    return {
      alertText : "",
      success: false,
      type: "",
      pv: "",
      select: null,
      modules: ["AAW", "MSSC", "SRI", "IGR", "MTS", "ANGLAIS", "GCC", "CSE"]
    };
  },
  mounted() {
    this.lock();
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
    async submit() {
      if (this.pv == "" || this.select == null) {
        this.type = "error";
        this.success = true;
        this.alertText = "Please fill all the fields"
      } else {
        const submitBody = {
          pv: this.pv
        };
        const token = window.localStorage.getItem("auth");
        return axios({
          method: "post",
          data: qs.stringify(submitBody),
          url: "http://localhost:3000/api/student/pv/" + this.select,
          headers: {
            "access-token": token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(response => {
          if (response.data.message)
            this.$router.push({ name: "studentLogin" });
          else {
            this.type = "success";
            this.success = true;
            this.alertText = "Claim added with success."
          }
        });
      }
    }
  }
};
</script>