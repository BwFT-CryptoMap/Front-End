import React from 'react'
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  }
});

//if we use React Fragment it won't include any html markup of its own but it can still be used as a divider, may be useful for more complex styling


function CoinCard(props){

    const classes = useStyles();

    return(
        <Card className={classes.card}>
      <CardActionArea>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2" alt="ticker symbol">
        {props.symbol}
      </Typography>
          <Typography gutterBottom variant="h5" component="h2" alt="displaying the current price in US dollars">
            {props.priceUsd}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.percentageChange24HrUsd}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )


}

export default CoinCard