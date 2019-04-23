import React from 'react'
import {Link} from 'react-router-dom'

export default class FilteredOrders extends React.Component {
  render() {
    const orders = this.props.orders
    if (orders) {
      return <div>
          <div>
            <p>Orders:</p>
            {orders.map(order => <div key={order.id}>
                <div>
                  <Link to={`/orders/${order.id}`}>
                    <div>ORDER NUMBER: {order.id}</div>
                  </Link>
                  <div>tracking number: {order.tracking_num}</div>
                  <div>total: ${order.total}</div>
                  <div>Order placed: {order.created_at}</div>
                  <div>Order status: {order.shipping_status}</div>
                </div>
              </div>)}
          </div>
        </div>
    } else {
      return <div>No Orders</div>
    }
  }
}
