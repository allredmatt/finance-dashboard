import React,{useState, useEffect} from 'react'

const url = '/v8/finance/chart/'
const corsDomain = "localhost:3000"

export const useFetch = (params) => {
    const [data, setData] = useState('')
    const [max, setMax] = useState('')
    const [min, setMin] = useState('')
    const [previousValue, setPreviousVal] = useState('')

    const currentTime = Math.floor(Date.now()/1000);

    const extras = `?period1=${currentTime - 2592000}&period2=${currentTime}&interval=15m&corsDomain=${corsDomain}`

    const roundToOne = number => Math.round(number*10)/10
    
    useEffect( () =>{
      let localMin = Number.MAX_SAFE_INTEGER;
      let localMax = 0;
        fetch(url+params+extras)
        .then(response => response.json())
        .then((data) => {
          setData(roundToOne(data.chart.result[0].meta.regularMarketPrice));
          data.chart.result[0].indicators.quote[0].open.forEach((element) => {
            if(!element){return}
            if(element < localMin) {localMin = roundToOne(element)}
            if(element > localMax) {localMax = roundToOne(element)}
          });
          setMin(localMin);
          setMax(localMax);
          let length = data.chart.result[0].indicators.quote[0].open.length;
          let sumOfLast10 = 0;
          let countItems = 10
          for(let i=length - 11; i<data.chart.result[0].indicators.quote[0].open.length - 1; i++ ){
            if(data.chart.result[0].indicators.quote[0].open[i]){
              sumOfLast10 += data.chart.result[0].indicators.quote[0].open[i]
            }else{
              countItems -= 1
            }
          }
          setPreviousVal(roundToOne(sumOfLast10/countItems))
        })
    },[])
 
    return {
      data,
      min,
      max,
      previousValue
    }
  }