import React from 'react'
import {List} from 'semantic-ui-react'

export default class FilteredReviews extends React.Component {

  render() {
    console.log('PROPS', this.props)
    const reviews = this.props.reviews
    return <div>
        <div>
          <p>Reviews:</p>
          {reviews.map(review => <li key={review.id}>{review.content}</li>)}
        </div>
      </div>
  }

}
