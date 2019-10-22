import React from 'react'
import { Card } from '@material-ui/core';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { yellow } from '@material-ui/core/colors';
import { flexbox } from '@material-ui/system';



// const newStyles = makeStyles({
//   card: {
//     maxWidth: 345,
//     backgroundColor: "yellow"
//   },
//   media: {
//     height: 140,
//   },
//   title: {
//     fontSize: 14,
//   },
//   pos: {
//     marginBottom: 12,
//   }
// });

//if we use React Fragment it won't include any html markup of its own but it can still be used as a divider, may be useful for more complex styling


function CoinCard(props){

  let sizeBox = Number(props.priceUsd);
console.log(sizeBox)
let percentageSizeBox = 0;
let changeSizeBox = () => {if(sizeBox === NaN){return 0}else{return sizeBox / 10};}
percentageSizeBox = changeSizeBox(sizeBox)
console.log(props.symbol)
console.log("This is %", percentageSizeBox)
  
const useStyles = makeStyles({
  card: {
    maxWidth: percentageSizeBox * 3 || 0,
    maxHeight: percentageSizeBox * 3 || 0,
    backgroundColor: "yellow",
    display: "flex",
    flexWrap: 'nowrap',
    flexDirection: "row",
    alignContent: "flex-start"
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: percentageSizeBox,
  },
  pos: {
   
    marginBottom: 12,
  }
});

    const classes = useStyles();
    //const highlight = newStyles();


    return(
        <Card display="flexbox" className={classes.card}>
      <CardActionArea>
        <CardContent>
        <Typography gutterBottom variant="h5" component="h2" alt="ticker symbol">
        {props.symbol}
      </Typography>
          <Typography gutterBottom variant="h5" component="h2" alt="displaying the current price in US dollars">
          {props.priceUsd ? '$' + props.priceUsd.toFixed(2): null}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {{props.percentageChange24HrUsd ? props.percentageChange24HrUsd > 0 ? '+' + props.percentageChange24HrUsd.toFixed(2) + '%' : props.percentageChange24HrUsd.toFixed(2) + '%' : null}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )


}

export default CoinCard

//`${props.changeColor? highlight.card : classes.card}`