import "../styles/JobCard.css";

function JobCard({ title, company, jobType, salary, summary }) {
  return (
    <div className="job-card">
      <p className="job-card-company">{company}</p>
      <h3>{title}</h3>
      <p className="job-card-meta">{jobType}</p>
      <p className="job-card-salary">{salary}</p>
      <p className="job-card-summary">{summary}</p>
      <button type="button">View Details</button>
    </div>
  );
}

export default JobCard;
