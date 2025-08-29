<template>
    <div class="modal fade" id="newAppointmentModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content border-0 rounded-4">
        <div class="modal-header">
          <h5 class="modal-title">Create Appointment</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Kapat"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="row g-3">
              <div class="col-md-6">
                <label class="form-label">Customer Name</label>
                <input type="text" class="form-control" placeholder="Jane Doe" v-model="appointmentData.customerName" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Customer Email</label>
                <input type="email" class="form-control" placeholder="jane@example.com" v-model="appointmentData.customerEmail" >
              </div>
              <div class="col-md-6">
                <label class="form-label">Customer Phone</label>
                <input type="tel" class="form-control" placeholder="+44 7..." v-model="appointmentData.customerPhone">
              </div>
              <div class="col-md-6">
                <label class="form-label">Property Postcode</label>
                <input type="text" class="form-control" placeholder="CM2 7PJ" v-model="appointmentData.propertyPostcode" required>
              </div>
              <div class="col-md-6">
                <label class="form-label">Date & Time</label>
                <input type="datetime-local" class="form-control" v-model="formDate" required>
              </div>
              <div class="col-12">
                <label class="form-label">Notes</label>
                <textarea class="form-control" rows="3" placeholder="Optional notes..." v-model="appointmentData.notes"></textarea>
              </div>
            </div>
            <div class="modal-footer">
          <button class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
          <button type="submit" class="btn btn-primary">Create</button>
        </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formDate: '',
      appointmentData: {
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        propertyPostcode: '',
        appointmentDate: '',
        notes: ''
      }
    }
  },
  methods: {
   
    async submitForm() {
      try {
        
        this.appointmentData.appointmentDate = this.formDate + ":00.000Z"
        await this.$store.dispatch('createAppointment', { appointmentData: this.appointmentData, agent: this.$store.state.author.id });
        console.log("Appointment created successfully");
        // Reset form
        this.appointmentData = {
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          propertyPostcode: '',
          appointmentDate: '',
          notes: ''
        };
        // Close modal
        const modalEl = document.getElementById("newAppointmentModal");
        const modal = window.bootstrap.Modal.getInstance(modalEl) || new window.bootstrap.Modal(modalEl);
        modal.hide();
      } catch (err) {
        console.error("Error creating appointment:", err);
        alert("Failed to create appointment." + (err.status === 400 ? " There is a conflict with another appointment." : "Please try again."));
      }
    }
  },

}
</script>

<style>

</style>