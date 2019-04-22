import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components/'
import AllUsers from './components/users'
import AllProducts from './components/products'
import {me} from './store'
import SingleProduct from './components/singleProduct'
import {LandingPage} from './components/landing-page'
import SingleUser from './components/singleUser'
import SingleReview from './components/singleReview'
import AllCategories from './components/allCategories'
import SingleCategory from './components/singleCategory'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products/page/:pageId" component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/users/:userId" component={SingleUser} />
        <Route path="/reviews/:reviewId" component={SingleReview} />
        <Route path="/users" component={AllUsers} />
        <Route path="/products" component={AllProducts} />
        <Route path="/categories/:categoryId" component={SingleCategory} />
        <Route path="/categories" component={AllCategories} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
