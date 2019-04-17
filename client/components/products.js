import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct} from '../store/products'

export const AllProducts = (props) => {
  const products = props.products
  const removeProduct = props.deleteProduct

  if (!products || products.length === 0) {
    return (
      <div>
        <h1>No Products</h1>
      </div>
    )
  }
  else {
    return (
      <div>
        <div>
          {products.map (product => {
            return (
              <div key={product.id}>
                <Link to={`/products/${product.id}`} >
                  <p> {product.name}</p>
                  <img src={product.imageUrl} />
                </Link>
                <button type='button' onClick={() => removeProduct(product.id)}>DELETE</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  deleteProduct: id => dispatch(deleteProduct(id))
})

const mapState = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
