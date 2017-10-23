import React, { PureComponent } from "react";
import { connect } from "react-redux";
import BlockItemManager from "./BlockItemManager";
import { getTransformedMoldShape, setMoldShape } from '../reducers/playReducer'

class PlayGround extends PureComponent {
  componentDidMount() {
    document.addEventListener('keyup', this.handleKeyUp)
  }
  componentWillUnmount() {
    document.removeEventListener('keyup', this.handleKeyUp)
  }
  handleKeyUp = (e) => {
    switch (e.key) {
      case 'w':
        this.props.setMoldShape(getTransformedMoldShape(this.props.moldShape))
        break
      default:
        return
    }
  }
  render() {
    return (
      <div className="playGround_wrapper">
        <BlockItemManager />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    moldShape: state.play.moldShape,
  }),
  { setMoldShape }
)(PlayGround)