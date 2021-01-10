function FilterAndSort({ onFilterChange, onSortChange }) {
  return (
    <div>
      <p>Filter and Sort Tasks</p>
      <input type="text" placeholder="Filter tasks" onChange={onFilterChange} />
      <button onClick={onSortChange}>Sort by completeness</button>
    </div>
  );
}

export default FilterAndSort;
