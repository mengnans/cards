import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'

const ellipsis = '...';

const Line = (props) => {
    return (
      <LinesEllipsis
        text= {props.description}
        maxLine={props.maxLine}
        ellipsis={ellipsis}
        trimRight
        basedOn="words"
      />
    );
};

Line.propTypes = {
  description: PropTypes.string.isRequired,
  maxLine: PropTypes.number.isRequired,
};

export default Line;
