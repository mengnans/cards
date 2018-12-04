import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../styles/Card.css';
import Line from "../Line";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


class CardItem extends React.Component {

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return nextProps.data.coreData.id === this.props.data.coreData.id;
  }

  render() {
    const coreData = this.props.data;
    let children =
      <div>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            New
          </Typography>
          <Typography variant="h5" component="h2">
            <Line description={coreData.number} maxLine={1}/>
          </Typography>
          <Typography color="textSecondary">
            <Line description={"Application: " + coreData.application} maxLine={1}/>
          </Typography>
          <Typography color="textSecondary">
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
    // children =
    //   <div className="Card-loading-div">
    //     <CircularProgress className="Card-loading-progress" size={80}/>
    //   </div>;

    return (
      <Card className={'Card'} onClick={this.props.onClick}>
        {children}
      </Card>
    );
  }
}

CardItem.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CardItem;