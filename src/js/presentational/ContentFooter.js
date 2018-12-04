import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import "../../styles/ContentFooter.css"
import PropTypes from "prop-types";

class ContentFooter extends React.Component {

  render() {
    const spacing = 16;
    let backButtonDisabled, nextButtonDisabled = false;
    if (this.props.currentPage === 1) {
      backButtonDisabled = true;
    }
    if((this.props.totalPage === "?") || (this.props.currentPage.toString() === this.props.totalPage)){
      nextButtonDisabled = true;
    }
    return (
      <Grid item xs={12}>
        <Grid container justify="center" className="Content-footer" spacing={Number(spacing)}>
          <Button disabled={backButtonDisabled} onClick={this.props.onClickBack}>Back</Button>

          <div className="Page-info">
            {this.props.currentPage}
            /
            {this.props.totalPage}
          </div>

          <Button disabled={nextButtonDisabled} onClick={this.props.onClickNext}>Next</Button>
        </Grid>
      </Grid>
    )
  }
}

ContentFooter.propTypes = {
  totalPage: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  onClickBack: PropTypes.func.isRequired,
  onClickNext: PropTypes.func.isRequired,
};

export default ContentFooter;