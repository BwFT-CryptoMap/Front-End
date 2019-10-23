import React from 'react'

import '../landing.css'

export default () => {

    return (
        <header>
            <div className="content">
                <div>
                    <a href="https://messari.io/" classname="messariLogo">
                        <img src={require("../images/messari-Icon.svg")} alt="Messari Logo"></img>
                    </a>
                    <a href="https://messari.io" className="homeLogo">
                        <img src={require("../images/messari_home_logo.png")} alt="Messari Logo"></img>
                    </a>
                </div>
                <nav>
                    <a href="../cryptoMap/index.html" className="hov active">Home</a>
                    <a href="#" className="hov">CryptoMap</a>
                    <a href="../cryptoMap/about.html" className="hov">About</a>
                    <a href="https://twitter.com/messaricrypto" className="tablet">
                        <img src={require("../images/twitterIcon.png")} alt="The Twitter Bird Logo"></img>
                    </a>
                </nav>
                <div className="searchCont">
                    <div className="inputCont">
                        <form>
                            <button type="button" name="search" placeholder="Search the Messari database"></button>
                        </form>
                    </div>
                    <button className="searchBtn">
                        <span>Search</span>
                    </button>
                </div>
                <div className="loginSignUp">
                    <button className="loginBtn">
                        <span>Login</span>
                    </button>
                    <button className="signUpBtn">
                        <span>Sign Up</span>
                    </button>
                </div>
            </div>
        </header>
    )
}