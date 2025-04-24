const Razorpay = require("razorpay");
require("dotenv").config();

const RAZORPAY_API_KEY = process.env.RAZORPAY_API_KEY;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

if (!RAZORPAY_API_KEY) {
  throw new Error("RAZORPAY_API_KEY is not found in .env file", "BACKEND");
}

if (!RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET is not found in .env file", "BACKEND");
}

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_KEY_SECRET,
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  if (!amount) {
    return res.status(400).json({
      success: false,
      message: "Amount is required",
    });
  }

  const option = {
    amount: amount * 100,
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(option);
    if (!order) res.status(500).send("Some error occured");
    // console.log("order", order);
    return res.json({
      success: true,
      order,
    });
  } catch (error) {
    return res.status(500).send(error);
  }
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
