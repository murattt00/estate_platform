const axios = require("axios");

exports.getTravelData = async (office, destination) => {
  const apiKey = process.env.Google_Maps_API;

  const officeCoords = `${office.latitude},${office.longitude}`;
  const destinationCoords = `${destination.latitude},${destination.longitude}`;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${officeCoords}&destinations=${destinationCoords}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.status !== "OK") throw new Error("Google Maps API error");

    const element = data.rows[0].elements[0];
    if (element.status !== "OK") throw new Error("Invalid route");

    return {
      duration: element.duration.text,       // "25 mins"
      durationValue: element.duration.value  // saniye
    };
  } catch (err) {
    console.error("Error fetching travel data:", err.message);
    throw err;
  }
};


