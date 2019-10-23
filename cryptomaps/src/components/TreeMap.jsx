import React from 'react';
import { useSelector } from 'react-redux'
import { Svg, Rect, Text } from '@potion/element'
import { Treemap } from '@potion/layout'


import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default () => {
    const mapData = useSelector(state => state.mapData).filter(data => data.currentMarketcap > 0).slice(0, 50)

    const getPercentage = (marketCap, totalMarketCap) => {
        return ((marketCap / totalMarketCap) * 100)
    }

    const arrangeData = (data) => {
        let totalMarketCap = data.reduce((a, c) => a + c.currentMarketcap, 0)
        return data.map(datum => {
            return { key: datum.id, value: getPercentage(datum.currentMarketcap, totalMarketCap), symbol: datum.symbol, priceUsd: datum.priceUsd, percentageChange24HrUsd: datum.percentageChange24HrUsd }
        })
    }


    return (
        <TransformWrapper defaultScale={1}>
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <React.Fragment>
                    <div className="tools">
                        <button onClick={resetTransform}>Reset</button>
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
                                        <Rect
                                            key={key}
                                            x={x0}
                                            y={y0}
                                            width={x1 - x0}
                                            height={y1 - y0}
                                            fill={data.percentageChange24HrUsd === 0 ? '#BCB2B1' : data.percentageChange24HrUsd > 0 ? data.percentageChange24HrUsd >= 5 ? '#518651' : '#7EC17E' : data.percentageChange24HrUsd <= -5 ? '#C84040' : '#ED7171'}
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
                                            <tspan dy={Number(2 * ((x1 - x0) / 14))} >{data.percentageChange24HrUsd ? data.percentageChange24HrUsd > 0 ? '+' + data.percentageChange24HrUsd.toFixed(2) + '%' : data.percentageChange24HrUsd.toFixed(2) + '%' : null}</tspan>
    
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
