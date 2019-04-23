import React from 'react'
import UserForm from './UserForm'
import {connect} from 'react-redux'
import {updateUser, fetchSingleUser} from '../store/singleUser'
import axios from 'axios'

class UpdateUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.props.fetchInitialUser(this.props.match.params.userId)
    const {data} = await axios.get(
      `/api/users/${this.props.match.params.userId}`
    )
    this.setState({
      firstName: data.firstName,
      lastName: data.lastName,
      id: data.id,
      email: data.email,
      admin: data.admin,
      address: data.address,
      profilePicture: data.profilePicture,
      warningMessage: 'Field is Required!'
    })
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault()
    try {
      const updatedUser = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        id: this.state.id,
        email: this.state.email,
        admin: this.state.admin,
        address: this.state.address,
        profilePicture: this.state.profilePicture
      }
      await this.props.updateUser(updatedUser)
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem updating the user: ${err}`
      })
    }
  }

  render() {
    console.log('THIS PROPS', this.props)
    const user = this.props.user.user

    if (user && user.id) {
      return (
        <div>
          <div>Update User:</div>
          <UserForm
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
          />
        </div>
      )
    } else {
      return <div>Loading Data: Please have patience</div>
    }
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialUser: id => dispatch(fetchSingleUser(id)),
    updateUser: updatedUser => dispatch(updateUser(updatedUser))
  }
}

export default connect(mapState, mapDispatch)(UpdateUser)
