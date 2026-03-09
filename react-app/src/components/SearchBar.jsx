function SearchBar() {
  return (
    <div style={{ margin: "20px 0" }}>
      <input
        type="text"
        placeholder="Search..."
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "6px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
}

export default SearchBar;
