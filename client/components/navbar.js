import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Header, Icon, Menu, Container} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <Header as="h1">
      <Icon name="beer" />
      <Header.Content>grace HOPper</Header.Content>
    </Header>
    <Menu secondary size="medium">
      <nav>
        {isLoggedIn ? (
          <Container text>
            <Menu.Item as="a">
              {/* The navbar will show these links after you log in */}
              <Link to="/home">Home</Link>
            </Menu.Item>
              <a href="#" onClick={handleClick}>
                Logout
              </a>
          </Container>
        ) : (
          <Container text>
            {/* The navbar will show these links before you log in */}
            <Link to="/">
            <Menu.Item as="a">
              Home
            </Menu.Item>
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
            <Link to="/cart">
            <Menu.Item as="a">CART GOES HERE</Menu.Item>
            </Link>
          </Container>
        )}
      </nav>
    </Menu>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
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
