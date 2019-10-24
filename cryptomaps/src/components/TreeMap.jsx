import React, { useState, Fragment } from 'react';
import { useSelector } from 'react-redux'
import { Svg, Rect, Text } from '@potion/element'
import { Treemap } from '@potion/layout'
import Tooltip from '@material-ui/core/Tooltip'


import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";



export default () => {
    const [selection, setSelection] = useState("24H")

    let changeColor;
    let changePerformanceText;

    let matchGreaterBorder;

    const mapData = useSelector(state => state.mapData).filter(data => data.currentMarketcap > 0).slice(0, 50)

    const getPercentage = (marketCap, totalMarketCap) => {
        return ((marketCap / totalMarketCap) * 100)
    }
    const arrangeData = (data) => {
        let totalMarketCap = data.reduce((a, c) => a + c.currentMarketcap, 0)
        return data.map(datum => {
            return { key: datum.id, value: getPercentage(datum.currentMarketcap, totalMarketCap), symbol: datum.symbol, priceUsd: datum.priceUsd, percentageChange24HrUsd: datum.percentageChange24HrUsd, percentageChange7dUsd: datum.percentageChange7dUsd, percentageChange30dUsd: datum.percentageChange30dUsd, percentageChange90dUsd: datum.percentageChange90dUsd }
        })
    }

    const handleChange = (e) => {
        setSelection(e.target.value)
    }

    const timeChange = (data) => {
        ///took selection out of timechange params here AND below
        switch (selection) {
            case "24H": {



                changeColor = data.percentageChange24HrUsd === 0 ? '#BCB2B1' : data.percentageChange24HrUsd > 0 ? (data.percentageChange24HrUsd >= 5 ? '#518651' : '#7EC17E') :
                    (-10 <= data.percentageChange24HrUsd <= -5 ? '#ED7171' : data.percentageChange24HrUsd <= -10 ? "#6e1414" : '#C84040')



                changePerformanceText = data.percentageChange24HrUsd ? data.percentageChange24HrUsd > 0 ? '+' + data.percentageChange24HrUsd.toFixed(2) + '%' : data.percentageChange24HrUsd.toFixed(2) + '%' : null



                return (
                    changeColor,
                    changePerformanceText
                )

            }
            case "7D": {

                changeColor = data.percentageChange7dUsd === 0 ? '#BCB2B1' : data.percentageChange7dUsd > 0 ? (data.percentageChange7dUsd >= 5 ? '#518651' : '#7EC17E') :
                    (-10 <= data.percentageChange7dUsd <= -5 ? '#ED7171' : data.percentageChange7dUsd <= -10 ? "#6e1414" : '#C84040')

                changePerformanceText = data.percentageChange7dUsd ? data.percentageChange7dUsd > 0 ? '+' + data.percentageChange7dUsd.toFixed(2) + '%' : data.percentageChange7dUsd.toFixed(2) + '%' : null

                return (
                    changeColor,
                    changePerformanceText

                )

            }
            case "30D": {

                changeColor = data.percentageChange30dUsd === 0 ? '#BCB2B1' : data.percentageChange30dUsd > 0 ? (data.percentageChange30dUsd >= 5 ? '#518651' : '#7EC17E') :
                    (-10 <= data.percentageChange30dUsd <= -5 ? '#ED7171' : data.percentageChange30dUsd <= -10 ? "#6e1414" : '#C84040')

                changePerformanceText = data.percentageChange30dUsd ? data.percentageChange30dUsd > 0 ? '+' + data.percentageChange30dUsd.toFixed(2) + '%' : data.percentageChange30dUsd.toFixed(2) + '%' : null

                return (
                    changeColor,
                    changePerformanceText
                )
            }
            case "90D": {

                changeColor = data.percentChange90dUsd === 0 ? '#BCB2B1' : data.percentageChange90dUsd > 0 ? (data.percentageChange90dUsd >= 5 ? '#518651' : '#7EC17E') :
                    (-10 <= data.percentageChange90dUsd <= -5 ? '#ED7171' : data.percentageChange90dUsd <= -10 ? "#6e1414" : '#C84040')

                changePerformanceText = data.percentageChange90dUsd ? data.percentageChange90dUsd > 0 ? '+' + data.percentageChange90dUsd.toFixed(2) + '%' : data.percentageChange90dUsd.toFixed(2) + '%' : null


                return (
                    changeColor,
                    changePerformanceText
                )
            }
            default: {
                return selection
            }
        }

    }

    const fonterDoerer = (x0, x1, y0, y1) => {

        matchGreaterBorder = x1 - x0 < y1 - y0 ? ((x1 - x0) / 8) : ((y1 - y0) / 8);

        return matchGreaterBorder


    }

    return (
        <TransformWrapper defaultScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={resetTransform}>Reset</button>

                        <form className="selection">
                            <select name="PercentChange" id="PercentChange" onChange={handleChange}>
                                <option value="24H">24H Performance</option>
                                <option value="7D">7D Performance</option>
                                <option value="30D">30D Performance</option>
                                <option value="90D">90D Performance</option>
                            </select>
                        </form>
                    </div>
                    <TransformComponent>
                        <Svg maxWidth="100%" width={window.innerWidth} height={window.innerHeight - 197}>
                            <Treemap
                                data={{
                                    children: arrangeData(mapData)
                                }}
                                sum={datum => datum.value}
                                size={[window.innerWidth, (window.innerHeight - 197)]}
                                

                            >
                                {nodes => nodes.map(({ key, x0, y0, x1, y1, data }) => (

                                    <>

                                        {timeChange(data)}
                                        {fonterDoerer(x0, x1, y0, y1)}
                                        {// Title can be a react fragment filled with whatevz?
                                        }
                                        <Tooltip title={
                                            <Fragment>
                                            <p> {data.symbol}</p>
                                            <p>{data.priceUsd ? '$' + data.priceUsd.toFixed(2) : null}</p>
                                           <p>{changePerformanceText}</p>
                                            </Fragment>
                                        }>
                                            <Rect
                                                key={key}
                                                x={x0}
                                                y={y0}
                                                width={x1 - x0}
                                                height={y1 - y0}
                                                fill={changeColor}
                                                stroke='#01579b'
                                              
                                            />
                                         

                                        </Tooltip>
                                        <Text

                                            x={x0 + (x1 - x0) * .4}
                                            y={y0 + (y1 - y0) / 2}

                                            fontSize={matchGreaterBorder}
                                            color="black">
                                            <tspan x={x0 + (x1 - x0) * .4} y={y0 + (y1 - y0) / 2} >

                                                {data.symbol}

                                            </tspan>
                                        </Text>
                                        <Text
                                            x={x0 + (x1 - x0) * .4}
                                            y={y0 + (y1 - y0) / 2}

                                            fontSize={matchGreaterBorder}
                                            color="black">
                                            <tspan dy={matchGreaterBorder} >{data.priceUsd ? '$' + data.priceUsd.toFixed(2) : null}


                                            </tspan>
                                        </Text>
                                        <Text
                                            x={x0 + (x1 - x0) * .4}
                                            y={y0 + (y1 - y0) / 2}
                                            fontSize={matchGreaterBorder}
                                            color="black">
                                            <tspan dy={2 * Number(matchGreaterBorder)} >{changePerformanceText}</tspan>

                                        </Text>


                                    </>
                                ))}
                            </Treemap>
                        </Svg >
                    </TransformComponent>
                </React.Fragment>
            )
            }
        </TransformWrapper >
    )
}
