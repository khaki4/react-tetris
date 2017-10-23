import React from "react";
import { connect } from "react-redux";
import { setMoldShape } from '../reducers/playReducer';

const BlockMold = ({ moldShape }) => {
  return (
    <div className="blockmold_wrapper">
      {moldShape.map((rows, i) => {
        return rows.map((sector, j) => {
          return <div key={i + j} className={`blockmold_unit ${sector ? 'filled' : ''}`}></div>
        })
      })}
    </div>
  )
}


const BlockItem = ({position, moldShape}) => {
  return (
    <div className="blockItem" style={position}>
      <BlockMold moldShape={moldShape} />
    </div>
  )
}

export default connect(
  (state, ownProps) => ({
    moldShape: state.play.moldShape,
    position: ownProps.position
  })
)(BlockItem)