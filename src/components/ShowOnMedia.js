import { connect } from 'react-redux'

const ShowOnMedia = ({responsive, queryKey, children}) => {
  const queryState = responsive[queryKey]
  return queryState ? children : null
}

const mapStateToProps = (state, ownProps) => {
  return {
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(ShowOnMedia) 