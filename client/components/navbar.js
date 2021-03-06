import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import {logout} from '../store'
import {Header, Icon, Menu, Container, Image} from 'semantic-ui-react'
import {me} from '../store/user'

const Navbar = ({handleClick, isLoggedIn, user}) => {

return (
  <nav>
  <div>
    <Header as="h1">
      <Icon name="beer" />
      <Header.Content>grace HOPper</Header.Content>
    </Header>
    <Image src="/IMG_7359.png" fluid />
    <Menu secondary size="medium">

        {isLoggedIn ? (

          <Container text>
          <Link to="/">
            <Menu.Item as="a">
              {/* The navbar will show these links after you log in */}
              Home
            </Menu.Item>
           </Link>
            <Link to="/categories">
            <Menu.Item as="a">Categories</Menu.Item>

          </Link>
          <Link to="/" onClick={handleClick} >
            <Menu.Item as="a">
              Logout
            </Menu.Item>
          </Link>
          <Link to ="/cart">
            <Menu.Item as="a">
              Cart
            </Menu.Item>
          </Link>
          </Container>

        ) : (
          <Container text>
            {/* The navbar will show these links before you log in */}
            <Link to="/">
            <Menu.Item as="a">
              Home
            </Menu.Item>
            </Link>
            <Link to="/categories">
            <Menu.Item as="a">Categories</Menu.Item>
            </Link>
            <Link to="/login">
            <Menu.Item as="a">
              Login
            </Menu.Item>
            </Link>
            <Link to="/signup">
            <Menu.Item as="a">
              Sign Up
            </Menu.Item>
            </Link>
            <Link to ="/cart">
            <Menu.Item as="a">
            Cart
            </Menu.Item>
            </Link>
          </Container>
        )}
    </Menu>
    <hr />
  </div>
  </nav>
)}


/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.loginUser,
    isLoggedIn: !!state.loginUser.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    },
    getCurrentUser: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
