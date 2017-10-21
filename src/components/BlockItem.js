import React from "react";
import { connect } from "react-redux";

const BlockItem = ({position}) => {
  return (
    <div className="blockItem" style={position}>
      item
    </div>
  )
}

export default connect(

)(BlockItem)