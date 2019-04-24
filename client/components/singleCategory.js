import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleCategory, defaultCategories} from '../store/categories'
import {Button, Image, Grid, List, Header, Container, Card} from 'semantic-ui-react'
import axios from 'axios'

class SingleCategory extends React.Component {
  constructor() {
    super()
    this.state = defaultCategories.singleCategory
  }
  async componentDidMount() {
    try {
      const categoryId = this.props.match.params.categoryId
      const singleCategoryResponse = await axios.get(
        `/api/categories/${categoryId}`
      )
      this.setState({singleCategory: singleCategoryResponse.data})
    } catch (error) {
      console.error(error)

      //  }    this.props.fetchSingleCategory(this.props.match.params.categoryId)
    }
  }
  render() {
    if (!this.state.singleCategory) {
      return (
        <div>
          <h1>No Category</h1>
        </div>
      )
    } else {
      const {id, style, description, products} = this.state.singleCategory
      return (
      <div>
      <div>

                  <Header size="large" textAlign='center'> {style}</Header>
              <Container textAlign='center'> {description}</Container>
        <Grid relaxed="very" divided="vertically" columns={4}>
          <Grid.Row>
            {products.map(product => {
              return <Grid.Column key={product.id}>
                  <Card centered>
                    <div key={product.id}>
                      <Card.Content centered>

                      <Link to={`/products/${product.id}`}>
                        <Image
                          src={product.imageUrl}
                          size="tiny"
                          centered
                        />
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
                    </div>
                  </Card>
                </Grid.Column>
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
  fetchSingleCategory: id => dispatch(fetchSingleCategory(id))
})

const mapState = state => {
  return {
    categories: state.categories.categories
  }
}

export default connect(mapState, mapDispatch)(SingleCategory)
