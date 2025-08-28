const stats = [
  { icon: "fas fa-building", label: "Total Agencies", value: 10 },
  { icon: "fas fa-handshake", label: "Total Suppliers", value: 2 },
  { icon: "fas fa-plane", label: "Total Flights", value: 3 },
  { icon: "fas fa-users", label: "Total Users", value: 9 },
];

export default function StatsCards() {
  return (
    <section className="stats">
      {stats.map(({ icon, label, value }) => (
        <div className="card" key={label}>
          <i className={`card-icon ${icon}`} />
          <h3>{label}</h3>
          <p>{value}</p>
        </div>
      ))}
    </section>
  );
}
