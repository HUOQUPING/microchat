<template>
  <div>
   <p>{{$route.path}}</p>
   <p>{{token}}</p>
  </div>
</template>

<script>
import cookie from "vue-cookie";
export default {
  name: "IndexView",
  computed:{
    token(){
      return cookie.get('token')
    }
  }
}
</script>

<style scoped>

</style>