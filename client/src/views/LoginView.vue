<template>
  <div class="Login">
    <LoginRegisterNav/>
    <LoginUser/>
  </div>
</template>

<script>


import LoginUser from '../components/LoginRegister/LoginUser.vue'
import LoginRegisterNav from '../components/LoginRegister/LoginRegisterNav.vue'
export default {
  name: 'LoginView',
  components: {
    LoginUser,
    LoginRegisterNav
  }
}
</script>
