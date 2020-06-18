import React from 'react';
import {useFetch} from './hooks/useFetch.js'
import {SvgTemplate} from './componants/pricechart.js'
import './App.css';

function App() {

  const litecoinPrice = useFetch('LTC-GBP');
  const bitcoinPrice = useFetch('BTC-GBP');
  const FTSEPrice = useFetch('%5EFTSE');
  const baringsEu = useFetch('0P0000WDRR.L');
  const lindsellTrainD = useFetch('0P00012PN5.L')
  const lindsellTrainA = useFetch('0P0000SVHO.L')
  const TMcrux = useFetch('0P00016NX6.L')

  const financeArray = [];
  financeArray[0] = {...litecoinPrice, name: "Litecoin", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/6_Full_Logo_S-2.png/320px-6_Full_Logo_S-2.png"}
  financeArray[1] = {...bitcoinPrice, name: "Bitcoin", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bitcoin_logo.svg/320px-Bitcoin_logo.svg.png"}
  financeArray[2] = {...FTSEPrice, name: "FTSE", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/FTSE_Logo.svg/320px-FTSE_Logo.svg.png"}
  financeArray[3] = {...baringsEu, name: "Baring European Select", logo: "https://upload.wikimedia.org/wikipedia/en/0/05/Barings.png"}
  financeArray[4] = {...lindsellTrainD, name: "Lindsell Train D", logo: "https://www.hl.co.uk/__data/assets/image/0007/14269705/Lindsell.jpg"}
  financeArray[5] = {...lindsellTrainA, name: "Lindsell Train A", logo: "https://www.hl.co.uk/__data/assets/image/0007/14269705/Lindsell.jpg"}
  financeArray[6] = {...TMcrux, name: "TM CRUX European", logo: "https://www.cruxam.com/Portals/0/crux_logo.png?ver=2015-05-07-155246-503"}

  return (
    <div className="App">
      {financeArray.map(entry => 
      <SvgTemplate  
        min={entry.min} 
        max={entry.max} 
        data={entry.data} 
        previous={entry.previousValue} 
        name={entry.name}
        logo={entry.logo}
      />)
      }
    </div>
  );
}

export default App;
