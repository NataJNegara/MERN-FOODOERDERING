import Filter from "../../components/Filter/Filter";

export default function OrdersUserOperation() {
  return (
    <div>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "new", label: "New" },
          { value: "payed", label: "Payed" },
        ]}
      />
    </div>
  );
}
