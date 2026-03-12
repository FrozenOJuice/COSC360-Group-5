import "../styles/AdminPage.css";

const moderationQueue = [
  {
    title: "Employer account approvals",
    count: "8 pending",
    detail: "Review new companies that need manual verification before posting jobs.",
  },
  {
    title: "Flagged job posts",
    count: "3 flagged",
    detail: "Check reports for inaccurate listings, expired roles, and duplicate posts.",
  },
  {
    title: "Support escalations",
    count: "5 open",
    detail: "Follow up on payment, access, and account recovery requests from the queue.",
  },
];

const platformStats = [
  { label: "Active employers", value: "126" },
  { label: "Open job posts", value: "482" },
  { label: "New users today", value: "37" },
  { label: "Reported listings", value: "11" },
];

function AdminPage() {
  return (
    <main className="landing-page">
      <section className="admin-hero" id="admin">
        <div className="admin-hero-copy">
          <p className="hero-eyebrow">Admin Dashboard</p>
          <h1>Oversee platform health, access, and moderation.</h1>
          <p className="hero-copy">
            Track operational load, review flagged content, and keep employer and
            job seeker activity moving through the system cleanly.
          </p>

          <div className="hero-actions">
            <a className="hero-button hero-button-primary" href="#admin-queue">
              Review Queue
            </a>
            <a className="hero-button hero-button-secondary" href="#admin-overview">
              Platform Overview
            </a>
          </div>
        </div>

        <aside className="admin-priority-panel" id="admin-priority">
          <p className="admin-panel-label">Priority</p>
          <h2>Today&apos;s operational focus</h2>
          <p>
            Clear approvals, resolve reported content quickly, and keep the
            posting pipeline healthy for both sides of the marketplace.
          </p>
          <div className="admin-priority-list">
            <div>
              <strong>12m</strong>
              <span>median review time</span>
            </div>
            <div>
              <strong>94%</strong>
              <span>queue cleared today</span>
            </div>
          </div>
        </aside>
      </section>

      <section className="admin-overview-grid" id="admin-overview">
        {platformStats.map((stat) => (
          <article key={stat.label} className="admin-stat-card">
            <p>{stat.label}</p>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="admin-workspace" id="admin-queue">
        <div className="section-heading">
          <p className="section-label">Operations Queue</p>
          <h2>Work items that need admin attention</h2>
        </div>

        <div className="admin-queue-grid">
          {moderationQueue.map((item) => (
            <article key={item.title} className="admin-queue-card">
              <p className="admin-queue-count">{item.count}</p>
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
              <button type="button">Open Queue</button>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
