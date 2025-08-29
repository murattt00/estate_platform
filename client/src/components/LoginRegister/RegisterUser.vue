<template>
  <div id="register" class=" mb-3 col-md-4 offset-md-4 ">
    <img alt="Vue logo" src="../../assets/logo.png">
    <h3>Register</h3>
   <form @submit.prevent="register" class="register-form">
    <div class="mb-3">
      <label for="name" class="form-label">Name</label>
      <input v-model="name" type="text" class="form-control" id="name"  placeholder="John Doe" required>
    </div>
    <div class="mb-3">
      <label for="exampleFormControlInput2" class="form-label">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleFormControlInput2"  placeholder="name@example.com" required>
    </div>
    <div class="mb-3">
      <label for="inputPassword5" class="form-label">Password</label>
      <input v-model="password" type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="Password" required>
    </div>
    <button  type="submit" class="btn btn-primary m-2">Register</button>
   </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: ''
    }
  },
  methods:{
    async register() {
      mapActions(['register']);
      try {
        await this.$store.dispatch("register", {
          name: this.name,
          email: this.email,
          password: this.password
        });
        // Registration successful
        alert('Registration successful!');
        this.$router.push('/');
      } catch (error) {
        // Error handling
        alert('Registration failed! ');
      }
    }
  }
}
</script>

<style>

</style>