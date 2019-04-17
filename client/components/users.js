import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteUser, fetchUsers} from '../store/users'

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.fetchInitialUsers()
  }
  render() {
    const users = Array.from(this.props.users) || []
    console.log('#########', this.props)
    const removeUser = this.props.deleteUser

    if (!users || users.length < 1) {
      return (
        <div>
          <h1>No users</h1>
        </div>
      )
    } else {
      return (
        <div>
          <div>
            {users.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/users/${user.id}`}>
                    <p>
                      {' '}
                      {user.firstName} {user.lastName}
                    </p>
                    <p>{user.email} </p>
                  </Link>
                  <button type="button" onClick={() => removeUser(user.id)}>
                    DELETE
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      )
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
