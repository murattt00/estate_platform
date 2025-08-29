const {Appointment, recalcFields} = require('../models/Appointment');


exports.createAppointment = async (req, res) => {
    try {
        const tempAppointment = new Appointment(req.body);
        await recalcFields(tempAppointment); 
        const conflict = await Appointment.findOne({
            agent: tempAppointment.agent,
            departureTime: { $lt: new Date(tempAppointment.availableAgainTime) },
            availableAgainTime: { $gt: new Date(tempAppointment.departureTime) }
                
        });
        if (conflict) {
            return res.status(400).json({ message: "There is a conflict with an existing appointment." });
        }
        const appointment = await Appointment.create(req.body);
        res.status(201).json( appointment );
    } catch (error) {
        res.status(500).json({ message: 'Error creating appointment', error });
    }
};

exports.updateAppointment = async (req, res) => {
    try {
        if (req.body.propertyPostcode || req.body.appointmentDate) {
            const currentDoc = await Appointment.findById(req.params.id);
            if (!currentDoc) {
                return res.status(404).json({ message: 'Appointment not found' });
            }

         
            const merged = { ...currentDoc.toObject(), ...req.body };
            
        
            if (merged.appointmentDate) {
                merged.appointmentDate = new Date(merged.appointmentDate);
            }

            const postcode = require("../utils/postCode");
            const map = require("../utils/map");
            
            const officeCoords = await postcode.getCoordinates(process.env.Office_Postcode);
            const propertyCoords = await postcode.getCoordinates(merged.propertyPostcode);
            const travelData = await map.getTravelData(officeCoords, propertyCoords);

            merged.distance = travelData.distance;
            merged.travelTime = travelData.duration;

            const appointmentDate = new Date(merged.appointmentDate);
            merged.departureTime = new Date(appointmentDate.getTime() - travelData.durationValue * 1000);
            merged.returnTime = new Date(merged.departureTime.getTime() + travelData.durationValue * 1000 * 2 + 60 * 60 * 1000);
            merged.availableAgainTime = merged.returnTime;

            const conflict = await Appointment.findOne({
                agent: merged.agent,
                _id: { $ne: req.params.id },  
                departureTime: { $lt: merged.availableAgainTime },
                availableAgainTime: { $gt: merged.departureTime }
            });

            if (conflict) {
                return res.status(400).json({ message: "There is a conflict with an existing appointment." });
            }

            req.body.distance = merged.distance;
            req.body.travelTime = merged.travelTime;
            req.body.departureTime = merged.departureTime;
            req.body.returnTime = merged.returnTime;
            req.body.availableAgainTime = merged.availableAgainTime;
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true, runValidators: true }
        );
        
        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        
        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Update appointment error:', error);
        res.status(500).json({ message: 'Error updating appointment', error });
    }
};


exports.deleteAppointment = async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting appointment', error });
    }
};

exports.getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find({ agent: req.params.agent });
        res.status(200).json( {appointments} );
    } catch (error) {
        res.status(500).json({ message: 'Error fetching appointments', error });
    }
};
