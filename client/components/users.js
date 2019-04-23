import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, fetchUsers} from '../store/users'
import {Button,Image,Grid,Card} from 'semantic-ui-react'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchInitialUsers()
  }
  render() {
    const users = Array.from(this.props.users) || []
    console.log('#########', this.props)
    const removeUser = this.props.deleteUser

    if (!users || users.length < 1) {
      return <div>
          <Link to="/users/new" centered>Add new user</Link>
          <h1>No users</h1>
        </div>
    } else {
      return <div>
          <Link to="/users/new" centered>
            Add new user
          </Link>
          <div>
            <Grid>
              <Grid.Row columns={4}>
                {users.map(user => {
                  return <Grid.Column key={user.id}>
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
  fetchInitialUsers: () => dispatch(fetchUsers()),
  deleteUser: id => dispatch(deleteUser(id))
})

const mapState = state => {
  return {
    users: state.users
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
