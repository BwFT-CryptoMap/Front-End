import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Svg, Rect } from '@potion/element'
import { Treemap } from '@potion/layout'

import CoinCard from './CoinCard';

export default () => {
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        axios
            .get('https://data.messari.io/api/v1/markets/prices-legacy')
            .then(res => setMapData(res.data.data.filter(data => data.currentMarketcap > 0).slice(0, 50)))
            .catch(err => console.log(err))
    }, [])

    const getPercentage = (marketCap, totalMarketCap) => {
        return ((marketCap / totalMarketCap) * 100)
    }

    const arrangeData = (data) => {
        let totalMarketCap = data.reduce((a, c) => a + c.currentMarketcap, 0)
        return data.map(datum => {
            return { key: datum.id, value: getPercentage(datum.currentMarketcap, totalMarketCap) }
        })
    }

    return (
        <Svg width={1024} height={600}>
            <Treemap
                data={{
                    children: arrangeData(mapData)
                }}
                sum={datum => datum.value}
                size={[1024, 600]}
                nodeEnter={d => ({ ...d, r: 0 })}
                animate
            >{nodes => nodes.map(({ key, x0, y0, x1, y1 }) => (
                <CoinCard
                    key={key}
                    x={x0}
                    y={y0}
                    width={x1 - x0}
                    height={y1 - y0}
                    fill='red'
                    stroke='black'
                    symbol={mapData.symbol}
                    priceUsd={mapData.priceUsd}
                    percentageChange24HrUsd={mapData.percentageChange24HrUsd}/>
                
                   
               
               

            ))}</Treemap>
        </Svg >
    )
}





