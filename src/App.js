import React from "react";
import "./App.css";
import TransactionTable from "./module/transaction/TransactionTable";
import RewardsByMonthsTable from "./module/transaction/RewardsByMonthsTable";
import { TRANSACTION_DATA } from "./data/data";

function App() {
  return (
    <div className="App">
      <RewardsByMonthsTable transactions={TRANSACTION_DATA} />
      <TransactionTable transactions={TRANSACTION_DATA} />
    </div>
  );
}

export default App;
