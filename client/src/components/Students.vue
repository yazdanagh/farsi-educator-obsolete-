<template>
<v-container>
<v-row class="mt-10 text-center">



 <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="5"
    class="elevation-1"
  >
  <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title> student list </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="blue lighten-2"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.name"
                      label="English name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.naam"
                      label="Farsi name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.email"
                      label="email"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.code"
                      label="code"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.darsId"
                      label="dars"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
              mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
      mdi-delete
      </v-icon>
    </template>
    <!--
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
      </template>
      -->
      </v-data-table>

      
      

</v-row>
      <v-btn class="mt-10" color="blue lighten-2" @click="saveAll"> SAVE ALL </v-btn>
</v-container>
</template>

<script>

import axios from 'axios'
import { mdiHome } from '@mdi/js';

export default {
  name: 'User',
  data: function () {
    return {
      dialog: false,
      dialogDelete: false,
      students: [],
      headers: "name naam darsId email code actions".split(' ').map( a => {  return { 'text': a, 'value': a }} ),
      editedIndex: -1,
      mdiHome,
      editedItem: {
        name: '',
        naam: '',
        darsId: 0,
        email: '',
        code: 0,
      },
      backendHost: process.env.NODE_ENV === 'development' ? 'http://localhost:3085'  : ''
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },
  async mounted() {
    const res = (await axios.get(`${this.backendHost}/students?admin_code=6100`))
    this.students = res.data.students
  },

  computed: { 
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
  },
  methods: { 
    editItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm () {
        this.students.splice(this.editedIndex, 1)
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.students[this.editedIndex], this.editedItem)
        } else {
          this.students.push(this.editedItem)
        }
        this.close()
      },
      async saveAll() {
        await axios.post(`${this.backendHost}/students-update`, { students:this.students })
      }
  }
}
</script>
