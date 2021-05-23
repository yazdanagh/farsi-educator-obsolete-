<template>
<v-container>
<v-row class="mt-10 text-center">



 <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="20"
    hide-default-header
    class="elevation-1"
  >
   <template v-slot:item.pic="{ item }">
   <v-img
   height="100"
   width="100"
   :src="item.url"
   ></v-img>

   </template>
   <!--
   <template v-slot:item.name="{ item }">
      <v-chip
        color="grey lighten-3"
        
        >
        <span @click="goToStudent(item.code,item.email)"> {{ item.name }} </span>
        </v-chip>
    </template>
    -->
    <!--
    <template v-slot:item.kelas="{ item }">
    {{ kelasIdToNames(item.kelases)  }}
    </template>
    -->
  <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>  دانش آموزان کلاس </v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    </v-data-table>

      
      

</v-row>
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
      imageData: "",
      dialog: false,
      dialogDelete: false,
      students: [],
      kelases: [],
      kelasNames: [],
      kelas: "",
      //headers: "pic studentId name naam kelas darsId".split(' ').map( a => {  return { 'text': a, 'value': a }} ),
      headers: "pic name naam darsId".split(' ').map( a => {  return { 'text': a, 'value': a }} ),
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
    let res = (await axios.get(`${this.backendHost}/api/students` , this.headerConfig))
    this.students = res.data
    res = (await axios.get(`${this.backendHost}/api/kelases`, this.headerConfig))
    this.kelases = res.data
    this.kelasNames = this.kelases.map( a=>a.kelasName )
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
    },
    studentId:{
      get: function(){
        return this.$store.state.studentId;
      },
      set: function(studentId){
        this.$store.commit('studentId',studentId);
      }
    }

  },
  methods: { 
    onFileInfo(file) {
      console.log(file)
    },
    kelasIdToNames ( ids ) {
      console.log(ids)
      if ( !ids || !this.kelases ) return []
      return ids.filter(a=> a).map ( k  => { 
        const studentKelas = this.kelases.find( j => j._id == k )
        if (!studentKelas ) return ''
        console.log(studentKelas )
        return studentKelas.kelasName 
      })
    },
    async goToStudent(code,email) {
      const headers = {
        'Content-Type': 'application/json',
      }
      const res = (await axios.post(`${this.backendHost}/login`, {email,code}, {headers}))
      this.accessToken = res.data.accessToken
      this.studentId = res.data.studentId
      //this.$router.push({ name: 'main', params: {code}, query: {email }})
      this.$router.push({name: 'main',params: {darsId:'latest'}})

    },
    editItem (item) {
        this.editedIndex = this.students.indexOf(item)
        this.editedItem = Object.assign({}, item)
        if ( this.editedItem.profileImage ) {
        // this.editedItem.profileImage = "data:image/jpeg;base64," + this.editedItem.profileImage.data
        }
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
        await axios.delete(`${this.backendHost}/api/students/${student._id}` )
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
          if ( this.imageData ) {
            student.profileImage = { contentType: "image/jpeg", data: this.imageData.split(',')[1] }
          }
          const res = await axios.put(`${this.backendHost}/api/students/${student._id}`,  student, this.headerConfig )
          if ( res.status === 200 ) {
            Object.assign(this.students[this.editedIndex], student)
          }
        } else {
          console.log(student)
          if ( this.imageData ) {
            student.profileImage = { contentType: "image/jpeg", data: this.imageData.split(',')[1] }
          }
          const res = await axios.post(`${this.backendHost}/api/students`,  { student} )
          if ( res.status === 200 ) {
            this.students.push(this.editedItem)
          }
        }
        this.close()
      },
  }
}
</script>
