
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './App.css';



import Blocklist from './components/TreeMap'
import Header from './components/header'
import { getApiData } from './actions'

import CircularProgress from '@material-ui/core/CircularProgress'

function App() {

  const dispatch = useDispatch();
  const isFetched = useSelector(state => state.isFetched)

  useEffect(() => {
    let timer = setInterval(() => {
      dispatch(getApiData())
    }, 5000);
    return () => clearInterval(timer);
  }, [])

  return (
    <div>
      <Header />
      {!isFetched ? <CircularProgress /> : <Blocklist />}
    </div>
  );
}

export default App;
