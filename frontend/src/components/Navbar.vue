<template>
  <v-toolbar app>
    <v-toolbar-title>
      <v-btn flat v-on:click="home()">{{ $store.state.firstname }} {{ $store.state.lastname }}</v-btn>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-menu offset-y v-if="$store.state.adminLogged">
      <template v-slot:activator="{ on }">
        <v-btn color="grey" dark v-on="on">Administration</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index"  router :to="item.route">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-menu offset-y v-if="$store.state.responsibleLogged">
      <template v-slot:activator="{ on }">
        <v-btn color="grey" dark v-on="on">Manage</v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(item, index) in respItems" :key="index"  router :to="item.route">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <!-- <div class="flex-grow-1"></div> -->

    <v-toolbar-items v-if="$store.state.studentLogged">
      <v-btn text v-on:click="consult()">Consultation</v-btn>
      <v-btn text v-on:click="claim()">Reclamation</v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="$store.state.professorLogged">
      <v-btn text v-on:click="consult()">Notes</v-btn>
      <v-btn text v-on:click="claim()">Modules</v-btn>
    </v-toolbar-items>

    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-btn v-if="$store.state.studentLogged" icon v-on:click="studentLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.professorLogged" icon v-on:click="professorLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.responsibleLogged" icon v-on:click="responsibleLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <v-btn v-if="$store.state.adminLogged" icon v-on:click="adminLogout()">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      items: [
        { title: "Manage students", route: "/admin/manage-students" },
        { title: "Manage responsibles" }
      ],
      respItems: [
         { title: "Manage students", route: "/responsibles/manage-students" },
        { title: "Manage professors" }
      ]
    };
  },

  methods: {
    home() {
      if ($store.state.studentLogged)
        return this.$router.push({ name: "studentHome" });
      if ($store.state.professorLogged)
        return this.$router.push({ name: "professorHome" });
      if ($store.state.responsibleLogged)
        return this.$router.push({ name: "responsibleHome" });
      if ($store.state.adminLogged)
        return this.$router.push({ name: "adminHome" });
    },
    consult() {
      this.$router.push({ name: "studentConsult" });
    },
    claim() {
      this.$router.push({ name: "studentClaim" });
    },
    admin() {
      this.$router.push({ name: "panelAdmin" });
    },
    studentLogout() {
      window.localStorage.removeItem("auth");

      this.$store.commit("studentLogout");
      this.$router.push({ name: "studentLogin" });
    },
    professorLogout() {
      window.localStorage.removeItem("authProf");

      this.$store.commit("professorLogout");
      this.$router.push({ name: "professorLogin" });
    },
    responsibleLogout() {
      window.localStorage.removeItem("authResp");

      this.$store.commit("responsibleLogout");
      this.$router.push({ name: "responsibleLogin" });
    },
    adminLogout() {
      window.localStorage.removeItem("authAdmin");

      this.$store.commit("adminLogout");
      this.$router.push({ name: "adminLogin" });
    }
  }
};
</script>
<style scoped>
html {
  overflow-y: auto;
}

.absolute-nav {
  z-index: 2;
  background: transparent;
}
</style>

