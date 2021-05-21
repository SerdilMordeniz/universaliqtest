import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
var R = require("rlab");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountryChart = ({ setTooltipContent, fetchedData }) => {

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 184 }} >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME, ISO_A2 } = geo.properties;
                  let result = fetchedData.result.find(o => o.code === ISO_A2 || null)
                  let numberOfTests = 0;
                  let percentile

                  if (result) {
                    numberOfTests = result.number_of_tests_per_country;
                    percentile = result.percentile
                  }
                 
                  let IQ
                  if (result) {
                    IQ = R.qnorm(percentile, 100, 15).toFixed(0)
                  } else {
                    IQ = ''
                  }
                  setTooltipContent(`${NAME}<br />Tests taken : ${numberOfTests}<br />Average IQ : ${IQ}`)
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none"
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

export default memo(CountryChart);
