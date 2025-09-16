# MetaMask + MongoDB + Blockchain Project

This project demonstrates an integration of **MetaMask (Ethereum wallet)** with a **Node.js backend** and **MongoDB Atlas**.  
It allows users to send a transaction, store details in a database, and generate a secure password.  
Additionally, it saves all transactions in a blockchain-friendly structure and provides a UI to view them.

---

## ✨ Features
- 🔗 Connect MetaMask wallet  
- 💰 Send a small ETH transaction (default 0.0001 ETH on Sepolia testnet)  
- 📝 Input **Name** and **Purpose** (e.g., Netflix, Amazon)  
- 🔑 Automatically generates a **random password** after each transaction  
- 🗄️ Stores:
  - User name  
  - Wallet address  
  - Purpose  
  - Transaction hash  
  - Random password  
  - Metadata (block number, network, etc.)  
- 📜 Transactions viewer page with a searchable table  

---

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS, Vanilla JS, [ethers.js](https://docs.ethers.org/)  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB Atlas (cloud-based)  
- **Wallet**: MetaMask (Ethereum browser extension)  

---

## 📂 Project Structure
```
project-root/
│── server.js           # Express backend server
│── routes/api.js       # API routes (users & transactions)
│── models/User.js      # User schema
│── models/Transaction.js # Transaction schema
│── frontend/
│   ├── index.html      # Main UI (connect MetaMask & send)
│   ├── transactions.html # Transactions viewer
│   ├── script.js       # Frontend logic
│   └── style.css       # Styling
└── package.json
```

---

## ⚙️ Setup & Run

### 1. Clone the repo
```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### 2. Install backend dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory:
```env
PORT=4000
MONGO_URI=your-mongodb-atlas-uri
```

### 4. Run backend
```bash
npm run dev
```

Expected output:
```
MongoDB connected
Server running on 4000
```

### 5. Open frontend
- Open `frontend/index.html` in your browser.  
- Connect MetaMask → Enter details → Send transaction.  

### 6. View transactions
- Open `frontend/transactions.html` in your browser.  
- All saved records will be displayed in a table with **name, wallet, purpose, password, tx hash, date**.

---

## 🚀 Future Enhancements
- Deploy backend on **Render/Heroku** and frontend on **Vercel/Netlify**.  
- Replace ETH transfer with a **custom smart contract** (e.g., PaymentRegistry.sol).  
- Add **search & filter** to transactions viewer.  
- Role-based **admin dashboard**.  

---

## 📚 References
- [Ethers.js Docs](https://docs.ethers.org/)  
- [MongoDB Atlas](https://www.mongodb.com/atlas/database)  
- [MetaMask Developer Docs](https://docs.metamask.io/)  
- [Express.js](https://expressjs.com/)  

---

## 📸 Demo Screens
- **Main Page (MetaMask + Form + Transaction)**  
- **Transactions Viewer Table**  

---

💡 This project is built as a **blockchain-integrated web app** for learning and demonstration purposes.
