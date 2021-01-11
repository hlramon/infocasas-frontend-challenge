import utilsStyles from "../styles/utils.module.css";

function FilterAndSort({ onFilterChange, onSortChange, completeness }) {
  return (
    <div className={utilsStyles.marginTop}>
      <h3>Filter and Sort Tasks</h3>
      <div className="row">
        <div className="col-sm-6">
          <input
            type="text"
            className="form-control"
            placeholder="Filter tasks"
            onChange={onFilterChange}
          />
        </div>
        <div className="col-sm-6">
          <button className="btn btn-info" onClick={onSortChange}>
            Sort by {completeness ? "completeness" : "uncompleteness"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterAndSort;
