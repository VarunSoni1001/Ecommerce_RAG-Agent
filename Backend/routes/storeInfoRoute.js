const express = require("express");
const {
  createOrUpdateStoreInfo,
  getStoreInfo,
  deleteStoreInfo,
} = require("../controller/storeInfoCtrl");
const router = express.Router();

router.post("/", createOrUpdateStoreInfo);
router.get("/", getStoreInfo);
router.delete("/", deleteStoreInfo);

module.exports = router;
