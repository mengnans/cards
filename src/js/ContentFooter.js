import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button/Button";
import React from "react";
import "../styles/ContentFooter.css"

class ContentFooter extends React.Component {

  render() {
    const spacing = 16;
    return (
      <Grid item xs={12}>
        <Grid container justify="center" className="Content-footer" spacing={Number(spacing)}>
          <Button>Back</Button>

          <div className="Page-info">1/1414</div>

          <Button>Next</Button>
        </Grid>
      </Grid>
    )
  }
}

export default ContentFooter;