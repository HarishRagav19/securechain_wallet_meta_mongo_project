const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

router.post("/user", async (req, res) => {
  try {
    const { name, wallet } = req.body;
    if (!name || !wallet) return res.status(400).json({ error: "name and wallet required" });

    let user = await User.findOne({ wallet: wallet.toLowerCase() });
    if (!user) {
      user = new User({ name, wallet: wallet.toLowerCase() });
      await user.save();
    } else {
      user.name = name;
      await user.save();
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

router.post("/transaction", async (req, res) => {
  try {
    const { wallet, purpose, txHash, value, contractAddress, meta, name, password } = req.body;
    if (!wallet || !purpose) return res.status(400).json({ error: "wallet and purpose required" });

    let user = await User.findOne({ wallet: wallet.toLowerCase() });
    if (!user) {
      user = new User({ name: name || "unknown", wallet: wallet.toLowerCase() });
      await user.save();
    }

    const tx = new Transaction({
      user: user._id,
      name: name || user.name, // ensure name saved in transaction
      wallet: wallet.toLowerCase(),
      purpose,
      txHash,
      value,
      contractAddress,
      meta,
      password
    });

    await tx.save();
    res.json(tx);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

// Get all transactions
router.get("/transaction/all", async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ createdAt: -1 });
    res.json(txs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "server error" });
  }
});

module.exports = router;