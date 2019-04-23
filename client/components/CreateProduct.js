import ProductForm from './ProductForm'
import React from 'react'
import {connect} from 'react-redux'
import {addProduct} from '../store/singleProduct'

const defaultState = {
  name: '',
  price: '',
  id: '',
  status: '',
  description: '',
  imageUrl: '',
  inventory: '',
  ABV: '',
  brewery: '',
  warningMessage: '',
  initialized: false,
  errorMessage: ''
}


class CreateProduct extends React.Component {
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
      const newProduct = {name: this.state.name, price: this.state.price, status: this.state.status, description: this.state.description, imageUrl: this.state.imageUrl, inventory: this.state.inventory, ABV: this.state.ABV, brewery: this.state.brewery}
      await this.props.addProduct(newProduct)
      this.setState({
        name: '',
        price: '',
        id: '',
        status: '',
        description: '',
        imageUrl: '',
        inventory: '',
        ABV: '',
        brewery: '',
        addedMessage: `Product Created: ${this.state.name}`
      })
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem creating the product: ${err.message}`
      })
    }
  }

  render() {
    return (
      <div>
        <div>Create New Product: </div>
        <ProductForm
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
    product: state.product
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateProduct)
