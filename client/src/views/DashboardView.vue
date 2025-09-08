<template>
  <div class="container py-3">
    <!-- Top Bar -->
    <TopBar></TopBar>
    <div class="app-shell d-flex gap-3">
      <!-- Sidebar -->
      <NavBar></NavBar>

      <!-- Main -->
      <main class="flex-grow-1">
        <h3 class="mb-4">Dashboard</h3>

        <!-- Metrics -->
        <MetricsBar></MetricsBar>
        <!-- Lists -->
        <div class="row g-3 mt-1">
          <UpcomingAppointments></UpcomingAppointments>
          
          <!-- Simple add button -->
          <AddButton></AddButton>
        </div>

      </main>
      <NewAppointmentModal></NewAppointmentModal>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/comman/NavBar'
import MetricsBar from '@/components/dashboard/MetricsBar';
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments.vue';
import AddButton from '@/components/dashboard/AddButton.vue';
import TopBar from '@/components/comman/TopBar.vue';
import NewAppointmentModal from '@/components/Appointment/NewAppointmentModal.vue';
import { onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  
  components: {
    NavBar,
    MetricsBar,
    UpcomingAppointments,
    AddButton,
    TopBar,
    NewAppointmentModal
  },
  setup() {
    const store = useStore()
    
    onMounted(() => {
      store.dispatch('startAutoUpdate')
    })

  
  }
}
</script>

<style scoped>
    body { background: #f6f7fb; }
    .app-shell { min-height: 100vh; }
  </style>