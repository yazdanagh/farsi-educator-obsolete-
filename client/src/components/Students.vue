<template>
<v-container>
<v-row class="mt-10 text-center">



 <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="20"
    class="elevation-1"
  >
   <template v-slot:item.pic="{ item }">
   <v-img
   height="100"
   width="100"
   :src="item.url"
   ></v-img>

   </template>
   <template v-slot:item.name="{ item }">
      <v-chip
        color="grey lighten-3"
        
        >
        <span @click="goToStudent(item.code,item.email)"> {{ item.name }} </span>
        </v-chip>
    </template>
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
                  >
                  <v-image-input
                  v-model="editedItem.profileImage"
                  :image-quality="0.85"
                  :name="'hajoo'"
                  clearable
                  image-format="jpeg"
                  @file-info="onFileInfo"
                  />

                  </v-col>
              </v-row>
              <v-row>
                 <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.studentId"
                      label="Student ID"
                    ></v-text-field>
                  </v-col>

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
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    >
                    <!--
                    <v-image-input
                    v-model="imageData"
                    :image-quality="0.85"
                    clearable
                    image-format="jpeg"
                    @file-info="onFileInfo"
                    />
                    -->
                    <!--
                    <v-file-input
                    v-model="editedItem.imageFile"
                    accept="image/*"
                    label="Picture"
                    ></v-file-input>
                    -->

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
import Vuex from 'vuex'

export default {
  name: 'User',
  data: function () {
    return {
      imageData: null,
      dialog: false,
      dialogDelete: false,
      students: [],
      headers: "pic studentId name naam darsId email code actions".split(' ').map( a => {  return { 'text': a, 'value': a }} ),
      editedIndex: -1,
      mdiHome,
      editedItem: {
        name: '',
        naam: '',
        darsId: 0,
        email: '',
        code: 0,
        profileImage: "", 
        needToSave: false,
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
    const res = (await axios.get(`${this.backendHost}/students`))
    this.students = res.data
    let blob,url;
    for ( let student of this.students ) {
      if ( student.profileImage ) {
        blob = new Blob([ new Buffer(student.profileImage.data, 'base64')], { type: 'image/jpg' });
        url = window.URL.createObjectURL(blob)
        student.url = url
      }
    }
    console.log(res)
  },

  computed: { 
    ...Vuex.mapState({ 
      accessToken: state => state.accessToken
    }),
    headerConfig () { 
      const config = {
        headers: { Authorization: `Bearer ${this.accessToken}` }
      }
      return config
    },
    formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    accessToken:{
      get: function(){
        return this.$store.state.accessToken;
      },
      set: function(newToken){
        this.$store.commit('accessToken',newToken);
      }
    }
  },
  methods: { 
    onFileInfo(file) {
      console.log(file)
    },
    async goToStudent(code,email) {
      const headers = {
        'Content-Type': 'application/json',
      }
      const res = (await axios.post(`${this.backendHost}/login`, {email,code}, {headers}))
      const accessToken= res.data.accessToken
      this.accessToken = accessToken
      //this.$router.push({ name: 'main', params: {code}, query: {email }})
      this.$router.push({name: 'main',params: {darsId:'latest'}})

    },
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

      async deleteItemConfirm () {
        const student = this.students.splice(this.editedIndex, 1)[0]
        console.log(student)
        await axios.delete(`${this.backendHost}/students/${student._id}` )
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

      async save () {
        //this.editedItem.needToSave = true
        const student = this.editedItem
        if (this.editedIndex > -1) {
          console.log(student)
          student.darsId = parseInt(student.darsId)
          student.studentId = parseInt(student.studentId)
          const res = await axios.put(`${this.backendHost}/students/${student._id}`,  student, this.headerConfig )
          if ( res.status === 200 ) {
            Object.assign(this.students[this.editedIndex], student)
          }
        } else {
          console.log(student)
          let temp = student.profileImage
          student.profileImage = { contentType: "image/jpeg", data: temp.split(',')[1] }
          const res = await axios.post(`${this.backendHost}/students`,  { student} )
          if ( res.status === 200 ) {
            this.students.push(this.editedItem)
          }
        }
        this.close()
      },
      async saveAll() {
        //let students = this.students.filter( s => s.needToSave )
        // temporariliy save everything
        let students = this.students
        for ( let student of students ) { 
          student.darsId = parseInt(student.darsId)
        }
        console.log(students)
        await axios.post(`${this.backendHost}/students-update`, { students })
      }
  }
}
</script>
