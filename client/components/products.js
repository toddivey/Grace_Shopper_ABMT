import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchProducts} from '../store/products'
import {Button, Image, Grid, Card} from 'semantic-ui-react'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchInitialProducts()
  }
  render() {
    const products = Array.from(this.props.products) || []
    console.log('#########', this.props)

    const removeProduct = this.props.deleteProduct
    if (!products || products.length < 1) {
      return (
        <div>
          <h1>No Products</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <Grid relaxed="very" divided="vertically" columns={4}>
              <Grid.Row>
                {products.map(product => {
                  return (
                    <Grid.Column key={product.id}>
                      <Card centered>
                        <Image src={product.imageUrl} />
                        <div key={product.id}>
                          <Card.Content textAlign="center">
                            {/* <Link to={`/products/${product.id}`} > */}
                            <Card.Header as="h3"> {product.name}</Card.Header>
                            {/* </Link> */}
                            <Button
                              negative="true"
                              size="small"
                              onClick={() => removeProduct(product.id)}
                            >
                              DELETE
                            </Button>
                          </Card.Content>
                        </div>
                      </Card>
                    </Grid.Column>
                  )
                })}
              </Grid.Row>
            <Grid>
              <Grid.Row columns = {4}>
            {products.map (product => {
              return (
                <Grid.Column key = {product.id}>
                  <Card>
                <div key={product.id}>
                    <Card.Content>
                    <Image src={product.imageUrl} size = 'small' />
                  <Link to={`/products/${product.id}`}>
                    <Card.Header> {product.name}</Card.Header>
                  </Link>
                    <Card.Meta>Brewery: {product.brewery} </Card.Meta>
                    <Card.Description>Price: ${product.price}</Card.Description>

                    </Card.Content>
                    <Card.Content>
                    <p>
                      Alcohol Content: {product.ABV}%
                      Status: {product.status}
                    </p>
                    </Card.Content>
                    <Button className='mini ui red inverted button' onClick={() => removeProduct(product.id)}>DELETE</Button>
                </div>
                </Card>
                </Grid.Column>
              )
            })}
            </Grid.Row>
            </Grid>
          </div>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

const mapState = state => {
  return {
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
