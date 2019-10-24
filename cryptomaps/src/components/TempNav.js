import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";


export default () => {

  return (
    <section>
      <header>
​
            <nav>
            
              <li>
                <Link to="/">MarketCap</Link>
              </li>
              <li>
                <Link to="/liquid">Liquid MarketCap</Link>
              </li>
​
              <li>
              <Link to="/reported-volume">Reported Volume</Link>
              </li>
​
              <li>
              <Link to="/real-volume">Real Volume</Link>
              </li>
        
          </nav>
​
      </header>
    </section>
  );
}



