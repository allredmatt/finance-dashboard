import React from 'react';

export function SvgTemplate ({data, max, min, name, logo, previous}) {
    let range = max - min;
    let fraction = range === 0? 0.5 : (data - min)/ range; 
    let newgap = 35 - Math.round(35 * fraction);
    let barPosition = 65 + newgap

    let dataBar = {};
        dataBar.textOnTop = (barPosition >= 84);
        if(dataBar.textOnTop){
            dataBar.textHeight = barPosition;
            dataBar.barHeight = "M5 "+(barPosition+2)+" l95 0";
        } else {
            dataBar.barHeight = "M5 "+(barPosition-10)+" l95 0";
            dataBar.textHeight = barPosition+4
        }

        //80 is max Height  45 is min Height, range of 35

        dataBar.jsx = <>
                        <text x="10" y={dataBar.textHeight} fill="white">Price: {data}</text>
                        <path stroke="white" d={dataBar.barHeight} />
                    </>
    
    let strokeColour = "black";
    if(previous > data) {
        strokeColour = "red"
    }else if(previous < data){
        strokeColour = "green"
    };

    return(
        <svg key={name} height="140" width="120" style={{marginLeft:"2px", marginRight:"2px", marginTop:"2px"}}>
            <defs>
                <linearGradient id="linearGradient" gradientTransform="rotate(90)">
                    <stop offset="0%"   stop-color="#6f0dee"/>
                    <stop offset="10%"  stop-color="#4d45f8"/>
                    <stop offset="20%"  stop-color="#2460fd"/>
                    <stop offset="30%"  stop-color="#0075fb"/>
                    <stop offset="40%"  stop-color="#0086f6"/>
                    <stop offset="50%"  stop-color="#0097f9"/>
                    <stop offset="60%"  stop-color="#00a6f8"/>
                    <stop offset="70%"  stop-color="#00b4f5"/>
                    <stop offset="80%"  stop-color="#00c7fa"/>
                    <stop offset="90%"  stop-color="#00d9fa"/>
                    <stop offset="100%" stop-color="#2cebf7"/>
                </linearGradient>
            </defs>
            <g fill="none">
                <rect x="0" y="0" width="120" height="140" style={{
                    fill: 'url(#linearGradient)', 
                    stroke: strokeColour, 
                    strokeWidth:5, 
                    fillOpacity:0.6, 
                    strokeOpacity:0.9}
                } />
                <image href={logo} height="30" width="80%" x="4" y="4"/>
                <text x="4" y="49" fill="green">Max: {max}</text>
                <path stroke="green" d="M5 52 l95 0" />
                {dataBar.jsx}
                <path stroke="red" d="M5 105 l95 0" />
                <text x="4" y="120" fill="red">Min: {min}</text>
            </g>
            Sorry, your browser does not support inline SVG.
        </svg>
    )
}