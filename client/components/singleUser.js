import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, fetchSingleUser} from '../store/singleUser'
import {Button, Image, Grid, Card} from 'semantic-ui-react';
import FilteredReviews from './filteredReviews'

class SingleUser extends React.Component {

  componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.userId)
  }
  render () {
    const user = this.props.user
    const removeUser = this.props.deleteUser


    if (!user.id) {
      return (
        <div>
          <h1>No Such User Exists</h1>
        </div>
      )
    }
    else {
      console.log('PROPS'.this.props)
      return (<div>
          <div>
            <Grid>
              <Card>
                <div key={user.id}>
                  <Card.Content>
                    <Image src={user.profilePicture} size="small" bordered />
                    {/* <Link to={`/userss/${user.id}`} > */}
                    <Card.Header>
                      {' '}
                      {user.firstName} {user.lastName}
                    </Card.Header>
                    <Card.Description>
                      {user.firstName}'s email is {user.email}
                    </Card.Description>
                    {/* </Link> */}
                    <Button type="button" onClick={() => removeUser(user.id)}>
                      DELETE
                    </Button>
                  </Card.Content>
                </div>
              </Card>
            </Grid>
            {/* <FilteredReviews reviews={user.reviews} /> */}
          </div>
        </div>)
    }
}
}

const mapDispatch = (dispatch) => ({
  fetchInitialUser: (id) => dispatch(fetchSingleUser(id)),
  deleteUser: (id) => dispatch(deleteUser(id))
})

const mapState = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
