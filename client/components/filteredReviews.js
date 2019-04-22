import React from 'react'
import {List} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export default class FilteredReviews extends React.Component {

  render() {
    console.log('PROPS Filtered Reviews', this.props)
    const reviews = this.props.reviews
    if (reviews) {
      return (<div>
          <div>
            <p>Reviews:</p>
            {reviews.map(review =>
            <div key={review.id}>
              <Link to={`/reviews/${review.id}`}>
                <li>{review.content}</li>
              </Link>
            </div>
            )}
          </div>
        </div>)

    } else {
      return (
        <div>No Reviews</div>
      )
    }
  }

}
