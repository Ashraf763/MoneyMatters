import "./style.css";
import { useEffect, useState } from "react";
import WeeklyChart from "../WeeklyChart";
import TransactionList from "../TransactionList";
import LoadingView from "../LoadingView";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ credit: 0, debit: 0 });
  const [isLoading, setIsLoadong] = useState(true);

  const fetchlastTransactions = async () => {
    try {
      setIsLoadong(true);
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
        "https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=3&offset=0",
        options,
      );
      const responseData = await response.json();
      console.log(responseData.transactions);
      setTransactions(responseData.transactions);

      const txn = await fetch(
        "https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",
        options,
      );
      const txnData = await txn.json();

      const formatted = txnData.totals_credit_debit_transactions.reduce(
        (acc, curr) => {
          acc[curr.type] = curr.sum;
          return acc;
        },
        { credit: 0, debit: 0 },
      );
      setSummary(formatted);
      setIsLoadong(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoadong(false);
    }
  };

  useEffect(() => fetchlastTransactions, []);

  const displayDetails = () => (
    <div className="w-100">
      <div className="px-4 py-3 d-flex justify-content-between border-bottom">
        <h3 className="fs-5">Accounts</h3>
        <button type="button" className="btn btn-primary btn-sm rounded-3">
          + Add Transaction
        </button>
      </div>

      <div className="main-dashboard p-3 px-5">
        <div className="d-flex justify-content-around">
          <div className="bg-white p-3 py-0 px-lg-5 rounded-3 w-50 me-3 d-flex align-items-center justify-content-between">
            <div>
              <p className="text-success fw-bold fs-5">$ {summary.credit}</p>
              <p className="p-0">Credit</p>
            </div>
            <img src="/Credit.png" alt="Credit" className="h-75" />
          </div>
          <div className="bg-white p-3 py-0 px-lg-5 rounded-4 w-50 ms-3 d-flex align-items-center justify-content-between">
            <div>
              <p className="text-danger fw-bold fs-5">$ {summary.debit}</p>
              <p className="p-0">Debit</p>
            </div>
            <img src="/debit.png" alt="debit" className="h-75" />
          </div>
        </div>

        <div className="mt-3">
          <p className="fw-bold mb-1">Transactions</p>
          <div className="bg-white rounded-4">
            <TransactionList transactions={transactions} />
          </div>
        </div>

        <div className="mt-3">
          <p className="fw-bold mb-1">Credit & Debit Overview</p>

          <div className="bg-white rounded-4 p-3 h-15 chart-container">
            <WeeklyChart />
          </div>
        </div>
      </div>
    </div>
  );

  return isLoading ? <LoadingView /> : displayDetails();
}

export default Dashboard;
