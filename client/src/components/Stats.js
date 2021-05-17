import React, { useEffect, useState } from 'react'
import ReactTooltip from "react-tooltip";
import CountryChart from "./CountryChart";


function Stats({contentCountry, fetchedCountryData, contentContinent, fetchedContinentData, fetchedAgeCategoryData, fetchedStudyLevelData, fetchedStudyAreaData, setContentCountry, setContentContinent}) {

    if (fetchedCountryData && fetchedContinentData && fetchedAgeCategoryData && fetchedStudyLevelData && fetchedStudyAreaData) {
        return (
            <div>
            

            </div>
        )
    } else {
        return (
            <div>data is fetching</div>
        )
    }
}

export default Stats
