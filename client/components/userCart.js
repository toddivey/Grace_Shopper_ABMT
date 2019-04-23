import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  fetchActiveCart,
  productToCart
} from '../store/singleProduct'
import {Button, Image, Grid, List, Header, Container} from 'semantic-ui-react';
import products from '../store/products';

class UserCart extends React.Component {

  componentDidMount() {
    this.props.fetchActiveCart()
  }
  render () {
    console.log("PROPS", this.props)
    const product = this.props.product.product
    const cart = this.props.product.cart
    console.log('THIS IS THE CART',cart)
    const removeProduct = this.props.deleteProduct
    const addToCart = this.props.productToCart

    if (!cart || cart.length < 1) {
      return (
        <div>
          <h1>No Items in Cart</h1>
        </div>
      )
    }
    else {
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
                        <List.Item>
                        <div class="ui buttons">
                        <Button class ="negative small ui button">Remove</Button>
                        <div class="or"></div>
                       <Button class="positive small ui button" onClick={() => console.log(document.getElementById(`${product.id}`).value)}> Update Quantity: </Button>
                       </div>
                       <div class="ui small form">
                        <input type="number" id={product.id} placeholder={product.cartProducts.quantity} min={1} max={product.inventory}/>
                        </div>
                      </List.Item>
                    </List>
                  )
                })}
              </Grid.Column>
              <div>
                <Header>Total Price: {cart.products.reduce((accumulator, currentProduct) => accumulator + currentProduct.price, 0)} </Header>
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
  productToCart: (id, cartId) => dispatch(productToCart(id, cartId))
})

const mapState = (state) => {
  return {
    product: state.product
  }
}

export default connect(mapState, mapDispatch)(UserCart)
