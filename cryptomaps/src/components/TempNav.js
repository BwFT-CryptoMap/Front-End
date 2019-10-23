import React from "react";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";

import BlockList from "./TreeMap"
import LiquidView from "./LiquidView"
import ReportedVolView from "./ReportedVolView"
import RealVolView from "./RealVolView"

export default () => {

  return (
    <Router>
    <section >
      <header>

            <nav>
            
              <li>
                <Link to="/">MarketCap</Link>
              </li>
              <li>
                <Link to="/liquid">Liquid MarketCap</Link>
              </li>

              <li>
              <Link to="/reported-volume">Reported Volume</Link>
              </li>

              <li>
              <Link to="/real-volume">Real Volume</Link>
              </li>
        
          </nav>

         

      </header>
    </section>
    </Router>
  );
}


// <Switch>
            
// <Route exact path="/" component={BlockList} />
// <Route path="/liquid" component={LiquidView} />
// <Route path="/reported-volume" component={ReportedVolView}/>
// <Route path="/real-volume" component={RealVolView} />
// <Redirect from="*" to="/"/>

// </Switch>