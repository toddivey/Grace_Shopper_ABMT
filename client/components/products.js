import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchProducts} from '../store/products'
import {Button, Image, Grid, Card, Pagination} from 'semantic-ui-react'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchInitialProducts(this.props.match.params.pageId)
  }
  render() {
    const products = Array.from(this.props.products) || []
    console.log(products)
    const removeProduct = this.props.deleteProduct
    if (!products || products.length < 1) {
      return (
        <div>
          <h1>No Products Here</h1>
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
                        <div key={product.id}>
                        <Card.Content centered>
                    <Image src={product.imageUrl} size = 'small' centered/>
                  <Link to={`/products/${product.id}`}>
                    <Card.Header> {product.name}</Card.Header>

                  </Link>
                    <Card.Meta>Brewery: {product.brewery} </Card.Meta>
                    <Card.Description>Price: ${product.price}</Card.Description>

                    </Card.Content>
                    <Card.Content>Alcohol Content: {product.ABV}%</Card.Content>
                    <Card.Content>Status: {product.status}</Card.Content>
                    <Button className='mini ui red inverted button' onClick={() => removeProduct(product.id)}>DELETE</Button>
                        </div>
                      </Card>
                    </Grid.Column>
                  )
                })}
              </Grid.Row>
            </Grid>
          </div>
          {/* NOTE: we need to figure out totalPAges eventually  */}
          <Pagination defaultActivePage={1} totalPages={5} />
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialProducts: (pageId) => dispatch(fetchProducts(pageId)),
  deleteProduct: id => dispatch(deleteProduct(id))
})

const mapState = state => {
  return {
    products: state.products
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
