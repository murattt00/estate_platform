import { createStore } from "vuex"
import axios from "axios"


const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

const store = createStore({
  state() {
    return {
      token: localStorage.getItem("token") || null,
      author: localStorage.getItem("author") ? JSON.parse(localStorage.getItem("author")) : null,
      appointments: localStorage.getItem("appointments") ? JSON.parse(localStorage.getItem("appointments")) : [],
      syncInterval: null
    }
  },
  mutations: {
    setUser(state, payload) {
      state.token = payload.token
      state.author = payload.author
      state.appointments = payload.appointments
      // localStorage’a yaz
      localStorage.setItem("token", payload.token)
      localStorage.setItem("author", JSON.stringify(payload.author))
      localStorage.setItem("appointments", JSON.stringify(payload.appointments))
    },
    setAppointments(state, appointments) {
      state.appointments = appointments
      localStorage.setItem("appointments", JSON.stringify(appointments))
      },
    clearUser(state) {
      state.token = null
      state.author = null
      state.appointments = []
      if (state.syncInterval) {
        clearInterval(state.syncInterval)
        state.syncInterval = null
      }
      localStorage.removeItem("token")
      localStorage.removeItem("author")
      localStorage.removeItem("appointments")
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      const res = await axios.post(`${API_URL}/authors/login`, {
        email,
        password
      })
      const appointments = await axios.get(`${API_URL}/appointments/${res.data.author.id}`, {
        headers: {
          Authorization: `Bearer ${res.data.token}`
        }
      })
      commit("setUser", {
        token: res.data.token,
        author: res.data.author,
        appointments: appointments.data.appointments || []
      })
    },
    logout({ commit }) {
      commit("clearUser")
    },
    register(_ , { name, email, password }) {
      return axios.post(`${API_URL}/authors`, {
        name,
        email,
        password
      })
    },
    async updateAppointments({ commit, state }) {
      if (!state.author?.id || !state.token) return;
      
      try {
        console.log('Updating appointments...');
        const response = await axios.get(`${API_URL}/appointments/${state.author.id}`, {
          headers: { Authorization: `Bearer ${state.token}` }
        });
        commit("setAppointments", response.data.appointments || []);
        console.log('Appointments updated!');
      } catch (error) {
        console.error("Update failed:", error);
      }
    },

    startAutoUpdate({ dispatch, state }) {
      // Eğer zaten interval varsa temizle
      if (state.syncInterval) {
        clearInterval(state.syncInterval);
      }
      dispatch('updateAppointments');
      state.syncInterval = setInterval(() => {
        dispatch('updateAppointments');
      }, 2 * 60 * 1000); // 2 dakika
      
      console.log('Auto update started - every 2 minutes');
    },

  async createAppointment({ commit, state }, { appointmentData, agent }) {
  try{
    const response = await axios.post(`${API_URL}/appointments`, { ...appointmentData, agent }, {
      headers: {Authorization: `Bearer ${state.token}`}
    });
    const updatedAppointments = [...state.appointments, response.data];
    commit("setAppointments", updatedAppointments);
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
},
  async deleteAppointment({ commit, state }, appointmentId) {
  try {
    await axios.delete(`${API_URL}/appointments/${appointmentId}`, {
      headers: { Authorization: `Bearer ${state.token}` }
    });
    const updatedAppointments = state.appointments.filter(a => a._id !== appointmentId);
    commit('setAppointments', updatedAppointments);
  } catch (err) {
    console.error('Delete appointment failed:', err);
  }
},
async editAppointment({ commit, state }, { appointmentId, updatedData }) {
  try {
    const response = await axios.put(`${API_URL}/appointments/${appointmentId}`, updatedData, {
      headers: { Authorization: `Bearer ${state.token}` }
    });
    const updatedAppointments = state.appointments.map(a => a._id === appointmentId ? response.data : a);
    commit('setAppointments', updatedAppointments);
  } catch (error) {
    console.error("Error editing appointment:", error);
    throw error;
  }
},
},
  getters: {
    isAuthenticated: (state) => !!state.token,
    currentAuthor: (state) => state.author,
    getAppointments: (state) => state.appointments || []
  }
})

export default store

