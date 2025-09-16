const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },   // store username in transaction
  wallet: { type: String, required: true },
  purpose: { type: String, required: true },
  txHash: { type: String },
  contractAddress: { type: String },
  value: { type: String },
  meta: { type: Object },
  password: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", TransactionSchema);