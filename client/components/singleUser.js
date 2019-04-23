import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, fetchSingleUser, fetchActiveCart, fetchOrders} from '../store/singleUser'
import {Button, Image, Grid, Card} from 'semantic-ui-react';
import FilteredReviews from './filteredReviews'
import FilteredOrders from './filteredOrders'

class SingleUser extends React.Component {

  componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.userId)
    this.props.fetchActiveCart(this.props.match.params.userId)
    this.props.fetchUserOrders(this.props.match.params.userId)
  }
  render () {
    const user = this.props.user.user
    const removeUser = this.props.deleteUser


    if (!user) {
      return (
        <div>
          <h1>No Such User Exists</h1>
        </div>
      )
    }
    else {
      return (<div>
          <div>
            <Grid>
              <Card centered>
                <div key={user.id}>
                  <Card.Content>
                    <Image src={user.profilePicture} size="small" bordered />
                    <Card.Header>
                      {user.firstName} {user.lastName}
                    </Card.Header>
                    <Card.Description>
                      {user.firstName}'s email is {user.email}
                    </Card.Description>
                    <Button type="button" onClick={() => removeUser(user.id)}>
                      DELETE
                    </Button>
                  </Card.Content>
                </div>
              </Card>
            </Grid>
            <FilteredReviews reviews={user.reviews} />
            <FilteredOrders orders={user.orders} />
          </div>
        </div>)
    }
}
}

const mapDispatch = (dispatch) => ({
  fetchInitialUser: (id) => dispatch(fetchSingleUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id)),
  fetchActiveCart: (id) => dispatch(fetchActiveCart(id)),
  fetchUserOrders: (id) => dispatch(fetchOrders(id))
})

const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
