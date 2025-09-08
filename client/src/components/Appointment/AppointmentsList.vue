<template>
  <div class="row g-3">
      <div class="col-md-12">
        <div class="card card-soft shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
              <h4 class="mb-0"></h4>
              <div class="d-flex gap-2">
                <input v-model="searchQuery" type="search" class="form-control" placeholder="Search client / postcode" style="max-width:260px">
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newAppointmentModal">
                  <i class="bi bi-plus-lg me-1"></i> New Appointment
                </button>
              </div>
            </div>

            <div class="table-responsive">
              <table class="table align-middle">
                <thead class="table-light">
                  <tr>
                    <th>Client</th>
                    <th>Email</th>
                    <th>Postcode</th>
                    <th >Distance</th>
                    <th>Date</th>
                    <th>Departure</th>
                    <th>Available Again</th>
                    <th class="text-end">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="appointment in filteredAppointments" :key="appointment._id">
                        <td>{{ appointment.customerName }}</td>
                        <td>{{ appointment.customerEmail }}</td>
                        <td>{{ appointment.propertyPostcode }}</td>
                        <td>{{ appointment.distance }}</td>
                        <td>{{ appointment.appointmentDate.slice(0, 16).replace("T", " ") }}</td>
                        <td>{{ appointment.departureTime.slice(11, 16) }}</td>
                        <td>{{ appointment.availableAgainTime.slice(11, 16) }}</td>
                        <td class="text-end">
                            <button @click="$router.push(`/appointment/${appointment._id}`)" class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-eye"></i></button>
                            <button @click="openEditModal(appointment)" class="btn btn-sm btn-outline-secondary me-1" data-bs-toggle="modal" data-bs-target="#EditAppointmentModal"><i class="bi bi-pencil"></i></button>
                            <button confirm @click="confirmDelete(appointment._id)" class="btn btn-sm btn-outline-danger me-1"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <EditAppointmentModal :appointmentID="selectedAppointment?._id" @close="selectedAppointment = null"></EditAppointmentModal>
      </div>
    </div>
</template>

<script>
import EditAppointmentModal from './EditAppointmentModal.vue';
import { mapState, mapActions} from 'vuex';
import { formatDateWithOffset } from '../../utils/timeFormat';
export default {
  data() {
    return {
      selectedAppointment: null,
      searchQuery: ''
    }
  },
  components: {
    EditAppointmentModal
  },
  computed: {
    ...mapState(['appointments']),
    filteredAppointments() {
      if (!this.searchQuery) return this.appointments;
      const query = this.searchQuery.toLowerCase();
      return this.appointments.filter(a =>
        a.customerName.toLowerCase().includes(query) ||
        a.propertyPostcode.toLowerCase().includes(query)
      );
    }
    
  },
  methods: {
    formatDateWithOffset,
    ...mapActions(['deleteAppointment']),
    confirmDelete(appointmentId) {
    if (confirm("Are you sure you want to delete this appointment?")) {
      this.deleteAppointment(appointmentId);
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