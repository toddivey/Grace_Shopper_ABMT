/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { withRouter } from "react-router"
import {deleteProduct, fetchProducts} from '../store/products'
import {getCurrentUser} from '../store/singleUser'
import {Button, Image, Grid, Card, Pagination} from 'semantic-ui-react'
import {getNextPage, getPreviousPage} from '../store/page'




class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchInitialProducts(this.props.match.params.pageId)
    this.props.fetchCurrentUser()
  }

  render() {

    const products = Array.from(this.props.products) || []
    const isAdmin = this.props.user.user.admin || false
    const removeProduct = this.props.deleteProduct
    const goToPrevious = this.props.goToPrevious
    const goToNext = this.props.goToNext
    const pageId = this.props.match.params.pageId || 1

    if (!products || products.length < 1) {
      return (<div>
          {isAdmin ? <Link to='/products/new' centered >Add new product</Link>: <div></div>}
          <h1>No Products Here</h1>
        </div>)
    } else {
      return <div>
          {pageId > 1 ? <Link to={`/products/page/${pageId - 1}`}>
              <Button className="large ui blue inverted button" onClick={() => {
                  goToPrevious(pageId)
                  console.log('PAGE ID BEFORE FETCH', Number(pageId) - 1)
                  this.props.fetchInitialProducts(Number(pageId) - 1)
                }}>
                Previous Page
              </Button>
            </Link> : <Button className="large ui blue inverted button" disabled>
              Previous Page
            </Button>}
          <Link to={`/products/page/${Number(pageId) + 1}`}>
            <Button className="large ui green inverted button" onClick={() => {
                goToNext(pageId)
                console.log('PAGE ID BEFORE FETCH', Number(pageId) + 1)
                this.props.fetchInitialProducts(Number(pageId) + 1)
              }}>
              Next Page
            </Button>
          </Link>
          {isAdmin ? <Link to="/products/new">
              <Button className="large ui purple inverted button">
                Add new product
              </Button>
            </Link> : <div />}
          <div> </div>
          <div>
            <Grid relaxed="very" divided="vertically" columns={4}>
              <Grid.Row>
                {products.map(product => {
                  return <Grid.Column key={product.id}>
                      <Card centered>
                        <div key={product.id}>
                          <Card.Content centered>
                            <Link to={`/products/${product.id}`}>
                              <Image src={product.imageUrl} size="small" centered />
                            </Link>
                            <Link to={`/products/${product.id}`}>
                              <Card.Header> {product.name}</Card.Header>
                            </Link>
                            <Card.Meta>
                              Brewery: {product.brewery}{' '}
                            </Card.Meta>
                            <Card.Description>
                              Price: ${product.price}
                            </Card.Description>
                          </Card.Content>
                          <Card.Content>
                            Alcohol Content: {product.ABV}%
                          </Card.Content>
                          <Card.Content>
                            Status: {product.status}
                          </Card.Content>
                          {isAdmin ? <Button className="mini ui red inverted button" onClick={() => removeProduct(product.id)}>
                              DELETE
                            </Button> : <div />}
                        </div>
                      </Card>
                    </Grid.Column>
                })}
              </Grid.Row>
            </Grid>
          </div>
        </div>
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialProducts: (pageId) => dispatch(fetchProducts(pageId)),
  deleteProduct: id => dispatch(deleteProduct(id)),
  fetchCurrentUser: () => dispatch(getCurrentUser()),
  goToPrevious: (pageId) => dispatch(getPreviousPage(pageId)),
  goToNext: (pageId) => dispatch(getNextPage(pageId))
})

const mapState = state => {
  return {
    products: state.products,
    user: state.user,
    page: state.page
  }
}

export default withRouter(connect(mapState, mapDispatch)(AllProducts))
