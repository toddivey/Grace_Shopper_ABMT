import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {deleteProduct, fetchAProduct} from '../store/singleProduct'
import {Button, Image, Grid, Card} from 'semantic-ui-react';

class SingleProduct extends React.Component {

  componentDidMount() {
    this.props.fetchInitialProduct(this.props.match.params.productId)
  }
  render () {
    const product = this.props.product[0]
    console.log("#########", this.props)
    const removeProduct = this.props.deleteProduct

    if (!product || product.length < 1) {
      return (
        <div>
          <h1>No Products</h1>
        </div>
      )
    }
    else {
      return (
        <div>
          <div>
            <Grid>
                <Card>
                <div key={product.id}>
                    <Card.Content>
                    <Image src={product.imageUrl} size = 'small' bordered />
                    <Card.Header> {product.name}</Card.Header>
                  {/* </Link> */}
                  <Button type='button' onClick={() => removeProduct(product.id)}>DELETE</Button>
                    </Card.Content>
                </div>
                </Card>
            </Grid>
          </div>
        </div>
      )
    }
}
}

const mapDispatch = (dispatch) => ({
  fetchInitialProduct: (id) => dispatch(fetchAProduct(id)),
  deleteProduct: (id) => dispatch(deleteProduct(id))
})

const mapState = (state) => {
  return {
    product: state.product
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
