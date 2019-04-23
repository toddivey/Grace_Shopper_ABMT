import UserForm from './UserForm'
import React from 'react'
import {connect} from 'react-redux'
import {addUser} from '../store/singleUser'

const defaultState = {
  firstName: '',
  lastName: '',
  id: '',
  email: '',
  admin: '',
  address: '',
  profilePicture: '',
  warningMessage: '',
  initialized: false,
  errorMessage: ''
}

class CreateUser extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const newUser = {firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, admin: this.state.admin, address: this.state.address, profilePicture: this.state.profilePicture}
      await this.props.addUser(newUser)
      this.setState({
        firstName: '',
        lastName: '',
        id: '',
        email: '',
        admin: '',
        address: '',
        profilePicture: '',
        addedMessage: `User Created!`
      })
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem creating the user: ${err.message}`
      })
    }
  }

  render() {
    return (
      <div>
        <div>Create New User: </div>
        <UserForm
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: user => dispatch(addUser(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser)
