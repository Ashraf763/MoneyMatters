const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

function TransactionList({ transactions }) {
  return (
    <div>
      <ul className="list-unstyled list-group-flush list-group rounded-4">
        {transactions.map((each) => (
          <li
            key={each.id}
            className="p-2 px-3 px-lg-4 list-group-item d-flex justify-content-between align-items-center w-100"
          >
            <div className="w-25 d-flex align-items-center">
              <i
                className={`bi fs-4 ${
                  each.type === "debit"
                    ? "bi-arrow-up-circle text-danger"
                    : "bi-arrow-down-circle text-success "
                } `}
              ></i>
              <span className="ps-2">{each.transaction_name}</span>
            </div>
            <span className="text-secondary">{each.category}</span>
            <span className="text-secondary">{formatDate(each.date)}</span>
            <span
              className={`${
                each.type === "debit" ? "text-danger" : "text-success"
              }`}
            >
              {each.type === "debit" ? "-" : "+"} ${each.amount}
            </span>
            <i className="bi bi-trash text-danger"></i>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;
