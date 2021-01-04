<template>
<v-container>
<v-row class="text-center">

<v-col cols="6">
<router-link :to="studentRoute('Yara')">
    <v-img src='images2/Yara%20Aghaghiri.jpg'></v-img>
</router-link>
</v-col>

<v-col cols="6"> 
<router-link :to="studentRoute('Delsa')">
    <v-img src="images2/Delsa%20Aghaghiri.jpg"></v-img>
</router-link>
</v-col>

</v-row>

</v-container>
</template>

<script>

//import axios from 'axios'

export default {
  name: 'User',
  data: function () {
    return {
      students: {
        Yara: 4,
        Delsa: 3
      },
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
  },
  methods: { 
    studentRoute(student) {
      if ( student === 'Yara' ) {
        return `/dars/8318?email=yazdan.aghaghiri@gmail.com`
      } else {
        return `/dars/8173?email=yazdan.aghaghiri@gmail.com`
      }
    }
  }
}
</script>
