<template>
  <div class="topbar px-4 py-3 mb-4 d-flex align-items-center justify-content-between">
      <div  @click="this.$router.push('/dashboard')" class="fw-semibold">Estate Platform</div>
      <div class="d-flex align-items-center gap-3">
        <span class="d-none d-sm-inline text-white-50">{{ author?.name }}</span>
        <span class="avatar">{{ author?.name.charAt(0).toUpperCase() }}</span>
        <span @click="logout"><i class="bi-box-arrow-right"></i></span>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(["currentAuthor"]),
    author(){
      return this.currentAuthor;
    }
  },
  methods:{

    logout(){
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  }

}
</script>

<style  scoped>
.topbar {
      background: #12223b; color: #fff; border-radius: 14px; 
}

.avatar {
      width: 36px; height: 36px; background:#e7f1ff; color:#0d6efd;
      border-radius: 50%; display:inline-flex; align-items:center; justify-content:center;
      font-weight:700;
}
</style>