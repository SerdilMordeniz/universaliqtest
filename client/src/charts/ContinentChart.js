import React, { memo, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

import { useTranslation } from 'react-i18next';

import continentNameEN from '../locales/en/continents.json'
import continentNameDE from '../locales/de/continents.json'

var R = require("rlab");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleQuantile()
  .domain([1, 7])
  .range([
    "#EBF5FB",
    "#D6EAF8",
    "#85C1E9",
    "#5DADE2",
    "#2E86C1",
    "#2874A6",
    "#1B4F72"
  ]);

const ContinentChart = ({ setTooltipContent, fetchedData }) => {
  const { t, i18n } = useTranslation();

  const [highlighted, setHighlighted] = useState("");

  const continentNameToCode = (continentName) => {
    switch (continentName) {
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

  const handleContinentName = continentCode => {
    let foundContinentName;
    if (i18n.language === 'en') {
      foundContinentName = continentNameEN.find(continent => continent.cc === continentCode)
    } else if (i18n.language === 'de') {
      foundContinentName = continentNameDE.find(continent => continent.cc === continentCode)
    }
    if (foundContinentName) {
      return foundContinentName.name
    } else {
      return undefined
    }
  }

  const linearConverter = (oldValue, oldMin, oldMax, newMin, newMax) => {
    const newValue = (((oldValue - oldMin) * (newMax - newMin)) / (oldMax - oldMin)) + newMin
    return newValue;
  }

  return (
    <>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => { 
              const { CONTINENT } = geo.properties;
              const cur = fetchedData.result.find(s => s.code === continentNameToCode(CONTINENT));
              let current;
              if(cur) {
                current = linearConverter(cur.percent_rank, 0, 1, 1, 7) 
              }
              return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(current) : "#D6D6DA"}
                onMouseEnter={() => {
                  const { CONTINENT } = geo.properties;

                  let continentCode = continentNameToCode(CONTINENT)
                  const name = handleContinentName(continentCode);
                  let result = fetchedData.result.find(o => o.code === continentCode || null)
                  let numberOfTests = 0
                  let percentile;

                  if (result) {
                    numberOfTests = result.number_of_tests_per_continent
                    percentile = result.percentile
                  }
                  let IQ
                  if (result) {
                    IQ = R.qnorm(percentile, 100, 15).toFixed(0)
                  } else {
                    IQ = ''
                  }

                  setTooltipContent(`${name}<br />${t('statistics.testsTaken')} : ${numberOfTests}<br />${t('statistics.averageIq')} : ${IQ}`);
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
                        : ""
                  },

                  hover: {
                    fill: geo.properties.CONTINENT === highlighted?"#F53": "",
                    outline: "none"
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none"
                  }
                }}
              />
            )
          })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(ContinentChart);
