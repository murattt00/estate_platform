<template>
  <div class="col-12 col-xl-7">
            <div class="card card-soft shadow-sm h-100">
              <div class="card-body">
                <div class="d-flex align-items-center justify-content-between">
                  <h5 class="mb-3">Upcoming Appointments</h5>
                  <a  @click="goToAllAppointments" class="btn btn-sm btn-primary">View all</a>
                </div>
                <div class="table-responsive">
                  <table class="table align-middle">
                    <thead class="table-light">
                      <tr>
                        <th>Client</th>
                        <th>Date</th>
                        <th>Property</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr v-for="appointment in getAppointments.slice(0,3)" :key="appointment.id">
                          <td>{{ appointment.customerName }}</td>
                          <td>{{ appointment.appointmentDate.slice(0, 16).replace("T", " ") }}</td>
                          <td>{{ appointment.propertyPostcode }}</td>
                          <td><a class="btn btn-sm btn-outline-primary" @click="goToAppointment(appointment._id)">View</a></td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
  computed:{
    ...mapGetters(["getAppointments"])
  },
  methods: {
    goToAllAppointments() {
      this.$router.push("/appointments");
    },
    goToAppointment(id) {
      this.$router.push(`/appointment/${id}`);
    }
  }
}
</script>

<style>
.card-soft { border: 0; border-radius: 16px; }
</style>