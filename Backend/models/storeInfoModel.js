const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var storeInfoSchema = new mongoose.Schema(
  {
    about: {
      type: String,
      required: true,
    },
    privacy: {
      type: String,
      required: true,
    },
    returnPolicy: {
      type: String,
      required: true,
    },
    contactDetails: {
      email: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);
// Export the model
const StoreInfo = mongoose.model("StoreInfo", storeInfoSchema);

// Native implementation to ensure only one row exists
StoreInfo.createOrUpdate = async function (data) {
  const existingDoc = await StoreInfo.findOne();
  if (existingDoc) {
    return await StoreInfo.findByIdAndUpdate(existingDoc._id, data, {
      new: true,
    });
  } else {
    return await StoreInfo.create(data);
  }
};

module.exports = StoreInfo;
