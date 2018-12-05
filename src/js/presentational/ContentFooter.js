/* eslint-disable no-unused-vars */
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import "../../styles/ContentFooter.css";
import PropTypes from "prop-types";

function ContentFooter(props) {

  let {totalPage, currentPage, onClickBack, onClickNext} = props;
  let backButtonDisabled, nextButtonDisabled = false;

  // if it's the first page, disable the back button
  if (currentPage === 1) {
    backButtonDisabled = true;
  }
  // if it's the last page, disable the next button
  if ((totalPage === "?") || (currentPage.toString() === totalPage)) {
    nextButtonDisabled = true;
  }
  return (
    <Grid item xs={12}>
      <Grid container justify="center" className="Content-footer" spacing={16}>
        <Button disabled={backButtonDisabled} onClick={onClickBack}>Back</Button>
        <div className="Page-info">
          {currentPage}
          /
          {totalPage}
        </div>
        <Button disabled={nextButtonDisabled} onClick={onClickNext}>Next</Button>
      </Grid>
    </Grid>
  );
}

ContentFooter.propTypes = {
  totalPage: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default ContentFooter;