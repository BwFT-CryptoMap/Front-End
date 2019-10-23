import React, {useState} from 'react';
import { useSelector } from 'react-redux'
import { Svg, Rect, Text } from '@potion/element'
import { Treemap } from '@potion/layout'


import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import  CoinCard  from './CoinCard';
export default () => {
    const [selection, setSelection] = useState("24H")
    console.log("this is selection", selection)

    let changeColor; 
    let changePerformanceText;


    const mapData = useSelector(state => state.mapData).filter(data => data.currentMarketcap > 0).slice(0, 50)

    const getPercentage = (marketCap, totalMarketCap) => {
        return ((marketCap / totalMarketCap) * 100)
    }
    const arrangeData = (data) => {
        let totalMarketCap = data.reduce((a, c) => a + c.currentMarketcap, 0)
        return data.map(datum => {
            return { key: datum.id, value: getPercentage(datum.currentMarketcap, totalMarketCap), symbol: datum.symbol, priceUsd: datum.priceUsd, percentageChange24HrUsd: datum.percentageChange24HrUsd, percentageChange7dUsd: datum.percentageChange7dUsd, percentageChange30dUsd: datum.percentageChange30dUsd, percentageChange1yrUsd: datum.percentageChange1yrUsd }
        })
    }

const handleChange = (e) => {
        setSelection(e.target.value)
}

const timeChange = (data) => {
///took selection out of timechange params here AND below
    switch (selection) {
        case "24H": {

           
            
            changeColor = data.percentageChange24HrUsd === 0 ? '#BCB2B1' : data.percentageChange24HrUsd > 0 ? ( data.percentageChange24HrUsd >= 5 ? '#518651' : '#7EC17E') : 
             (-10 <= data.percentageChange24HrUsd <= -5 ? '#ED7171' : data.percentageChange24HrUsd <=-10? "#6e1414" : '#C84040' ) 
            

            
            changePerformanceText = data.percentageChange24HrUsd ? data.percentageChange24HrUsd > 0 ? '+' + data.percentageChange24HrUsd.toFixed(2) + '%' : data.percentageChange24HrUsd.toFixed(2) + '%' : null

            

            return (
                changeColor,
                changePerformanceText,
                console.log("this is changeColor", changeColor)
            )
            
        }
        case "7D": {

            changeColor = data.percentageChange7dUsd === 0 ? '#BCB2B1' : data.percentageChange7dUsd > 0 ? ( data.percentageChange7dUsd >= 5 ? '#518651' : '#7EC17E') : 
            (-10 <= data.percentageChange7dUsd <= -5 ? '#ED7171' : data.percentageChange7dUsd <=-10? "#6e1414" : '#C84040' ) 
            
            changePerformanceText = data.percentageChange7dUsd ? data.percentageChange7dUsd > 0 ? '+' + data.percentageChange7dUsd.toFixed(2) + '%' : data.percentageChange7dUsd.toFixed(2) + '%' : null

            return (
                changeColor,
                changePerformanceText
                
            )

        }
        case "30D": {

            changeColor = data.percentageChange30dUsd === 0 ? '#BCB2B1' : data.percentageChange30dUsd > 0 ? ( data.percentageChange30dUsd >= 5 ? '#518651' : '#7EC17E') : 
            (-10 <= data.percentageChange30dUsd <= -5 ? '#ED7171' : data.percentageChange30dUsd <=-10? "#6e1414" : '#C84040' ) 
            
            changePerformanceText = data.percentageChange30dUsd ? data.percentageChange30dUsd > 0 ? '+' + data.percentageChange30dUsd.toFixed(2) + '%' : data.percentageChange30dUsd.toFixed(2) + '%' : null

            return (
                changeColor,
                changePerformanceText
            )
        }
        case "1Y": {

            changeColor = data.percentageChange1yrUsd === 0 ? '#BCB2B1' : data.percentageChange1yrUsd > 0 ? ( data.percentageChange1yrUsd >= 5 ? '#518651' : '#7EC17E') : 
            (-10 <= data.percentageChange1yrUsd <= -5 ? '#ED7171' : data.percentageChange1yrUsd <=-10? "#6e1414" : '#C84040' ) 
            
            changePerformanceText = data.percentageChange1yrUsd ? data.percentageChange1yrUsd > 0 ? '+' + data.percentageChange1yrUsd.toFixed(2) + '%' : data.percentageChange1yrUsd.toFixed(2) + '%' : null


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

    return (
        <TransformWrapper defaultScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={resetTransform}>Reset</button>

                        <form>
                            <label name="PercentChange">Performance</label>
                            <select name="PercentChange" id="PercentChange" onChange={handleChange}>        <option value="24H">24H Performance</option>
                                <option value="7D">7D Performance</option>
                                <option value="30D">30D Performance</option>
                                <option value="1Y">1Y Performance</option>
                            </select>
</form>
                    </div>
                    <TransformComponent>
                        <Svg width={window.innerWidth} height={window.innerHeight - 100}>
                          <Treemap
                                data={{
                                    children: arrangeData(mapData)
                                }}
                                sum={datum => datum.value}
                                size={[window.innerWidth, (window.innerHeight - 100)]}
                                nodeEnter={d => ({ ...d, r: 0 })}
                               
                            >
                                {nodes => nodes.map(({ key, x0, y0, x1, y1, data }) => (
                                   
                                    <>
                                    {timeChange(data)}
                                        <Rect
                                            key={key}
                                            x={x0}
                                            y={y0}
                                            width={x1 - x0}
                                            height={y1 - y0}
                                            fill={changeColor}
                                            stroke='black'
                                        />
                                        <Text
                                        x={x0 + (x1 - x0) * .4}
                                        y={y0 + (y1 - y0) / 2}
                                       
                                        fontSize={Number((x1 - x0) / 14)}
                                        color="black">
                                                <tspan x={x0 + (x1 - x0) * .4} y={y0 + (y1 - y0) / 2} >
                                                    
                                                        {data.symbol}

                                                        </tspan>
                                        </Text>
                                        <Text
                                         x={x0 + (x1 - x0) * .4}
                                         y={y0 + (y1 - y0) / 2}
                                              
                                        fontSize={Number((x1 - x0) / 14)}
                                        color="black">
                                            <tspan dy={Number((x1 - x0) / 14)} >{data.priceUsd ? '$' + data.priceUsd.toFixed(2) : null}
    
                                                   
                                            </tspan>   
                                        </Text>
                                        <Text
                                        x={x0 + (x1 - x0) * .4}
                                        y={y0 + (y1 - y0) / 2}
                                        fontSize={Number((x1 - x0) / 14)}
                                        color="black">
                                            <tspan dy={Number(2 * ((x1 - x0) / 14))} >{changePerformanceText}</tspan>
    
                                       </Text>
                                        
                                    </>
                                ))}
                            </Treemap>
                        </Svg >
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    )
}
