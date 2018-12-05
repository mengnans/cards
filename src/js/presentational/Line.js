/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import LinesEllipsis from "react-lines-ellipsis";

const ellipsis = "...";

function Line(props) {
  let {text, maxLine} = props;

  return (
    <LinesEllipsis
      text={text}
      maxLine={maxLine}
      ellipsis={ellipsis}
      trimRight
      basedOn="words"
    />
  );
}

Line.propTypes = {
  text: PropTypes.string.isRequired,
  maxLine: PropTypes.number.isRequired,
};

export default Line;
