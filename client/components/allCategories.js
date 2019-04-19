import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchCategories} from '../store/categories'
import {Button, Image, Grid, Card} from 'semantic-ui-react'

class AllCategories extends React.Component {
  componentDidMount() {
    this.props.fetchInitialCategories()
  }
  render() {
    const categories = Array.from(this.props.categories) || []
    console.log('#########', this.props)

    if (!categories || categories.length < 1) {
      return (
        <div>
          <h1>No Categories</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <Grid relaxed="very" divided="vertically" columns={4}>
              <Grid.Row>
                {categories.map(category => {
                  return (
                    <Grid.Column key={category.id}>
                      <Card centered>
                        <Card.Content textAlign="center">
                          <Link to={`/categories/${category.id}`}>
                            <Card.Header as="h3"> {category.name}</Card.Header>
                          </Link>
                        </Card.Content>
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
  fetchInitialCategories: () => dispatch(fetchCategories())
})

const mapState = state => {
  return {
    categories: state.categories
  }
}

export default connect(mapState, mapDispatch)(AllCategories)
