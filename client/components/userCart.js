import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchActiveCart,
  productToCart,
  updateCartQuantity,
  deleteProdFromCart
} from '../store/singleProduct'
import {Button, Image, Grid, List, Header, Container} from 'semantic-ui-react'
import products from '../store/products'

class UserCart extends React.Component {
  componentDidMount() {
    this.props.fetchActiveCart()
  }
  render() {
    console.log('PROPS', this.props)
    const product = this.props.product.product
    const cart = this.props.product.cart
    console.log('THIS IS THE CART', cart)
    const removeProduct = this.props.deleteProduct
    const addToCart = this.props.productToCart
    const updateCartQuantity = this.props.updateCartQuantity
    const deleteProdFromCart = this.props.deleteProdFromCart

    if (!cart || !cart.products) {
      return (
        <div>
          <h1>No Items in Cart</h1>
        </div>
      )
    } else {
      console.log(cart.products)
      return (
        <div>
          <div id="UserCart">
            <div key={cart.id}>
              <Grid.Column>
                {cart.products.map(product => {
                  return (
                    <List key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <List.Item>{product.name}</List.Item>
                      </Link>
                      <List.Item>Price: {product.price}</List.Item>
                      <List.Item>
                        <div className="ui buttons">
                          <Button
                            class="positive small ui button"
                            onClick={() =>
                              updateCartQuantity(
                                product.id,
                                cart.id,
                                document.getElementById(`${product.id}`).value,
                                product.price
                              )
                            }
                          >
                            Update Quantity:{' '}
                          </Button>
                          <div className="or" />
                          <Button
                            class="negative small ui button"
                            onClick={() =>
                              deleteProdFromCart(product.id, cart.id)
                            }
                          >
                            Remove
                          </Button>
                        </div>
                        <div className="ui small form">
                          <input
                            type="number"
                            id={product.id}
                            placeholder={product.cartProducts.quantity}
                            min={1}
                            max={product.inventory}
                          />
                        </div>
                      </List.Item>
                    </List>
                  )
                })}
              </Grid.Column>
              <div>
                <Header>
                  Total Price:{' '}
                  {cart.products.reduce(
                    (accumulator, currentProduct) =>
                      accumulator +
                      currentProduct.price *
                        Number(currentProduct.cartProducts.quantity),
                    0
                  )}{' '}
                </Header>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialProduct: id => dispatch(fetchSingleProduct(id)),
  fetchActiveCart: id => dispatch(fetchActiveCart(id)),
  productToCart: (id, cartId) => dispatch(productToCart(id, cartId)),
  updateCartQuantity: (productId, cartId, quantity, price) =>
    dispatch(updateCartQuantity(productId, cartId, quantity, price)),
  deleteProdFromCart: (productId, cartId) =>
    dispatch(deleteProdFromCart(productId, cartId))
})

const mapState = state => {
  return {
    product: state.product
  }
}

export default connect(mapState, mapDispatch)(UserCart)
