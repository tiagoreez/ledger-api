# 📒 Ledger API

This project is a **basic ledger system** that keeps track of money moving between accounts.  
It follows the idea of **double-entry accounting**, which means that every transaction has both a debit and a credit, and the total must always balance to zero.

Think of it as a very simple bookkeeping tool that you can interact with through an API.

---

## 🚀 Getting Started

1. Make sure you have **Node.js** installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run start
   ```
4. The API will be available at:
   ```
   http://localhost:3000
   ```

---

## 📌 Main Concepts

- **Account** → Represents a place where money is stored (e.g., "Cash", "Bank", "Expenses").  
  Each account has:
  - A **direction**: `debit` or `credit`
  - A **balance** (starts at 0 unless set when created)

- **Transaction** → A movement of money that affects two or more accounts.  
  Example: If you move $100 from your "Bank" account to "Cash", the bank is reduced, and cash is increased.

- **Entry** → A single line inside a transaction. It says:
  - Which account is affected
  - Whether it’s a **debit** or **credit**
  - How much money is moving

---

## 📡 Endpoints

### 👉 Create an account
**POST** `/accounts`

Example:
```json
{
  "name": "Cash",
  "direction": "debit"
}
```

Response:
```json
{
  "id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
  "name": "Cash",
  "direction": "debit",
  "balance": 0
}
```

---

### 👉 Get account details
**GET** `/accounts/:id`

Example response:
```json
{
  "id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
  "name": "Cash",
  "direction": "debit",
  "balance": 100
}
```

---

### 👉 Get all accounts
**GET** `/accounts`

This returns the list of **all accounts** currently stored in the system.

Example response:
```json
[
  {
    "id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
    "name": "Cash",
    "direction": "debit",
    "balance": 100
  },
  {
    "id": "22e6bbd0-5d7f-48af-8e47-8ecda1a7eefe",
    "name": "Bank",
    "direction": "credit",
    "balance": 900
  }
]
```

---

### 👉 Create a transaction
**POST** `/transactions`

Example:
```json
{
  "name": "Withdraw money",
  "entries": [
    {
      "direction": "credit",
      "account_id": "22e6bbd0-5d7f-48af-8e47-8ecda1a7eefe",
      "amount": 100
    },
    {
      "direction": "debit",
      "account_id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
      "amount": 100
    }
  ]
}
```

Response:
```json
{
  "id": "3256dc3c-7b18-4a21-95c6-146747cf2971",
  "name": "Withdraw money",
  "entries": [
    {
      "id": "entry1",
      "direction": "credit",
      "account_id": "22e6bbd0-5d7f-48af-8e47-8ecda1a7eefe",
      "amount": 100
    },
    {
      "id": "entry2",
      "direction": "debit",
      "account_id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
      "amount": 100
    }
  ]
}
```

---

### 👉 Get all transactions
**GET** `/transactions`

This returns the list of **all transactions** applied to the ledger.

Example response:
```json
[
  {
    "id": "3256dc3c-7b18-4a21-95c6-146747cf2971",
    "name": "Withdraw money",
    "entries": [
      {
        "id": "entry1",
        "direction": "credit",
        "account_id": "22e6bbd0-5d7f-48af-8e47-8ecda1a7eefe",
        "amount": 100
      },
      {
        "id": "entry2",
        "direction": "debit",
        "account_id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
        "amount": 100
      }
    ]
  }
]
```

---

### 👉 Get transactions details
**GET** `/transactions/:id`

Example response:
```json
[
  {
    "id": "3256dc3c-7b18-4a21-95c6-146747cf2971",
    "name": "Withdraw money",
    "entries": [
      {
        "id": "entry1",
        "direction": "credit",
        "account_id": "22e6bbd0-5d7f-48af-8e47-8ecda1a7eefe",
        "amount": 100
      },
      {
        "id": "entry2",
        "direction": "debit",
        "account_id": "71cde2aa-b9bc-496a-a6f1-34964d05e6fd",
        "amount": 100
      }
    ]
  }
]
```

---

## 📖 Example Flow

1. Create two accounts:
   - "Bank" (credit)
   - "Cash" (debit)

2. Move $100 from "Bank" to "Cash":
   - The bank account balance goes **down by 100**
   - The cash account balance goes **up by 100**

3. Check all accounts:
   ```bash
   GET /accounts
   ```

4. Check all transactions:
   ```bash
   GET /transactions
   ```

---

## ✅ Notes

- Every transaction must balance: total debits = total credits.  
- You cannot directly change account balances; only transactions can do that.  
- The storage is **in memory** → if you restart the server, data will reset.  
