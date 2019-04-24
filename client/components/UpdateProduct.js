import React from 'react'
import ProductForm from './ProductForm'
import {connect} from 'react-redux'
import {updateProduct, fetchSingleProduct} from '../store/singleProduct'
import {Link} from 'react-router-dom'
import axios from 'axios'

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    this.props.fetchInitialProduct(this.props.match.params.productId)
    const {data} = await axios.get(
      `/api/products/${this.props.match.params.productId}`
    )
    this.setState({
      name: data.name,
      price: data.price,
      id: data.id,
      status: data.status,
      description: data.description,
      imageUrl: data.imageUrl,
      inventory: data.inventory,
      ABV: data.ABV,
      brewery: data.brewery,
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
      const updatedProduct = {
        name: this.state.name,
        price: this.state.price,
        id: this.state.id,
        status: this.state.status,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
        inventory: this.state.inventory,
        ABV: this.state.ABV,
        brewery: this.state.brewery
      }
      await this.props.updateProduct(updatedProduct)
    } catch (err) {
      this.setState({
        errorMessage: `There was a problem updating the product: ${err}`
      })
    }
  }

  render() {
    const product = this.props.product.product

    if (product && product.id) {
      return (
        <div>
          <img src={product.imageUrl} alt="image"/>
          <div>Update Product:</div>
          <ProductForm
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
    product: state.product
  }
}

const mapDispatch = dispatch => {
  return {
    fetchInitialProduct: id => dispatch(fetchSingleProduct(id)),
    updateProduct: updatedProduct => dispatch(updateProduct(updatedProduct))
  }
}

export default connect(mapState, mapDispatch)(UpdateProduct)
