import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchSingleCategory} from '../store/categories'
import {Button, Image, Grid, List, Header, Container} from 'semantic-ui-react'

class SingleCategory extends React.Component {
  componentDidMount() {
    this.props.fetchSingleCategory(this.props.match.params.categoryId)
  }
  render() {
    const category = this.props.categories.categories
    console.log('hi hi', this.props)

    if (!category || category.length < 1) {
      return (
        <div>
          <h1>No Category</h1>
        </div>
      )
    } else {
      console.log('THIS SHOULD WORK', category.style)
      return (
        <div>
          <div id="singleCategory">
            <div key={category.id}>
              <Grid centered columns={3} divided>
                <Grid.Column>
                  <Header size="large"> {category.style}</Header>
                </Grid.Column>
              </Grid>
              <Container>Description: {category.description}</Container>
              <Grid.Column>
                {category.products.map(product => {
                  return (
                    <List key={category.products.id}>
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
