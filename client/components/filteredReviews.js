import React from 'react'
import {List} from 'semantic-ui-react'

export default class FilteredReviews extends React.Component {

  render() {
    const reviews = this.props.reviews
    return (
      <div>
        <List>
        {reviews.map(review => (
          <li key={review.id}>{review.content}</li>
        ))}
        </List>
      </div>
    )
  }

}
