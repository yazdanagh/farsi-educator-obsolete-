<template>
<v-container>
<v-row class="mt-10 text-center">

 <v-data-table
    :headers="headers"
    :items="students"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>

</v-row>
</v-container>
</template>

<script>

import axios from 'axios'

export default {
  name: 'User',
  data: function () {
    return {
      students: [],
      headers: "name naam darsId email code".split(' ').map( a => {  return { 'text': a, 'value': a }} )
    }
  },
  watch: {
  },
  async mounted() {
    const res = (await axios.get('http://localhost:3085/students?admin_code=6100'))
    this.students = res.data
  },
  computed: { 
  },
  methods: { 
  }
}
</script>
