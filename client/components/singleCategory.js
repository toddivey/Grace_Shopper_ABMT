import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleCategory, defaultCategories} from '../store/categories'
import {Button, Image, Grid, List, Header, Container} from 'semantic-ui-react'
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
      console.log('THIS SHOULD WORK', style)
      return (
        <div>
          <div id="singleCategory">
            <div key={id}>
              <Grid centered columns={3} divided>
                <Grid.Column>
                  <Header size="large"> {style}</Header>
                </Grid.Column>
              </Grid>
              <Container>Description: {description}</Container>
              <Grid.Column>
                {products.map(product => {
                  return (
                    <List key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <List.Item>{product.name}</List.Item>
                      </Link>
                    </List>
                  )
                })}
              </Grid.Column>
            </div>
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
