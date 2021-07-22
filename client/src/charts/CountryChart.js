import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";
import { scaleQuantile } from "d3-scale";

import { useTranslation } from 'react-i18next';
import countryNameEN from '../locales/en/countries.json';
import countryNameDE from '../locales/de/countries.json';
import countryNameRU from '../locales/ru/countries.json';
import countryNameAR from '../locales/ar/countries.json';
import countryNameBG from '../locales/bg/countries.json';
import countryNameCS from '../locales/cs/countries.json';
import countryNameDA from '../locales/da/countries.json';
import countryNameEL from '../locales/el/countries.json';
import countryNameES from '../locales/es/countries.json';
import countryNameET from '../locales/et/countries.json';
import countryNameFI from '../locales/fi/countries.json';
import countryNameFR from '../locales/fr/countries.json';
import countryNameHU from '../locales/hu/countries.json';
import countryNameIT from '../locales/it/countries.json';
import countryNameJA from '../locales/ja/countries.json';
import countryNameKO from '../locales/ko/countries.json';

var R = require("rlab");

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleQuantile()
  .domain([1, 10])
  .range([
    "#EBF5FB",
    "#D6EAF8",
    "#AED6F1",
    "#85C1E9",
    "#5DADE2",
    "#3498DB",
    "#2E86C1",
    "#2874A6",
    "#21618C",
    "#1B4F72"
  ]);

const CountryChart = ({ setTooltipContent, fetchedData }) => {
  const { t, i18n } = useTranslation();

  const handleCountryName = (ISO_A2) => {
    let foundCountryName;
    if (i18n.language === 'en') {
      foundCountryName = countryNameEN.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'de') {
      foundCountryName = countryNameDE.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'ru') {
      foundCountryName = countryNameRU.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'ar') {
      foundCountryName = countryNameAR.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'bg') {
      foundCountryName = countryNameBG.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'cs') {
      foundCountryName = countryNameCS.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'da') {
      foundCountryName = countryNameDA.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'el') {
      foundCountryName = countryNameEL.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'es') {
      foundCountryName = countryNameES.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'et') {
      foundCountryName = countryNameET.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'fi') {
      foundCountryName = countryNameFI.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'fr') {
      foundCountryName = countryNameFR.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'hu') {
      foundCountryName = countryNameHU.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'it') {
      foundCountryName = countryNameIT.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'ja') {
      foundCountryName = countryNameJA.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    } else if (i18n.language === 'ko') {
      foundCountryName = countryNameKO.find(country => country.alpha2.toLowerCase() === ISO_A2.toLowerCase())
    }
    if (foundCountryName) {
      return foundCountryName.name
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
      <ComposableMap data-tip=""  >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const { ISO_A2 } = geo.properties;
              const cur = fetchedData.result.find(s => s.code === ISO_A2);
              let current;
              if(cur) {
                current = linearConverter(cur.percent_rank, 0, 1, 1, 10)
            }
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={cur ? colorScale(current) : "#D6D6DA"}
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
            )
          })
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default memo(CountryChart);
