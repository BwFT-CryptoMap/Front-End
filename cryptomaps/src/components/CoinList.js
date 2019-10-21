import React, {useState, useEffect, Fragment} from 'react';
import axios from 'axios'

import {useDispatch} from 'react-redux';



import CoinCard from './CoinCard';
import SearchForm from './SearchForm';

function CoinList(props){
    const [displayInfo, setDisplayInfo] = useState([])
    const dispatch = useDispatch();


    //add eventhandler for search bar to highlight the coinbox that is searched for?
    const [highlight, setHighlight] = useState([])

    //in the return use the property in a ternary to set the style property? an inline style?

    const [query, setQuery] = useState("");

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
  }, [query])

  const eventHandle = event => {
    setQuery(event.target.value);
  }


  const changeColor = () => {
      if(highlight === true){
          return {backgroundColor: "yellow"}
      }
      else{
          return null
      }
  }

  console.log(highlight)

    return(
        <Fragment>
            <SearchForm eventHandle={eventHandle} query={query} />
            {displayInfo.map(  (display, index) =>
                 (<CoinCard key={index} symbol={display.symbol} priceUsd={display.priceUsd} percentageChange24HrUsd={display.percentageChange24HrUsd} style={changeColor}/>)
                )}
        </Fragment>
    )
}

export default CoinList