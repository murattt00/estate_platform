<template>
  <aside class="sidebar p-3 rounded-4 d-none d-md-block">
        <div class="list-group list-group-flush">
          <a @click="this.$router.push('/dashboard');" 
          class="list-group-item list-group-item-action" :class="{'active': $route.path === '/dashboard'}">
            <i class="bi bi-grid-1x2 me-2"></i> Dashboard
          </a>
          <a @click="this.$router.push('/appointments');" class="list-group-item list-group-item-action" :class="{'active': $route.path === '/appointments'}">
            <i class="bi bi-calendar-event me-2"></i> Appointments
          </a>
        </div>
    </aside>
</template>

<script>
export default {

}
</script>

<style scope>
.sidebar {
      background: #ffffff;
      border-right: 1px solid #e9ecef;
      width: 260px;
    }
    .sidebar .list-group-item.active {
      background: #e9efff; color: #0d6efd; border-color: #dbe4ff;
      font-weight: 600;
    }
</style>