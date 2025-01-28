import PropTypes from "prop-types";
import "./styles.css";

const SearchBar = ({ setSearchQuery }) => {
  return (
    <input
      type="text"
      placeholder="Search products"
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar"
    />
  );
};

SearchBar.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
};

export default SearchBar;
