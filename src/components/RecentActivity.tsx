interface AgencyActivity {
  name: string;
  time: string;
}

const recentAdded: AgencyActivity[] = [
  { name: "GreenTech Solutions", time: "2 hours ago" },
  { name: "Urban Analytics", time: "yesterday" },
  { name: "EcoServices", time: "3 days ago" },
];

const recentDeleted: AgencyActivity[] = [
  { name: "OldData Corp", time: "1 day ago" },
  { name: "LegacyGov API", time: "4 days ago" },
];

export default function RecentActivity() {
  return (
    <section className="recent-activity">
      <div className="recent-card">
        <h2>Recently Added Agencies</h2>
        <ul>
          {recentAdded.map(({ name, time }) => (
            <li key={name}>
              <strong>{name}</strong> - added {time}
            </li>
          ))}
        </ul>
      </div>

      <div className="recent-card deleted">
        <h2>Recently Deleted Agencies</h2>
        <ul>
          {recentDeleted.map(({ name, time }) => (
            <li key={name}>
              <strong>{name}</strong> - deleted {time}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
