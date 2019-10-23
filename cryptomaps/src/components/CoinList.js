import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'

import {useDispatch} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';



import CoinCard from './CoinCard';

import SearchForm from './SearchForm';


//////////////////////////////////Material UI//////////////////////////

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
    transform: 'translateZ(0)'
  },
}));


////////////////////////Exported Component//////////////////

function CoinList(props){
    const [displayInfo, setDisplayInfo] = useState([])
    const dispatch = useDispatch();


    //add eventhandler for search bar to highlight the coinbox that is searched for?
    const [highlight, setHighlight] = useState([])

    //in the return use the property in a ternary to set the style property? an inline style?

    const [query, setQuery] = useState("");

    const classes = useStyles();









  useEffect(() => {
    axios.get(`https://data.messari.io/api/v1/markets/prices-legacy`)
    .then(res => {
      console.log("this is from CoinList", res);
      setDisplayInfo(res.data.data)
      const items = displayInfo.filter(item =>
       { if(item.symbol === null){
         
         return null
        }
        else{
          return item.symbol.toLowerCase().startsWith(query.toLowerCase())
        }
       })
     setHighlight(items)
    })
    .catch(err => {
      console.log("Did not receive data from API call", err)
    })
  }, [query])

  const eventHandle = event => {
    setQuery(event.target.value);
  }


  // const changeColor = () => {
  //     if(highlight.includes(displayInfo)){
  //         return {backgroundColor: "yellow"}
  //     }
  //     else{
  //         return null
  //     }
  // }

  console.log("this is highlight", highlight)



  let sizeBox = Number(props.priceUsd);
  console.log(sizeBox)
  let percentageSizeBox = 0;
  let changeSizeBox = () => {if(sizeBox === NaN){return 0}else{return sizeBox / 10};}
  percentageSizeBox = changeSizeBox(sizeBox)
  console.log(props.symbol)
  console.log("This is %", percentageSizeBox)

    return(
        <div className={classes.root}>
            <SearchForm eventHandle={eventHandle} query={query} />
       
            <GridList cellHeight={percentageSizeBox * 3 || 0} spacing={1} className={classes.gridList} cols={3}>
            {
            
            
              displayInfo.map(  (display, index) =>
              (
               <CoinCard key={index} symbol={display.symbol} priceUsd={display.priceUsd} percentageChange24HrUsd={display.percentageChange24HrUsd} />)
              )
            
             }
            
             </GridList>


        </div>
    )
}

export default CoinList



// style={`${highlight.includes(display.symbol)? {backgroundColor : 'yellow'} : {backgroundColor: "inherit"} }`}


