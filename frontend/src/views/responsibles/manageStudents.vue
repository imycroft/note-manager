<template>
  <v-data-table :headers="headers" :items="students" sort-by="matricule" class="elevation-1">
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Student's list</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <div class="flex-grow-1"></div>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add Student</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.matricule" label="Matricule"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.firstname" label="Firstname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.lastname" label="Lastname"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.PV_final.Moyenne" label="Moyenne"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="Password"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogNote" max-width="500px" transition="dialog-transition">
          <v-card>
            <v-card-title>
              <span class="headline">{{editedItem.lastname + ' ' + editedItem.firstname}}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-data-table
                  :headers="noteHeaders"
                  :items="notes"
                  sort-by="module"
                  hide-default-footer
                  class="elevation-1"
                >
              
                </v-data-table>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <div class="flex-grow-1"></div>
              <v-btn color="blue darken-1" text @click="close">close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon small class="mr-2" @click="deleteItem(item)">mdi-delete</v-icon>
      <v-icon small class="mr-2" @click="more(item)">mdi-dots-horizontal</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import qs from "querystring";
export default {
  data: () => ({
    alertText: "",
    success: false,
    type: "",
    dialog: false,
    dialogNote: false,
    noteHeaders: [
      {
        text: "Module",
        align: "left",
        sortable: false,
        value: "module"
      },
      { text: "Note", value: "note" },
      { text: "Remarque", value: "pv", sortable: false }
    ],
    notes: [],
    headers: [
      {
        text: "Matricule",
        align: "left",
        sortable: false,
        value: "matricule"
      },
      { text: "Firstname", value: "firstname" },
      { text: "Lastname", value: "lastname" },
      { text: "Moyenne", value: "PV_final.Moyenne" },

      { text: "Actions", value: "action", sortable: false }
    ],
    students: [],
    editedIndex: -1,
    editedItem: {
      matricule: "",
      firstname: "",
      lastname: "",
      password: "",
      PV_final: {
        Moyenne: 0
      },
      modules: [
        {
          module: "AAW"
        }
      ]
    },
    defaultItem: {
      matricule: "",
      firstname: "",
      lastname: "",
      password: "",
      PV_final: {
        Moyenne: 0
      }
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Student" : "Edit Student";
    },
    studentName() {
      return 0;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogNote(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const token = window.localStorage.getItem("authResp");
      return axios({
        method: "get",
        url: "http://localhost:3000/api/responsable/students/all",
        headers: {
          "access-token": token,
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => {
          if (response.data.message) this.$router.push({ name: "resposibleLogin" });
          else {
            this.students = response.data.students;
          }
        })
        .catch(err => {
          alert(err);
        });
    },

    editItem(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.students.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.students.splice(index, 1);
    },
    more(item) {
      this.editedIndex = this.students.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.notes = item.modules;
      this.dialogNote = true;
      // alert(item.modules);
    },

    close() {
      this.dialog = false;
      this.dialogNote = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    async save() {
      if (this.editedIndex > -1) {
        Object.assign(this.students[this.editedIndex], this.editedItem);
        //
        const submitBody = {
          matricule: this.editedItem.matricule,
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname
        };

        const token = window.localStorage.getItem("authResp");
        axios({
          method: "put",
          data: qs.stringify(submitBody),
          url: "http://localhost:3000/api/responsable/students",
          headers: {
            "access-token": token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(response => {
          if (response.data.message) this.$router.push({ name: "responsibleLogin" });
          else {
            this.type = "success";
            this.success = true;
            this.alertText = "Student updated with success.";
          }
        });
        // if a new one
      } else {
        const submitBody = {
          matricule: this.editedItem.matricule,
          firstname: this.editedItem.firstname,
          lastname: this.editedItem.lastname,
          password: this.editedItem.password
        };
        this.students.push(this.editedItem);
        const token = window.localStorage.getItem("authResp");
        axios({
          method: "POST",
          data: qs.stringify(submitBody),
          url: "http://localhost:3000/api/responsable/students",
          headers: {
            "access-token": token,
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(response => {
          if (response.data.message) this.$router.push({ name: "responsibleLogin" });
          else {
            this.type = "success";
            this.success = true;
            this.alertText = "Student added with success.";
          }
        });
      }

      this.close();
    }
  }
};
</script>