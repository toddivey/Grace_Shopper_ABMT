import React from 'react';
import { connect } from 'react-redux'
import { deleteReview, fetchSingleReview } from '../store/singleReview'
import { Button, Grid, Header, Container, Card } from 'semantic-ui-react';


class SingleReview extends React.Component {

  componentDidMount() {
    this.props.fetchInitialReview(this.props.match.params.reviewId)
  }
  render() {
    const review = this.props.review
    const removeReview = this.props.deleteReview
    console.log("Props", this.props)

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
                  Review written(YYYY-MM-DD): {cleanCreatedAtDate}
                </Header>
                <Container>Content: {review.content}</Container>
                <Button type="button" onClick={() => removeReview(review.id)}>
                  DELETE
                </Button>
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

const mapDispatch = (dispatch) => ({
  fetchInitialReview: (id) => dispatch(fetchSingleReview(id)),
  deleteReview: (id) => dispatch(deleteReview(id))
})

const mapState = (state) => {
  return {
    review: state.review
  }
}

export default connect(mapState, mapDispatch)(SingleReview)
