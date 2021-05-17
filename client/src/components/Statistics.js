import React, { useEffect, useState } from 'react'
import ReactTooltip from "react-tooltip";
import CountryChart from "./CountryChart";
import ContinentChart from "./ContinentChart"
import NormalDistChart from './NormalDistChart'
import AgeCategoryChart from './AgeCategoryChart'
import StudyLevelChart from './StudyLevelChart'
import StudyAreaChart from './StudyAreaChart'

function Statistics({contentCountry, fetchedCountryData, contentContinent, fetchedContinentData, fetchedAgeCategoryData, fetchedStudyLevelData, fetchedStudyAreaData, setContentCountry, setContentContinent}) {

    if (fetchedCountryData && fetchedContinentData && fetchedAgeCategoryData && fetchedStudyLevelData && fetchedStudyAreaData) {
        return (
            <div>
                <div className="stats">
                    <h2>Our Statistics</h2>
                    <p>Our following statistics are based on the measured data of this website of all candidates worldwide and may evolve depending on the new results recorded.</p>
                    <p>Furthermore, We complement each IQ result with personalized statistics that assess the candidate based on various parameters (population, age category, study level, study area).</p>
                </div>
                <div className="geochart">
                    <div className="chart">
                        <h2>General breakdown according to country</h2>
                        <CountryChart setTooltipContent={setContentCountry} fetchedData={fetchedCountryData} />
                        <ReactTooltip html={true}>{contentCountry}</ReactTooltip>
                    </div>
                    <div className="chart">
                        <h2>General breakdown of IQ according to continent</h2>
                        <ContinentChart setTooltipContent={setContentContinent} fetchedData={fetchedContinentData} />
                        <ReactTooltip html={true}>{contentContinent}</ReactTooltip>
                    </div>
                    <div className="worldChartParagraph">
                        <p>Left there is a country chart. You can see each country in the world with the number of tests performed and the average IQ of that country.</p>
                        <p>The average IQ is calculated by performing a percentile rank test, taking into account the number of correct answers and the time required for the test, and taking the average of this percentile rank grouped by country.</p>
                        <p>To the right there is a continent chart where you can see the average IQ by continent. </p>
                        <p>Its calculation is also based on a percentile rank query grouped by continent.</p>
                    </div>
                </div>
                <div className="normalDistChart">
                    <NormalDistChart />
                    <p className="infoNorm">Normalized IQ distribution with mean 100 and standard deviation 15. IQ tests are constructed so that the results are approximately normally distributed for a sufficiently large population sample. </p>
                    <p className="infoNorm">This means about 51.6% of the population have an IQ between 90 to 110 IQ score (green). 22.1% of the population have an IQ score of 70-90 or 111-130 (orange). Only about 1.74% of the population have an IQ between 50 to 70 or 130 to 150 (red)</p>
                    <p className="infoNorm">The sum of all the frequencies add up to approximately 99.28%. This is the case because technically an IQ score less than 50 or more than 150 are possible but only 0.72% fall under that category.</p>
                </div>
                <div className="googleChart">
                    <div className="ageChart">
                        <AgeCategoryChart fetchedAgeCategoryData={fetchedAgeCategoryData} />
                    </div>
                </div>
                <div className="googleChart">
                    <div className="studyLevelChart">
                        <StudyLevelChart fetchedStudyLevelData={fetchedStudyLevelData} />
                    </div>
                </div>

                <div className="studyAreaChart">
                    <StudyAreaChart fetchedStudyAreaData={fetchedStudyAreaData} />
                </div>
            </div>
        )
    } else {
        return (
            <div>data is fetching</div>
        )
    }
}

export default Statistics
