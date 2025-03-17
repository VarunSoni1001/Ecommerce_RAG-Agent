const Razorpay = require("razorpay");
require("dotenv").config();

const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;

if (!RAZORPAY_API_KEY) {
  throw new Error("RAZORPAY_API_KEY is not found in .env file", "FRONTEND");
}

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: "sRO0YkBxvgMg0PvWHJN16Uf7",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount * 100,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({
    success: true,
    order,
  });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({
    razorpayOrderId,
    razorpayPaymentId,
  });
};

module.exports = {
  checkout,
  paymentVerification,
};
