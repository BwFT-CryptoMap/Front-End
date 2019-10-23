import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Svg, Rect, Text } from '@potion/element'
import { Treemap } from '@potion/layout'

import CoinCard from './CoinCard';

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default () => {
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        axios
            .get('https://data.messari.io/api/v1/markets/prices-legacy')
            .then(res => setMapData(res.data.data.filter(data => data.currentMarketcap > 0).slice(0, 50)
            ))
            .catch(err => console.log(err))
    }, [])

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
        <Svg width={1024} height={600}>
            <Treemap
                data={{
                    children: arrangeData(mapData)
                }}
                sum={datum => datum.value}
                size={[1024, 600]}
                nodeEnter={d => ({ ...d, r: 0 })} 
                animate
                >
                {nodes => nodes.map(({ key, x0, y0, x1, y1, data }) => (
                    <>
                <Rect
                    key={key}
                    x={x0}
                    y={y0}
                    width={x1 - x0}
                    height={y1 - y0}
                    fill={data.percentageChange24HrUsd === 0 ? '#BCB2B1' : data.percentageChange24HrUsd > 0 ? data.percentageChange24HrUsd >= 5 ? '#518651' : '#7EC17E' : data.percentageChange24HrUsd <= -5 ? '#C84040': '#ED7171'}
                    stroke='black'
                />
            <Text 
                x={x0 + (x1 - x0) / 2}
                y={y0 + (y1 - y0) / 2}
                fontSize={Number((x1-x0) /10)}
                color="black"
                > 
              {data.symbol}
            </Text>
            <Text
                   x={x0 + (x1-x0) / 2}
                   y={y0 + (y1-y0) / 1.6}
                   fontSize={Number((x1-x0) /12)}
                   color="black">
                       {data.priceUsd ? '$' + data.priceUsd.toFixed(2): null}
                   </Text>
                   <Text
                   x={x0 + (x1-x0) / 2}
                   y={y0 + (y1-y0) / 1.4}
                   fontSize={Number((x1-x0) /14)}
                   color="black">
                       {data.percentageChange24HrUsd ? data.percentageChange24HrUsd > 0 ? '+' + data.percentageChange24HrUsd.toFixed(2) + '%' : data.percentageChange24HrUsd.toFixed(2) + '%' : null}
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
