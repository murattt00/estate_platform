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
    propertyPostcode: { 
        type: String, 
        required: true 
    },
    appointmentDate: { 
        type: Date, 
        required: true 
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



appointmentSchema.pre('validate', async function(next) {
    const officeCoords = await postcode.getCoordinates(process.env.Office_Postcode);
    const propertyCoords = await postcode.getCoordinates(this.propertyPostcode);
    const travelData = await map.getTravelData(officeCoords, propertyCoords);

    this.travelTime = travelData.duration;
    this.departureTime = new Date(this.appointmentDate.getTime() - travelData.durationValue * 1000);
    this.returnTime = new Date(this.departureTime.getTime() + travelData.durationValue * 1000 * 2 + 60 * 60 * 1000); // 1 saat görüşme süresi
    this.availableAgainTime = new Date(this.returnTime.getTime());

    next();
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
