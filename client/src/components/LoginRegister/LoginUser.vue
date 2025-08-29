<template>
  <div id="login" class="login mb-3 col-md-4 offset-md-4 ">
    <img alt="Vue logo" src="../../assets/logo.png">
    <h3>Login</h3>
   <form @submit.prevent="login" class="login-form">
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
    </div>
    <div class="mb-3">
      <label for="inputPassword5" class="form-label">Password</label>
      <input v-model="password" type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary m-2">Login</button>
   </form>
  </div>
</template>

<script>

export default {
  name: 'LoginUser',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password
        })
        this.$router.push("/dashboard")
      } catch (error) {
        alert("Giriş başarısız!")
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  padding: 15px;
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
#login{
  border: solid 1px #ccc;
  border-radius: 5%;
  padding: 15px;
}
</style>
