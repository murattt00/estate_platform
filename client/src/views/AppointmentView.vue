<template>
  <div>
    <div class="container py-3">
      <!-- Top Bar -->
      <TopBar></TopBar>
      <div class="app-shell d-flex gap-3">
          <!-- NavBar-->
        <NavBar></NavBar>
        <main class="flex-grow-1">
          <div class="container my-5">
            <div class="card shadow-lg border-0 rounded-4 row">
              <div class="card-header bg-primary text-white rounded-top-4">
                <h4 class="mb-0"><i class="bi bi-calendar-check me-2"></i> Appointment Information</h4>
              </div>
              <div class="card-body row">
                <div class="col-md-6">
                  <!-- Customer Information -->
                  <h5 class="mb-3 text-secondary">Customer Information</h5>
                  <hr>
                  <dl class="row">
                    <dt class="col-sm-3">Name</dt>
                    <dd class="col-sm-9">{{ appointment?.customerName }}</dd>

                    <dt class="col-sm-3">E-posta</dt>
                    <dd class="col-sm-9">{{ appointment?.customerEmail }}</dd>

                    <dt class="col-sm-3">Telephone</dt>
                    <dd class="col-sm-9">{{ appointment?.customerPhone }}</dd>
                  </dl>
                </div>


                <div class="col-md-6">
                  <!-- Appointment Details -->
                  <h5 class="mb-3 text-secondary">Appointment Details</h5>
                  <hr>
                  <dl class="row">
                    <dt class="col-sm-3">Postal Code</dt>
                    <dd class="col-sm-9">{{ appointment?.propertyPostcode }}</dd>

                    <dt class="col-sm-3">Date</dt>
                    <dd class="col-sm-9">{{ appointment?.appointmentDate.slice(0, 16).replace("T", " ") }}</dd>

                    <dt class="col-sm-3">Note</dt>
                    <dd class="col-sm-9">{{ appointment?.notes }}</dd>
                  </dl>
                </div>

                <div class="col-md-6">
                  <!-- Travel Information -->
                  <h5 class="mb-3 text-secondary">Travel Information</h5>
                  <hr>
                  <dl class="row">
                    <dt class="col-sm-3">Distance</dt>
                    <dd class="col-sm-9">{{ appointment?.distance }} km</dd>

                    <dt class="col-sm-3">Travel Time</dt>
                    <dd class="col-sm-9">{{ appointment?.travelTime }}</dd>

                    <dt class="col-sm-3">Departure Time</dt>
                    <dd class="col-sm-9">{{ appointment?.departureTime.slice(11, 16) }}</dd>

                    <dt class="col-sm-3">Return Time</dt>
                    <dd class="col-sm-9">{{ appointment?.returnTime.slice(11, 16) }}</dd>

                    <dt class="col-sm-3">Available Again Time</dt>
                    <dd class="col-sm-9">{{ appointment?.availableAgainTime.slice(11, 16) }}</dd>
                  </dl>
                </div>
              </div>

              <div class="card-footer text-end">
                <button @click="$router.push('/appointments')" class="btn btn-primary me-2">
                  <i class="bi bi-arrow-left"></i> Back
                </button>
                <button @click="openEditModal(appointment)" class="btn btn-secondary me-2"  data-bs-toggle="modal" data-bs-target="#EditAppointmentModal">
                  <i class="bi bi-pencil-square"></i> Edit
                </button>
                <button @click="confirmDelete(appointment._id)" class="btn btn-danger">
                  <i class="bi bi-trash"></i> Delete
                </button>
              </div>
            </div>
          </div>
          <EditAppointmentModal :appointmentID="selectedAppointment?._id" @close="selectedAppointment = null"></EditAppointmentModal>
        </main>
      </div>
    </div>
  </div>

</template>

<script>
import TopBar from '@/components/comman/TopBar.vue';
import NavBar from '@/components/comman/NavBar.vue';
import EditAppointmentModal from '@/components/Appointment/EditAppointmentModal.vue';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      appointment: null,
      selectedAppointment: null
    };
  },
  components: {
    TopBar,
    NavBar,
    EditAppointmentModal
  },
  async mounted() {
    const id = this.$route.params.id;
    this.appointment = await this.$store.getters.getAppointments.find(a => a._id === id);
  },
   methods: {
    ...mapActions(['deleteAppointment']),
    confirmDelete(appointmentId) {
    if (confirm("Are you sure you want to delete this appointment?")) {
      this.deleteAppointment(appointmentId);
      this.$router.push('/appointments');
      }
    },
    openEditModal(appointment) {
      this.selectedAppointment = appointment;
    }
  }
}
</script>

<style>

</style>