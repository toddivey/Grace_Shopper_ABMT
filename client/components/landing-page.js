import PropTypes from 'prop-types'
import React, {Component} from 'react'
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
      <Navbar />
      <AllProducts />
    </Container>
  </div>
)
