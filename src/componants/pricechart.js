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
                        <text x="18" y={dataBar.textHeight} fill="black">Cur: {data}</text>
                        <path stroke="black" d={dataBar.barHeight} />
                    </>
    
    let strokeColour = "black";
    if(previous > data) {
        strokeColour = "red"
    }else if(previous < data){
        strokeColour = "green"
    };

    return(
        <svg key={name} height="140" width="120" style={{marginLeft:"2px", marginRight:"2px", marginTop:"2px"}}>
            <g fill="none">
                <rect x="0" y="0" width="120" height="140" style={{fill:"blue", stroke:strokeColour, strokeWidth:5, fillOpacity:0.1, strokeOpacity:0.9}} />
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