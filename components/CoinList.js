import React, {useState, useEffect, Fragment} from 'react';
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
      const items = displayInfo.filter(item => item.symbol.toLowerCase().includes(query.toLowerCase()))
     setHighlight(items)
    })
  }, [query])

  const eventHandle = event => {
    setQuery(event.target.value);
  }


  const changeColor = () => {
      if(highlight === true){
          {backgroundColor: "yellow"}
      }
      else{
          null
      }
  }


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