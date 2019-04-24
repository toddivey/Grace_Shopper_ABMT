import React from 'react'
import {connect} from 'react-redux'
import {deleteOrder, fetchSingleOrder} from '../store/singleOrder'
import {Button, Header, Container, Card} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import {getCurrentUser} from '../store/singleUser'

class SingleOrder extends React.Component {
  componentDidMount() {
    this.props.fetchInitialOrder(this.props.match.params.orderId)
    this.props.fetchCurrentUser()
  }
  render() {
    const  order = this.props.singleOrder
    const removeOrder = this.props.deleteOrder

    if (order.id) {
      const cleanCreatedAtDate = order.createdAt.slice(0, 10)
      return <div>
          <div id="singleOrder">
            <div key={order.id}>
              <Card centered>
                <Header size="large">Products: </Header>
                <Link to={`/users/${order.user.id}`}>
                  <Header size="medium">
                    User: {order.user.firstName} {order.user.lastName}
                  </Header>
                </Link>
                <Header size="small">
                  Order Placed(YYYY-MM-DD): {cleanCreatedAtDate}
                </Header>
                <Container>
                  Shipping Status: {order.shipping_status} Tracking Number: {order.tracking_num} Total cost: ${order.total}
                </Container>
                <Button type="button" onClick={() => removeOrder(order.id)}>
                  DELETE
                </Button>
              </Card>
            </div>
          </div>
        </div>
    } else {
      return (
        <div>
          <h1>No Order</h1>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialOrder: id => dispatch(fetchSingleOrder(id)),
  deleteOrder: id => dispatch(deleteOrder(id))
})

const mapState = state => {
  return {
    singleOrder: state.singleOrder
  }
}

export default connect(mapState, mapDispatch)(SingleOrder)
