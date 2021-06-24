import React, { useCallback, useEffect, useState } from "react";
import { getRewards, sortData } from "../../utility/transaction.utility";
import "./TransactionTable.css";

const TransactionTable = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [sortDetails, setSortDetails] = useState({
    sortBy: "rewards",
    order: "asc",
  });
  useEffect(() => {
    setData(sortData([...transactions], sortDetails.sortBy, sortDetails.order));
  }, [transactions, sortDetails]);

  const sortClickHandler = useCallback(
    (sortBy) => {
      setSortDetails({
        sortBy,
        order:
          sortDetails.sortBy == sortBy
            ? sortDetails.order == "asc"
              ? "desc"
              : "asc"
            : "asc",
      });
    },
    [transactions, sortDetails]
  );

  const getClassName = (sortBy) => {
    return sortBy == sortDetails.sortBy
      ? sortDetails.order == "asc"
        ? "fa fa-sort-amount-asc"
        : "fa fa-sort-amount-desc"
      : "fa fa-sort-amount-asc opacity20";
  };

  return data.length === 0 ? (
    "There is no transaction data."
  ) : (
    <div className="container">
      <h4 className="title">Transaction History</h4>
      <table className="table">
        <thead>
          <tr>
            <th>S.N.</th>
            <th>
              Name{" "}
              <i
                onClick={() => {
                  sortClickHandler("name");
                }}
                className={getClassName("name")}
                aria-hidden="true"
              ></i>
            </th>
            <th>
              Date{" "}
              <i
                onClick={() => {
                  sortClickHandler("date");
                }}
                className={getClassName("date")}
                aria-hidden="true"
              ></i>
            </th>
            <th>
              Amount{" "}
              <i
                onClick={() => {
                  sortClickHandler("amount");
                }}
                className={getClassName("amount")}
                aria-hidden="true"
              ></i>
            </th>
            <th>
              Rewards{" "}
              <i
                onClick={() => {
                  sortClickHandler("rewards");
                }}
                className={getClassName("rewards")}
                aria-hidden="true"
              ></i>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((txn, idx) => {
            const d = new Date(txn.date);
            return (
              <tr key={txn.id}>
                <td>{idx + 1}</td>
                <td>{txn.name}</td>
                <td>{`${d.getDate()}/${
                  d.getMonth() + 1
                }/${d.getFullYear()}`}</td>
                <td>{txn.amount}</td>
                <td>{getRewards(txn.amount)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
