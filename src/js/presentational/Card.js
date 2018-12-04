import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import '../../styles/Card.css';
import AutoHiddenDescription from "../AutoHiddenDescription";
import PropTypes from "prop-types";


const card = (props) => {
  const coreData = props.data;

  return (
    <Card className={'card'} onClick={props.onClick}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          New
        </Typography>
        <Typography variant="h5" component="h2">
          {coreData.number}
        </Typography>
        <Typography color="textSecondary">
          Application: {coreData.application}
        </Typography>
        <Typography color="textSecondary">
          AssigneeA: {coreData.assignee}
        </Typography>
        <Typography component="div">
          <AutoHiddenDescription description={coreData.shortDescription}/>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

card.propTypes = {
  data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default card;