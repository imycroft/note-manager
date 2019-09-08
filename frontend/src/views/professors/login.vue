<template>
 
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Proffessors Account Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="matricule"
                    v-model="input.matricule"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    v-model="input.password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
 
</template>

<script>
import axios from "axios";
import qs from "querystring";
export default {
  name: "professorsLogin",
  data() {
    return {
      input: {
        matricule: "",
        password: ""
      },
      drawer: null
    };
  },
  methods: {
    async login() {
      const loginBody = {
        matricule: this.input.matricule,
        password: this.input.password
      };
      return axios({
        method: "post",
        data: qs.stringify(loginBody),
        url: "http://localhost:3000/professors/login",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(response => {
        if (response.data.error) this.$router.push({ name: "professorLogin" });
        else {
          window.localStorage.setItem('authProf', response.data.token)
          this.$router.push({ name: "professorHome" });
        }
      });
    }
  },
  props: {
    source: String
  }
};
</script>

