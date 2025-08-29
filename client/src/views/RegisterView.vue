<template>
  <div >
    <LoginRegisterNav/>
    <RegisterUser/>
  </div>
</template>
<script>
import LoginRegisterNav from '../components/LoginRegister/LoginRegisterNav.vue'
import RegisterUser from '../components/LoginRegister/RegisterUser.vue'

export default {
  name: 'RegisterView',
  components: {
    LoginRegisterNav,
    RegisterUser
  },

}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
  padding: 15px ;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
#register{
  border: solid 1px #ccc;
  border-radius: 5%;
  padding: 15px;
}
</style>
