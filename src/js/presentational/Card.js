import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../styles/Card.css';
import Line from "./Line";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


class CardItem extends React.Component {

  render() {
    const coreData = this.props.data;
    let children = this.props.isLoading ?
      <div className="Card-loading-div">
        <CircularProgress className="Card-loading-progress" size={80}/>
      </div>
      :
      <div>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            New
          </Typography>
          <Typography component="div">
            <Line description={coreData.number} maxLine={1}/>
          </Typography>
          <Typography component="div" color="textSecondary">
            <Line description={"Application: " + coreData.application} maxLine={1}/>
          </Typography>
          <Typography component="div" color="textSecondary">
            <Line description={"Assignee: " + coreData.assignee} maxLine={1}/>
          </Typography>
          <Typography component="div" className={"Description"}>
            <Line description={coreData.shortDescription} maxLine={2}/>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </div>;

    return (
      <Card className={'Card'} onClick={this.props.onClick}>
        {children}
      </Card>
    );
  }
}

CardItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
};

export default CardItem;