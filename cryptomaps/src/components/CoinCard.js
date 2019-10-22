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

//   let sizeBox = Number(props.priceUsd);
// console.log(sizeBox)
// let percentageSizeBox = 0;
// let changeSizeBox = () => {if(sizeBox === NaN){return 0}else{return sizeBox / 10};}
// percentageSizeBox = changeSizeBox(sizeBox)
// console.log(props.symbol)
// console.log("This is %", percentageSizeBox)
  
const useStyles = makeStyles({
  card: {
    // left: props.x/10,
    // bottom: props.y/10,
    // maxWidth: Math.round(props.width),
    // maxHeight: Math.round(props.height),
    // backgroundColor: "yellow",
    // border: "3px solid blue",
    // zIndex: 2147483647,
    // flexWrap: 'nowrap',
    // flexDirection: "row",
    // alignContent: "flex-start"
  },
  media: {
    height: 140,
  },
  title: {
    fontSize: 76,
  },
  pos: {
   
    marginBottom: 12,
  }
});
console.log("this is props x", props.x)
    const classes = useStyles();
    //const highlight = newStyles();

console.log(props.percentageChange24HrUsd)
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
            {props.percentageChange24HrUsd ? props.percentageChange24HrUsd > 0 ? '+' + props.percentageChange24HrUsd.toFixed(2) + '%' : props.percentageChange24HrUsd.toFixed(2) + '%' : null}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )


}

export default CoinCard

//`${props.changeColor? highlight.card : classes.card}`





//
// <h1>{symbol}</h1>
// <h2>{priceUsd ? '$' + priceUsd.toFixed(2): null}</h2>
// <h2>{percentageChange24HrUsd ? percentageChange24HrUsd > 0 ? '+' + percentageChange24HrUsd.toFixed(2) + '%' : percentageChange24HrUsd.toFixed(2) + '%' : null}</h2>


// <CoinCard symbol={symbol} priceUsd={priceUsd} percentageChange24HrUsd={percentageChange24HrUsd} />



