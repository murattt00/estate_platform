<template>
  <div class="container py-3">
    
    <!-- Top Bar -->
    <TopBar></TopBar>
    <div class="app-shell d-flex gap-3">
        <!-- NavBar-->
    <NavBar></NavBar>

    <main class="flex-grow-1">
    <h3 class="mb-4">Appointments</h3>
    <AppointmentsList></AppointmentsList>
    </main>
     <!-- New Appointment Modal -->
  <NewAppointmentModal></NewAppointmentModal>
    </div>


  </div>
</template>

<script>
import TopBar from '@/components/comman/TopBar';
import NavBar from '@/components/comman/NavBar';
import AppointmentsList from '@/components/Appointment/AppointmentsList';
import NewAppointmentModal from '@/components/Appointment/NewAppointmentModal';

export default {
  components: {
    TopBar,
    NavBar,
    NewAppointmentModal,
    AppointmentsList
  }
}
</script>

<style scoped>
    body { background: #f6f7fb; }
    .app-shell { min-height: 100vh; }
  </style>
