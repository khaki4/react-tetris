import React from "react";
import { connect } from "react-redux";
import BlockItem from "./BlockItem";
import { moveTick } from '../reducers/playReducer'

const BlockItemManager = (props) => {
  const LIMIT_TOP = 400
  const MOVE_TICK = setTimeout(() => {
    props.moveTick()
  }, 300)
  if (props.position.top > LIMIT_TOP) {
    clearTimeout(MOVE_TICK)
  }
  return (
    <div>
      <BlockItem
        position={props.position}
      />
    </div>
  )
}

export default connect(
  (state) => ({
    position: state.play.position
  }),
  { moveTick }
)(BlockItemManager)