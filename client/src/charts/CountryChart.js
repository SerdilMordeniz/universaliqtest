import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { useTranslation } from 'react-i18next';
import countryNameEN from '../locales/en/countries.json';
import countryNameDE from '../locales/de/countries.json';

var R = require("rlab");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const CountryChart = ({ setTooltipContent, fetchedData }) => {
  const { t, i18n } = useTranslation();

  const handleCountryName = (ISO_A2) => {
    let foundCountryName;
    if(i18n.language === 'en') {
      foundCountryName = countryNameEN.find(country => country.alpha2 === ISO_A2)
    } else if(i18n.language === 'de') {
      foundCountryName = countryNameDE.find(country => country.alpha2 === ISO_A2)
    }
    if(foundCountryName) {
      return foundCountryName.name
    } else {
      return undefined
    }
  }

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
                  const { ISO_A2 } = geo.properties;
                  const name = handleCountryName(ISO_A2);
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
                  setTooltipContent(`${name}<br />${t('statistics.testsTaken')} : ${numberOfTests}<br />${t('statistics.averageIq')} : ${IQ}`)
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
