import { Link } from "react-router-dom";
import AdminUsersPanel from "../components/admin/AdminUsersPanel";
import { routePaths, withHash } from "../routing/routes";
import "../styles/AdminPage.css";

function AdminPage() {
  return (
    <main className="landing-page">
      <section className="admin-hero" id="admin">
        <div className="admin-hero-copy">
          <p className="hero-eyebrow">Admin Dashboard</p>
          <h1>Manage account access from one place.</h1>
          <p className="hero-copy">
            This dashboard currently exposes real user-management tools only.
            Platform analytics and moderation metrics are intentionally omitted
            until they are backed by actual data.
          </p>

          <div className="hero-actions">
            <Link
              className="hero-button hero-button-primary"
              to={withHash(routePaths.admin, "admin-users")}
            >
              Manage Users
            </Link>
            <Link
              className="hero-button hero-button-secondary"
              to={withHash(routePaths.admin, "admin-overview")}
            >
              Current Scope
            </Link>
          </div>
        </div>

        <aside className="admin-priority-panel" id="admin-priority">
          <p className="admin-panel-label">Available Now</p>
          <h2>Current admin scope</h2>
          <p>
            Use the user table below to search accounts, review roles, and
            enable or disable access where permitted.
          </p>
          <p>
            This page no longer shows placeholder health metrics, moderation
            queues, or performance summaries.
          </p>
        </aside>
      </section>

      <AdminUsersPanel />
    </main>
  );
}

export default AdminPage;
