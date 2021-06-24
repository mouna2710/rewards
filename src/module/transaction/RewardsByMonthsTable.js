import React, { useMemo } from "react";
import "./RewardsByMonthsTable.css";
import {
  getRewardsByMonthData,
  getTotalRewards,
} from "../../utility/transaction.utility";

const RewardsByMonthsTable = ({ transactions }) => {
  const { months, data } = useMemo(() => getRewardsByMonthData(transactions), [
    transactions,
  ]);

  return (
    <div className="reward-summary-container">
      <h4 className="title">Reward Summary</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            {months.map((m) => {
              return <th key={m}>{m}</th>;
            })}
            <th>Total Rewards</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((customer) => {
            return (
              <tr>
                <td>{customer}</td>
                {months.map((m) => {
                  return <td key={m}>{getTotalRewards(data[customer][m])}</td>;
                })}
                <td key="total">
                  {getTotalRewards(
                    transactions.filter((txn) => txn.name == customer)
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RewardsByMonthsTable;
