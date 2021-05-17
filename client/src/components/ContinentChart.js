import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
var R = require("rlab");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const ContinentChart = ({ setTooltipContent, fetchedData }) => {
  const [highlighted, setHighlighted] = useState("");

  const continentNameToCode = (continentName) => {
    switch(continentName) {
      case 'North America':
        return 'NA';
      case 'South America':
        return 'SA';
      case 'Europe':
        return 'EU';
      case 'Asia':
        return 'AS';
      case 'Africa':
        return 'AF';
      case 'Oceania':
        return 'OC';
      case 'Antarctica':
        return 'AN';
      default:
        return '';
    }
  }

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 184 }}>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { CONTINENT } = geo.properties;

                  let continenCode = continentNameToCode(CONTINENT)
                  let result = fetchedData.result.find(o => o.code === continenCode || null)
                  let numberOfTests = 0
                  let numberOfRows = parseInt(fetchedData.number_of_rows,10);
                  let rankContinent = 0;
                  let percentile;

                  if(result) {
                    numberOfTests = result.number_of_tests_per_continent
                    rankContinent = parseInt(result.rank,10);
                  }

                  //calculate IQ
                  if (numberOfRows === 1 && rankContinent === 1) {
                    percentile = 50;
                  }
                   if (rankContinent === numberOfRows && rankContinent > 0 && numberOfRows !== 1) {
                    percentile = ((numberOfRows - rankContinent + 0.9) / numberOfRows) * 100
                  } if (rankContinent > 0 && rankContinent !== numberOfRows) {
                    percentile = ((numberOfRows - rankContinent) / numberOfRows) * 100
                  }
                  let IQ
                  if (result) {
                    IQ = R.qnorm(percentile / 100, 100, 15).toFixed(0)
                  } else {
                    IQ = ''
                  }

                  setTooltipContent(`${CONTINENT}<br />Tests taken : ${numberOfTests}<br />IQ : ${IQ}`);
                  setHighlighted(geo.properties.CONTINENT);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                  setHighlighted("");
                }}
                style={{
                  default: {
                    fill:
                      geo.properties.CONTINENT === highlighted
                        ? "#F53"
                        : "#D6D6DA"
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(ContinentChart);
