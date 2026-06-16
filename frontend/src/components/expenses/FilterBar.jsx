const FilterBar = ({ filters, setFilters }) => {
  const onChange = (event) => setFilters((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  return (
    <div className="glass-card grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-5">
      <input className="field" name="search" placeholder="Search by title" value={filters.search} onChange={onChange} />
      <select className="field" name="category" value={filters.category} onChange={onChange}>
        <option>All</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Shopping</option>
        <option>Bills</option>
        <option>Education</option>
        <option>Entertainment</option>
        <option>Healthcare</option>
        <option>Others</option>
      </select>
      <input className="field" type="date" name="startDate" value={filters.startDate} onChange={onChange} />
      <input className="field" type="date" name="endDate" value={filters.endDate} onChange={onChange} />
      <select className="field" name="sortBy" value={filters.sortBy} onChange={onChange}>
        <option value="date">Sort by date</option>
        <option value="amount">Sort by amount</option>
      </select>
    </div>
  );
};

export default FilterBar;
