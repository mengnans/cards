/* eslint-disable no-unused-vars */
import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../../styles/Card.css";
import Line from "./Line";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


function CardItem(props) {

  let {coreData, noData, isLoading, onClick, progressBarColor, loadingInfo} = props;
  let children;

  if (noData) {
    children =
      <div className="Card-loading-div">
        <div className="Card-loading-info">
          No data
        </div>
      </div>;
  } else {

    children = isLoading ?
      <div className="Card-loading-div">
        <div className="Card-loading-info">
          {loadingInfo}
        </div>
        <CircularProgress className="Card-loading-progress" color={progressBarColor} size={80}/>
      </div>
      :
      <div>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            New
          </Typography>
          <Typography variant="h5" component="h2">
            <Line text={coreData.number} maxLine={1}/>
          </Typography>
          <Typography component="div" color="textSecondary">
            <Line text={"Application: " + coreData.application} maxLine={1}/>
          </Typography>
          <Typography component="div" color="textSecondary">
            <Line text={"Assignee: " + coreData.assignee} maxLine={1}/>
          </Typography>
          <Typography component="div" className={"Description"}>
            <Line text={coreData.shortDescription} maxLine={2}/>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>;
  }

  return (
    <Card className={"Card"} onClick={onClick}>
      {children}
    </Card>
  );
}

CardItem.propTypes = {
  coreData: PropTypes.object,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  progressBarColor: PropTypes.string.isRequired,
  loadingInfo: PropTypes.string.isRequired,
  noData: PropTypes.bool.isRequired,
};

export default CardItem;