import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchProducts} from '../store/products'

class AllProducts extends React.Component {

  componentDidMount() {
    this.props.fetchInitialProducts()
  }
  render () {
    const products = Array.from(this.props.products) || []
    console.log("#########", this.props)
    const removeProduct = this.props.deleteProduct

    if (!products || products.length < 1) {
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
}

const mapDispatch = (dispatch) => ({
  fetchInitialProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

const mapState = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
