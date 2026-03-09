import JobCard from "../components/JobCard";
import "../styles/App.css";

const previewJobs = [
  {
    title: "Frontend Developer",
    company: "Northstar Labs",
    jobType: "Remote",
    salary: "$72,000 - $88,000",
    summary: "Build polished React interfaces for a growing hiring platform.",
  },
  {
    title: "Backend Developer",
    company: "Maple Systems",
    jobType: "Hybrid",
    salary: "$84,000 - $102,000",
    summary: "Ship secure Node and MongoDB features for account and job workflows.",
  },
  {
    title: "UX Designer",
    company: "Brightpath",
    jobType: "Full-time",
    salary: "$68,000 - $80,000",
    summary: "Design clear application flows for employers and job seekers.",
  },
];

function HomePage() {
  return (
    <main className="landing-page">
      <section className="hero-section" id="top">
        <p className="hero-eyebrow">Job Board</p>
        <h1>Find your next opportunity in one place.</h1>
        <p className="hero-copy">
          Browse current openings, preview featured roles, and create an account
          when you are ready to apply.
        </p>

        <div className="hero-actions">
          <a className="hero-button hero-button-primary" href="#jobs">
            Browse All Jobs
          </a>
          <a className="hero-button hero-button-secondary" href="#register">
            Create An Account
          </a>
        </div>
      </section>

      <section className="preview-section" id="jobs">
        <div className="section-heading">
          <p className="section-label">Featured Jobs</p>
          <h2>Preview current opportunities</h2>
        </div>

        <div className="job-grid">
          {previewJobs.map((job) => (
            <JobCard key={`${job.company}-${job.title}`} {...job} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default HomePage;
