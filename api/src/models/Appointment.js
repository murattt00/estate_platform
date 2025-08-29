const mongoose = require('mongoose');
const Author = require('./Author');
const slugify = require('slugify');
const  map  = require("../utils/map");
const postcode = require("../utils/postCode");


const appointmentSchema = new mongoose.Schema({
    agent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
    },
    customerName: { 
        type: String, 
        required: true 
    },
    customerEmail: { 
        type: String 
    },
    customerPhone: { 
        type: String 
    },
    propertyPostcode: { 
        type: String, 
        required: true 
    },
    appointmentDate: { 
        type: Date, 
        required: true 
    },
    notes:{
        type: String
    },
    distance: {
        type: String
    },
    travelTime: { 
        type: String, 
    },
    departureTime: { 
        type: Date 
    },
    returnTime: { 
        type: Date 
    },
    availableAgainTime: { 
        type: Date 
    },
}, { timestamps: true });



async function recalcFields(doc) {
  const officeCoords = await postcode.getCoordinates(process.env.Office_Postcode);
  const propertyCoords = await postcode.getCoordinates(doc.propertyPostcode);
  const travelData = await map.getTravelData(officeCoords, propertyCoords);

  doc.distance = travelData.distance;
  doc.travelTime = travelData.duration;

  const appointmentDate = new Date(doc.appointmentDate);

  doc.departureTime = new Date(appointmentDate.getTime() - travelData.durationValue * 1000);
  doc.returnTime = new Date(doc.departureTime.getTime() + travelData.durationValue * 1000 * 2 + 60 * 60 * 1000);
  doc.availableAgainTime = doc.returnTime;
}

// Create & Save için
appointmentSchema.pre("save", async function (next) {
  await recalcFields(this);
  next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = {Appointment, recalcFields};
