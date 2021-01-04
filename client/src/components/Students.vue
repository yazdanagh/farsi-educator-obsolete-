<template>
<v-container>
<v-row class="text-center">



</v-row>

</v-container>
</template>

<script>

import axios from 'axios'

export default {
  name: 'User',
  data: function () {
    return {
    }
  },
  watch: {
  },
  async mounted() {
    const res = (await axios.get('http://localhost:3085/students'))
      console.log(res)
      this.students = res['data']
    console.log(res['data'])

  },
  computed: { 
  },
  methods: { 
    studentRoute(student) {
      if ( student === 'Yara' ) {
        return `/dars?email=yazdan.aghaghiri@gmail.com&code=8318`
      } else {
        return `/dars?email=yazdan.aghaghiri@gmail.com&code=8173`
      }
    }
  }
}
</script>
