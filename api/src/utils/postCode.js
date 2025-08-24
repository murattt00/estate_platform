const axios = require("axios");


exports.getCoordinates = async (postcode) => {
  try {
    const response = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);

    if (response.data.status === 200) {
      const { latitude, longitude } = response.data.result;
      return { latitude, longitude };
    } else {
      throw new Error("Invalid postcode");
    }
  } catch (error) {
    console.error("Postcode lookup failed:", error.message);
    throw error;
  }
}

