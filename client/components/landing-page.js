import PropTypes from 'prop-types'
import React, {Component} from 'react'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import store from '../store'
import {Link} from 'react-router-dom'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from 'semantic-ui-react'

import {connect} from 'react-redux'
import AllProducts from './products'
import Navbar from './navbar'

export const LandingPage = () => (
  <div>
    <Container style={{marginTop: '3em'}}>
    <Header as="h1">
      <Link to="/products">See All Products</Link>
    </Header>  
    </Container>
  </div>
)
