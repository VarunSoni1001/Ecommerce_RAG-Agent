const asyncHandler = require("express-async-handler");
const StoreInfo = require("../models/storeInfoModel");

const createOrUpdateStoreInfo = asyncHandler(async (req, res) => {
  const { about, privacy, returnPolicy, contactDetails, address } = req.body;

  if (
    !about ||
    !privacy ||
    !returnPolicy ||
    !contactDetails ||
    !contactDetails.email ||
    !contactDetails.phone ||
    !address ||
    !address.street ||
    !address.pincode ||
    !address.city ||
    !address.state
  ) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: about, privacy, returnPolicy, contactDetails(email,phone), address(street,pincode,city, state)"
    );
  }

  const storeInfo = await StoreInfo.createOrUpdate({
    about,
    privacy,
    returnPolicy,
    contactDetails,
    address,
  });

  res.json(storeInfo);
});

const getStoreInfo = asyncHandler(async (req, res) => {
  const storeInfo = await StoreInfo.findOne();

  if (!storeInfo) {
    res.status(404);
    throw new Error("Store info not found");
  }

  res.json(storeInfo);
});

const deleteStoreInfo = asyncHandler(async (req, res) => {
  await StoreInfo.deleteOne();

  res.json({ message: "Store info deleted successfully" });
});

module.exports = {
  createOrUpdateStoreInfo,
  getStoreInfo,
  deleteStoreInfo,
};
