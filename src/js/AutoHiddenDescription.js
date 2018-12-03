import React from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis'

const maxLine = 2;
const ellipsis = '...';

const AutoHiddenDescription = (props) => {
    return (
      <LinesEllipsis
        text= {props.description}
        maxLine={maxLine}
        ellipsis={ellipsis}
        trimRight
      />
    );
};

AutoHiddenDescription.propTypes = {
  description: PropTypes.string.isRequired,
};

export default AutoHiddenDescription;
