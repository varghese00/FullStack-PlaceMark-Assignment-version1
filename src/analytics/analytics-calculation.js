/* eslint-disable no-plusplus */
import { db } from "../models/db.js";




export const analytics= {

      async mostAddedCounty() {
        const stations= await db.stationStore.getAllStations();
        console.log(stations)
        // eslint-disable-next-line prefer-const
        let filterStations=stations.map(a =>a.name);
        console.log(filterStations,"Stations are being filtered");
        // eslint-disable-next-line prefer-const
        let map = {};
        let mostFrequentCounty= filterStations[0];
        for( let i=0;i<filterStations.length;i++){
          if (!map[filterStations[i]]){
            map[filterStations[i]]=1;
          }else{
            ++map[filterStations[i]];
            if(map[filterStations[i]]>map[mostFrequentCounty]){
              mostFrequentCounty=filterStations[i];
            }
          }
        }
        console.log(mostFrequentCounty);
        return mostFrequentCounty;

    },
    async leastAddedCounty(){
      const stations= await db.stationStore.getAllStations();
      // eslint-disable-next-line prefer-const
      let filterStations=stations.map(a =>a.name);
      let leastfrequentNo=Infinity;
      let counter=0;
      let leastFrequentCounty;
      for (let i=0;i<filterStations.length;i++) {
        for (let j=0;j<filterStations.length;j++) {
          if (filterStations[i] === filterStations[j] )
          {counter++;}
        }
        if(leastfrequentNo > counter){
        leastfrequentNo = counter;
        leastFrequentCounty=filterStations[i];
        }
        console.log(`${filterStations[i]  }exists${  counter  }times`);
        counter=0;
      }
console.log(`least occured county is: ${  leastFrequentCounty}` )
return leastFrequentCounty;

    }
  }
    
    


