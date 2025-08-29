<template>
  <div class="row g-3">
          <div class="col-12 col-lg-4">
            <div class="card card-soft shadow-sm">
              <div class="card-body">
                <div class="text-muted">Total Appointments</div>
                <div class="metric">{{ getAppointments.length }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card card-soft shadow-sm">
              <div class="card-body">
                <div class="text-muted">Upcoming Appointments</div>
                <div class="metric">{{ getAppointments.filter(appointment => !appointment.completed).length }}</div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="card card-soft shadow-sm">
              <div class="card-body">
                <div class="text-muted">Completed</div>
                <div class="metric">{{ getAppointments.filter(appointment => appointment.completed).length }}</div>
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
}
</script>

<style>
.card-soft { border: 0; border-radius: 16px; }
.metric { font-size: 2.25rem; font-weight: 700; }
</style>