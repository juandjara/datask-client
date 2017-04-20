import { connect } from 'react-redux'

const ShowOnMedia = ({responsive, mediaKey, children}) => {
  const queryState = responsive[mediaKey]
  return queryState ? children : null
}

const mapStateToProps = (state, ownProps) => {
  return {
    responsive: state.responsive
  }
}

export default connect(mapStateToProps)(ShowOnMedia)
