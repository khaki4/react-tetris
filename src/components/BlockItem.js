import React from "react";
import { connect } from "react-redux";


const BlockMold = (() => {
  const moldSelector = [
    [
      0, 0, 0, 0,
      0, 0, 0, 0,
      1, 1, 1, 1,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0,
      0, 1, 1, 0,
      0, 1, 1, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0,
      0, 1, 0, 0,
      1, 1, 1, 0,
      0, 0, 0, 0,
    ],
    [
      0, 0, 0, 0,
      0, 1, 1, 0,
      1, 1, 0, 0,
      0, 0, 0, 0,
    ]
  ]
  const pieceIndex = Math.round(Math.random() * moldSelector.length - 1)
  const mold = moldSelector[pieceIndex]
  return () => {
    return (
      <div className="blockmold_wrapper">
        {mold.map((sector, index) => {
          return <div key={index} className={`blockmold_unit ${sector ? 'filled' : ''}`}></div>
        })}
      </div>
    )
  }
})()


const BlockItem = ({position}) => {
  return (
    <div className="blockItem" style={position}>
      <BlockMold />
    </div>
  )
}

export default connect(

)(BlockItem)