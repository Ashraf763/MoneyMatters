import { useState, useEffect } from "react";
import TransactionList from "../TransactionList";
import "./index.css";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [activeBtn, setActiveBtn] = useState("all");

  const filteredTransactions = transactions?.filter((transaction) => {
    if (activeBtn === "all") return true;
    return transaction.type === activeBtn;
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "content-type": "application/json",
            "x-hasura-admin-secret":
              "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role": "user",
            "x-hasura-user-id": "1",
          },
        };
        const response = await fetch(
          "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=20&offset=0",
          options
        );
        const responseData = await response.json();
        console.log(responseData.transactions);
        const sortedTransactions = [...responseData.transactions].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        console.log("hi");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div>
        <div className="px-4 py-3 d-flex justify-content-between">
          <h3 className="fs-5">Transactions</h3>
          <button type="button" className="btn btn-primary btn-sm rounded-3">
            + Add Transaction
          </button>
        </div>

        <div className="d-flex gap-3 px-4">
          <button
            className={`${activeBtn === "all" && "active-btn"}`}
            onClick={() => setActiveBtn("all")}
          >
            All Transactions
          </button>
          <button
            className={`${activeBtn === "debit" && "active-btn"}`}
            onClick={() => setActiveBtn("debit")}
          >
            Debit
          </button>
          <button
            className={`${activeBtn === "credit" && "active-btn"}`}
            onClick={() => setActiveBtn("credit")}
          >
            Credit
          </button>
        </div>
      </div>

      <div className="main-dashboard">
        <div className="p-4 px-5">
          <TransactionList transactions={filteredTransactions} />
        </div>
      </div>
    </div>
  );
}

export default Transactions;
