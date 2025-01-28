import PropTypes from "prop-types";

const ProductList = ({ products, removeProduct }) => {
  return (
    <div>
      {products.length === 0 ? (
        <p>No Product Found</p>
      ) : (
        <table className="product-table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>
                  <button
                    onClick={() => removeProduct(index)}
                    className="delete-button"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  removeProduct: PropTypes.func.isRequired,
};

export default ProductList;
