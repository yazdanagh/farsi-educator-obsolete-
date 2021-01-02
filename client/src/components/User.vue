<template>
<v-container>
<v-row class="text-center">

<v-col cols="6">
<router-link :to="'/dars/' + students['Yara']">
    <v-img src="images2/Yara.jpg"></v-img>
</router-link>
</v-col>

<v-col cols="6"> 
<router-link :to="'/dars/' + students['Delsa']">
    <v-img src="images2/Delsa.jpg"></v-img>
</router-link>
</v-col>

</v-row>

</v-container>
</template>

<script>

import axios from 'axios'

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
    console.log("KJKJKJKJ")
    const res = (await axios.get('http://localhost:3085/users'))
      console.log(res)
      this.students = res['data']
    console.log(res['data'])

  },
  computed: { 
  },
  methods: { 
  }
}
</script>
