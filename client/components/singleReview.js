import React from 'react';
import { connect } from 'react-redux'
import { deleteReview, fetchSingleReview } from '../store/singleReview'
import { Button, Grid, Header, Container, Card } from 'semantic-ui-react';
import {getCurrentUser} from '../store/singleUser'


class SingleReview extends React.Component {

  componentDidMount() {
    this.props.fetchInitialReview(this.props.match.params.reviewId)
    this.props.fetchCurrentUser()
  }
  render() {
    const review = this.props.review
    const removeReview = this.props.deleteReview
    const isAdmin = this.props.user.user.admin || false

    if (review.id) {
      const cleanCreatedAtDate = review.createdAt.slice(0,10)
      return <div>
          <div id="singleReview">
            <div key={review.id}>
              <Card  centered>
                <Header size="large">
                  Product: {review.product.name}
                </Header>
                <Header size="medium">
                  Reviewer: {review.user.firstName} {review.user.lastName}
                </Header>
                <Header size="small">
                  Review written: {cleanCreatedAtDate}
                </Header>
                <Container>Content: {review.content}</Container>
                {isAdmin ? <Button type="button" onClick={() => removeReview(review.id)}>
                  DELETE
                </Button>: <div></div>}
              </Card>
            </div>
          </div>
        </div>
    }
    else {
      return (
        <div>
          <h1>No Review</h1>
        </div>
      )
    }
  }
}

const mapDispatch = dispatch => ({
  fetchInitialReview: id => dispatch(fetchSingleReview(id)),
  fetchCurrentUser: () => dispatch(getCurrentUser()),
  deleteReview: id => dispatch(deleteReview(id))
})

const mapState = (state) => {
  return {
    review: state.review,
    user: state.user
  }
}

export default connect(mapState, mapDispatch)(SingleReview)
