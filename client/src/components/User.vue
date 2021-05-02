<template>

 <v-container
          class="fill-height"
        >
        
        <!--
        <v-row
            align="center"
            justify="center"
            >
        <v-col
              cols="12"
              sm="8"
              md="4"
            >

        <v-chip x-large
        label
            >
                پارسی شکر است
بیایید هر روز با هم از این شکر بهره ببریم
</v-chip>
</v-col>
</v-row>
-->
  <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
            <v-card class="elevation-12"
            >
                <v-card-title style="display:block" class="blue lighten-1 text-h4 text-right white--text mt-8"
                >
        به شکر خوش آمدید 
                </v-card-title>
                  <v-spacer></v-spacer>
                <v-card-text>
                  <v-form>
                    <v-text-field
                      label="پست الکترونیک"
                      name="login"
                      prepend-icon="mdi-email"
                      type="text" 
                      v-model="email"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="رمز ورود "
                      name="password"
                      v-model="accessCode"
                      prepend-icon="mdi-lock"
                      type="password"
                      ></v-text-field>
                      <!--
                      <v-text-field
                      id="password"
                      label="نام دانش آموز"
                      name="password"
                      v-model="student"
                      prepend-icon="mdi-account"
                      type="password"
                    ></v-text-field>
                    -->
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn x-large @click="goToSchool" color="#64B5F6"> برو به مدرسه </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          </v-container>

          <!--
          
<v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
                      <v-col class="text-center">
        <v-text-field class="d-flex align-center mt-5"
label="کد ورود خود رو وارد کنید "
solo
> 
</v-text-field>
                      </v-col>
                      </v-row>
                      </v-container>
                      -->

<!--
<v-row justify="center"  class="text-center">
<div
      class="d-flex align-center mt-15"
      color="grey"
      flat
      min-width="500"
      height="400"
    >

<v-text-field class="d-flex align-center mt-5"
label="کد ورود خود رو وارد کنید "
solo
> 
</v-text-field>
    </div>
<div
      class="d-flex align-center mt-15"
      color="grey"
      flat
      min-width="500"
      height="400"
    >

      <v-text-field class="d-flex align-center mt-5"
label="کد ورود خود رو وارد کنید "
solo
> 
</v-text-field>

    </div>

</v-row>
-->

</template>

<script>

import axios from 'axios'

export default {
  name: 'User',
  data: function () {
    return {
      email: '',
      accessCode: '',
      backendHost: process.env.NODE_ENV === 'development' ? 'http://localhost:3085'  : ''
    }
  },
  watch: {
  },
  async mounted() {
   //console.log("KJKJKJKJ")
   //const res = (await axios.get('http://localhost:3085/users'))
   //  console.log(res)
   //  this.students = res['data']
   //console.log(res['data'])

  },
  computed: {
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
    async goToSchool() {
      const email = this.email
      const code = this.accessCode
      //this.$router.push(`/dars/${this.students[student]}?student=${student}&code=${code}`)
      const headers = {
        'Content-Type': 'application/json',
      }
      const res = (await axios.post(`${this.backendHost}/login`, {email,code}, {headers}))
      this.accessToken = res.data.accessToken
      this.studentId = res.data.studentId
      //this.$router.push({ name: 'main', params: {code}, query: {email }})
      this.$router.push({name: 'main',params: {darsId:'latest'}})

    },
    //studentRoute(student) {
    //  return `/dars/${this.students[student]}?student=${student}`
    //}
  }
}
</script>
