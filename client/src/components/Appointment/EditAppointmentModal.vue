<template>
    <div class="modal fade" id="EditAppointmentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 rounded-4">
        <div class="modal-header">
          <h5 class="modal-title">Edit Appointment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="editForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Client Name</label>
                <input type="text" class="form-control" placeholder="Jane Doe" v-model="appointment.customerName">
              </div>
              <div class="col-md-6">
                <label class="form-label">Client Email</label>
                <input type="email" class="form-control" placeholder="jane@example.com" v-model="appointment.customerEmail">
              </div>
              <div class="col-md-6">
                <label class="form-label">Client Phone</label>
                <input type="tel" class="form-control" placeholder="+44 7..." v-model="appointment.customerPhone">
              </div>
              <div class="col-md-6">
                <label class="form-label">Property Postcode</label>
                <input type="text" class="form-control" placeholder="CM2 7PJ" v-model="appointment.propertyPostcode">
              </div>
              <div class="col-md-6">
                <label class="form-label">Date & Time</label>
                <input type="datetime-local" class="form-control" v-model="appDate">
              </div>
              <div class="col-12">
                <label class="form-label">Notes</label>
                <textarea class="form-control" rows="3" placeholder="Optional notes..." v-model="appointment.notes"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
              <button type="submit" class="btn btn-primary">Edit</button>
            </div>
          </form>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      appointment: {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        propertyPostcode: '',
        appointmentDate: '',
        notes: ''
      }
    }
  },
  props: {
    appointmentID: String
  },
  computed:{
    ...mapGetters(['getAppointments']),
    appDate: {
    get() {
      return this.appointment?.appointmentDate
        ? this.appointment.appointmentDate.slice(0, 16) // "YYYY-MM-DDTHH:mm"
        : '';
      },
      set(value) {
      this.appointment.appointmentDate = value;
    }
    }
  },

  methods:{
    getAppointmentById(appointmentID) {
      this.appointment = this.getAppointments.find(app => app._id === appointmentID);
    },
    async editForm() {
      try{
        this.appointment.appointmentDate = this.appDate + ":00.000Z";
      await this.$store.dispatch('editAppointment', { 
        appointmentId: this.appointment._id, 
        updatedData: this.appointment
      });
        console.log("Appointment updated successfully");
      // Close modal
        const modalEl = document.getElementById("EditAppointmentModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        modal.hide();
      } catch (err) {
        console.error("Error updating appointment:", err);
        alert("Failed to update appointment." + (err.status === 400 ? " There is a conflict with another appointment." : "Please try again."));
      }
    }
 },
 watch: {
    appointmentID: {
      immediate: true,
      handler(newID) {
        if (!newID) return;
        this.appointment = this.getAppointments.find(a => a._id === newID);
  
      }
    }
  }
}
</script>


<style>
</style>