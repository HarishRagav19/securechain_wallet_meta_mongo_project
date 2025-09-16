const connectBtn = document.getElementById("connectBtn");
const payBtn = document.getElementById("payBtn");
const walletSpan = document.getElementById("wallet");
const statusDiv = document.getElementById("status");
let provider, signer, userAddress;

const BACKEND = "http://localhost:4000";

// Generate random password
function generatePassword(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

async function connectMetaMask() {
  if (!window.ethereum) {
    statusDiv.innerText = "MetaMask not found. Install it!";
    return;
  }
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    userAddress = await signer.getAddress();
    walletSpan.innerText = userAddress;
    statusDiv.innerText = "Connected";
    payBtn.disabled = false;
  } catch (err) {
    console.error(err);
    statusDiv.innerText = "Connection rejected";
  }
}

connectBtn.addEventListener("click", connectMetaMask);

async function saveUserToBackend(name, wallet) {
  try {
    const res = await fetch(`${BACKEND}/api/user`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, wallet })
    });
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function saveTxToBackend(payload) {
  try {
    const res = await fetch(`${BACKEND}/api/transaction`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(payload)
    });
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

payBtn.addEventListener("click", async () => {
  if (!signer) {
    statusDiv.innerText = "Connect MetaMask first";
    return;
  }
  const name = document.getElementById("name").value || "anonymous";
  const purpose = document.getElementById("purpose").value || "general";

  await saveUserToBackend(name, userAddress);

  try {
    statusDiv.innerText = "Prompting MetaMask for transaction...";
    const txRequest = {
      to: userAddress,
      value: ethers.parseEther("0.0001")
    };
    const txResponse = await signer.sendTransaction(txRequest);
    statusDiv.innerText = `Transaction submitted: ${txResponse.hash}`;
    const receipt = await txResponse.wait();
    statusDiv.innerText = `Transaction confirmed: ${receipt.transactionHash}`;

    // Generate random password
    const password = generatePassword();
    statusDiv.innerText += `\nGenerated Password: ${password}`;

    const saved = await saveTxToBackend({
      wallet: userAddress,
      name,
      purpose,
      txHash: receipt.transactionHash,
      value: receipt.effectiveGasPrice ? receipt.effectiveGasPrice.toString() : null,
      password,
      meta: { network: (await provider.getNetwork()).name, blockNumber: receipt.blockNumber }
    });

    if (saved && saved._id) {
      statusDiv.innerText += `\nSaved transaction to backend (id: ${saved._id})`;
    } else {
      statusDiv.innerText += `\nTransaction save failed on backend.`;
    }
  } catch (err) {
    console.error(err);
    statusDiv.innerText = `Tx error: ${err.message || err}`;
  }
});