const express = require("express");

exports.getLoginPage = (req, res) => {
  res.send("Welcome to the Login Page");
};

exports.getDashboardPage = (req, res) => {
  // her author icin appointmentları listeleme yapılacak
  res.send("Welcome to the Dashboard");
};

exports.getAppointmentPage = (req, res) => {
  res.send("Welcome to the Appointment Page");
};

exports.getRegisterPage = (req, res) => {
  res.send("Welcome to the Register Page");
};