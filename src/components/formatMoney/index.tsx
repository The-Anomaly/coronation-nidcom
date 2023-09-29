const FormatMoney = ({ amount }) => {
  const lhs = amount.toLocaleString().split(".")[0];
  const rhs = amount.toLocaleString().split(".")[1];

  return (
    <span>
      <span style={{ fontWeight: "700" }}>₦</span>{" "}
      {lhs}
      <span style={{ fontSize: "80%" }}>.{!rhs ? "00" : rhs}</span>
    </span>
  );
};

export { FormatMoney };
