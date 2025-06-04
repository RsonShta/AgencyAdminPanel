import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavLink {
  href: string;
  icon: string;
  label: string;
}

interface NavSection {
  title: string;
  icon: string; // new: for collapsed view
  links: NavLink[];
}

const navSections: NavSection[] = [
  {
    title: "MAIN",
    icon: "fas fa-home",
    links: [{ href: "/dashboard", icon: "fas fa-tachometer-alt", label: "Dashboard" }],
  },
  {
    title: "MANAGEMENT",
    icon: "fas fa-briefcase",
    links: [
      { href: "/dashboard/suppliers", icon: "fas fa-handshake", label: "Suppliers" },
      { href: "/dashboard/users", icon: "fas fa-users", label: "Users" },
      { href: "/dashboard/agencies", icon: "fas fa-building", label: "Agencies" },
      { href: "/dashboard/apitest", icon: "fas fa-plug", label: "Test API" },
      { href: "#", icon: "fas fa-plane", label: "Flights" },
      { href: "#", icon: "fas fa-dollar-sign", label: "Fare Override" }, // changed to money-bill
      { href: "/dashboard/booking", icon: "fas fa-ticket-alt", label: "Booking" },
      { href: "#", icon: "fas fa-hand-holding-usd", label: "Payments" },
      { href: "#", icon: "fas fa-chart-pie", label: "Revenue Analytics" },
      { href: "#", icon: "fas fa-money-bill-wave", label: "Expense Tracking" },
    ],
  },
  {
    title: "SETTINGS",
    icon: "fas fa-cog",
    links: [
      { href: "#", icon: "fas fa-cogs", label: "System Settings" },
      { href: "#", icon: "fas fa-shield-alt", label: "Security" },
      { href: "/login", icon: "fas fa-sign-out-alt", label: "Logout" },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("sidebarCollapsed") === "true";
    setCollapsed(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebarCollapsed", collapsed.toString());
  }, [collapsed]);

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <h2>
        <button
          id="menu-toggle"
          aria-label="Toggle Sidebar"
          aria-expanded={!collapsed}
          onClick={() => setCollapsed((prev) => !prev)}
        >
          <i className="fas fa-bars" />
        </button>
        {!collapsed && <span className="sidebar-title">Admin Panel</span>}
      </h2>
      <hr />

      {navSections.map(({ title, icon, links }) => (
        <nav className="nav-section" key={title}>
          <p className="section-header">
            <i className={icon} />
            {!collapsed && <span style={{ marginLeft: 8 }}>{title}</span>}
          </p>
          {links.map(({ href, icon, label }, idx) => (
            <Link to={href} key={`${label}-${idx}`} className="nav-link">
              <i className={icon} />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>
      ))}
    </aside>
  );
}
