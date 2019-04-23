import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  deleteProduct,
  fetchSingleProduct,
  fetchActiveCart,
  productToCart
} from '../store/singleProduct'
import {getCurrentUser} from '../store/singleUser'
import {Button, Image, Grid, List, Header, Container} from 'semantic-ui-react';
import FilteredReviews from './filteredReviews'

class SingleProduct extends React.Component {

  componentDidMount() {
    this.props.fetchInitialProduct(this.props.match.params.productId)
    this.props.fetchActiveCart()
    this.props.fetchCurrentUser()
  }
  render () {
    const product = this.props.product.product
    const removeProduct = this.props.deleteProduct
    const addToCart = this.props.productToCart
    const isAdmin = this.props.user.user.admin || false

    if (!product) {
      return (
        <div>
          <h1>No Products</h1>
        </div>
      )
    }
    else {
      return <div>
          <div id="singleProduct">
            <div key={product.id}>
              <Grid centered columns={3} divided>
                <Grid.Column>
                  <Image src={product.imageUrl} size="small" bordered />
                  <Header size="large"> {product.name}</Header>
                  <Header size="medium">Brewery:</Header>
                  <Header size="small">{product.brewery}</Header>
                </Grid.Column>
              </Grid>
              <Container>Description: {product.description}</Container>
              <Grid.Column>
                <List>
                  <List.Item>Price: ${product.price}</List.Item>
                  <List.Item>ABV: {product.ABV}%</List.Item>
                  <List.Item>Inventory: {product.inventory}</List.Item>
                </List>
              </Grid.Column>
              <Grid centered columns={2} divided>
                <Grid.Column>
                  <Button type="button" onClick={() => addToCart(product.id, this.props.product.cart.id)}>
                    Add to Cart!
                  </Button>
                  {isAdmin ? <div><Button type="button" onClick={() => removeProduct(product.id)}>
                    DELETE
                  </Button>
                  <Link to={`/products/${product.id}/update`}>
                    UPDATE
                  </Link> </div>: <div></div>}
                </Grid.Column>
              </Grid>
              <Grid centered columns={1} />
              <div>
                <FilteredReviews reviews={product.reviews} />
              </div>
            </div>
          </div>
        </div>
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialProduct: id => dispatch(fetchSingleProduct(id)),
  deleteProduct: id => dispatch(deleteProduct(id)),
  fetchActiveCart: id => dispatch(fetchActiveCart(id)),
  productToCart: (id, cartId) => dispatch(productToCart(id, cartId)),
  fetchCurrentUser: () => dispatch(getCurrentUser())
})

const mapState = (state) => {
  return {
    product: state.product,
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
