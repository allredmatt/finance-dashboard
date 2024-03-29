import {useState, useEffect} from 'react'

const url = 'api/'  //need this in build version
//const url = '/v8/finance/chart/' //need for development server

export const useFetch = (params) => {
    const [data, setData] = useState('')
    const [max, setMax] = useState('')
    const [min, setMin] = useState('')
    const [previousValue, setPreviousVal] = useState('')

    const currentTime = Math.floor(Date.now()/1000);

    const extras = `?period1=${currentTime - 2592000}&period2=${currentTime}&interval=15m`

    const roundToOne = number => Math.round(number*10)/10

    const collectDataFromServer = () => {
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
    }
    
    useEffect( () =>{
      collectDataFromServer()
      const interval = setInterval(() => {
        collectDataFromServer()
      }, 30000);
      return () => clearInterval(interval);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    return {
      data,
      min,
      max,
      previousValue
    }
  }
