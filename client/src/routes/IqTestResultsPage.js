import React, { useEffect, useState } from 'react'
import iqTestAPI from '../apis/iqTestAPI'
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import AgeCategoryChart from '../components/AgeCategoryChart'
import StudyLevelChart from '../components/StudyLevelChart'
var R = require("rlab");

function IqTestResultsPage() {
    const [IQResult, setIQResult] = useState()
    const [numberOfRows, setNumberOfRows] = useState()
    const [data, setData] = useState()
    const [percentileWorld, setPercentileWorld] = useState()

    const [fetchedAgeCategoryData, setFetchedAgeCategoryData] = useState(null)
    const [fetchedStudyLevelData, setFetchedStudyLevelData] = useState(null)
    const [fetchedStudyAreaData, setFetchedStudyAreaData] = useState(null)
    
    let { id } = useParams()

     //fetch age category data
     useEffect(() => {
        const fetchAgeCategoryChart = async () => {
            try {
                const response = await iqTestAPI.get('/age_category_chart')
                setFetchedAgeCategoryData(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAgeCategoryChart()
    }, [])

    //fetch study level data
    useEffect(() => {
        const fetchAgeCategoryChart = async () => {
            try {
                const response = await iqTestAPI.get('/study_level_chart')
                setFetchedStudyLevelData(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAgeCategoryChart()
    }, [])

    useEffect(() => {

        const fetchIQResult = async () => {
            try {
                const response = await iqTestAPI.get(`/results/${id}`)
                setIQResult(response.data.result)
                setNumberOfRows(response.data.number_of_rows)

            } catch (error) {
                console.log(error)
            }
        }
        if (id) {
            fetchIQResult()
        }
    }, [id])

    useEffect(() =>{
        if(IQResult && numberOfRows){
            if(IQResult.percentile_world_population === 0 ) {
                setPercentileWorld(Math.abs((IQResult.rank_world_population -1)/(IQResult.rank_world_population) -1))
            }
            else if(IQResult.percentile_world_population === 1 ) {
                setPercentileWorld(Math.abs((IQResult.rank_world_population)/(numberOfRows.number_of_rows_world_population.count)-1))
            }
            else {
                setPercentileWorld(IQResult.percentile_world_population) 
            }
        }
    },[IQResult, numberOfRows])

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = (s % 60).toString().padStart(2, "0");
        s = (s - secs) / 60;
        var mins = (s % 60).toString().padStart(2, "0");
        var hrs = ((s - mins) / 60);

        //return hrs + ':' + mins + ':' + secs + '.' + ms;
        return hrs + ':' + mins + ':' + secs + '.' + ms;
    }

    useEffect(() => {
        if (IQResult !== undefined) {
            const dataElements = [
                ["Element", "Time (milliseconds)"],
                ["1", IQResult.time_for_each_item[1]],
                ["2", IQResult.time_for_each_item[2]],
                ["3", IQResult.time_for_each_item[3]],
                ["4", IQResult.time_for_each_item[4]],
                ["5", IQResult.time_for_each_item[5]],
                ["6", IQResult.time_for_each_item[6]],
                ["7", IQResult.time_for_each_item[7]],
                ["8", IQResult.time_for_each_item[8]],
                ["9", IQResult.time_for_each_item[9]],
                ["10", IQResult.time_for_each_item[10]],
                ["11", IQResult.time_for_each_item[11]],
                ["12", IQResult.time_for_each_item[12]],
                ["13", IQResult.time_for_each_item[13]],
                ["14", IQResult.time_for_each_item[14]],
                ["15", IQResult.time_for_each_item[15]],
                ["16", IQResult.time_for_each_item[16]],
                ["17", IQResult.time_for_each_item[17]],
                ["18", IQResult.time_for_each_item[18]],
                ["19", IQResult.time_for_each_item[19]],
                ["20", IQResult.time_for_each_item[20]],
                ["21", IQResult.time_for_each_item[21]],
                ["22", IQResult.time_for_each_item[22]],
                ["23", IQResult.time_for_each_item[23]],
                ["24", IQResult.time_for_each_item[24]],
                ["25", IQResult.time_for_each_item[25]],
                ["26", IQResult.time_for_each_item[26]],
                ["27", IQResult.time_for_each_item[27]],
                ["28", IQResult.time_for_each_item[28]],
                ["29", IQResult.time_for_each_item[29]],
                ["30", IQResult.time_for_each_item[30]],
                ["31", IQResult.time_for_each_item[31]],
                ["32", IQResult.time_for_each_item[32]],
                ["33", IQResult.time_for_each_item[33]],
                ["34", IQResult.time_for_each_item[34]],
                ["35", IQResult.time_for_each_item[35]],
                ["36", IQResult.time_for_each_item[36]],
                ["37", IQResult.time_for_each_item[37]],
                ["38", IQResult.time_for_each_item[38]],
                ["39", IQResult.time_for_each_item[39]],
                ["40", IQResult.time_for_each_item[40]],
                ["41", IQResult.time_for_each_item[41]],
                ["42", IQResult.time_for_each_item[42]],
                ["43", IQResult.time_for_each_item[43]],
                ["44", IQResult.time_for_each_item[44]],
                ["45", IQResult.time_for_each_item[45]],
                ["46", IQResult.time_for_each_item[46]],
                ["47", IQResult.time_for_each_item[47]],
                ["48", IQResult.time_for_each_item[48]],
                ["49", IQResult.time_for_each_item[49]]
            ];
            setData(dataElements)
        }
    }, [IQResult])


    if (IQResult === undefined || numberOfRows === undefined) {
        return (
            <div>Results Page loading</div>
        )
    } else {
        return (
            <div className="iq_info">
                <div className="table_result">
                    <h1>IQ result of {IQResult.pseudonym}</h1>
                    <p className="result_paragraph">Congratulations, {IQResult.pseudonym}! <br /><br />

                        The IQ test you took is a development of the Raven concept of progressive matrices. It measures the domain of general intelligence: it evaluates logic, the ability to reason clearly and grasp complexity, and the ability to retain and reproduce patterns of information, sometimes called reproductive capacity.

                        Note that the average standard IQ is set at 100 for historical reasons. The test you passed was designed to have an average score of 100. This allows each candidate to compare their result with statistics and various parameters.

                        <br /><br />Based on the results of the completed test, <b>your IQ score is {(R.qnorm(percentileWorld, 100, 15)).toFixed(0)}.</b>

                        This IQ value is an estimate. Your result may change depending on your current form and the conditions under which you take the test.
                        Below you can see more details about your result. In addition, there are also some statistics in which you can compare yourself.
                    </p>
                    <p><b>
                            Your IQ score, ranks and the percentiles change over time. The reason for this is because as more people take this test, the more accurate 
                            your result will be.
                        </b></p>
                    <table className="table table-hover table-bordered m-1 mt-4 mb-4">
                        <tbody>
                            <tr className="table-warning">
                                <th scope="row">IQ</th>
                                <td><b>{(R.qnorm(percentileWorld, 100, 15)).toFixed(0)}</b></td>
                            </tr>
                            <tr>
                                <th scope="row">Rank</th>
                                <td>{IQResult.rank_world_population}/{numberOfRows.number_of_rows_world_population.count}</td>
                            </tr>
                            <tr>
                                <th scope="row">#Correct answers</th>
                                <td>{IQResult.number_of_correct_answers}/49</td>
                            </tr>
                            <tr>
                                <th scope="row">Total time</th>
                                <td>{msToTime(IQResult.total_time_taken)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Percentile</th>
                                <td>{(Number(IQResult.percentile_world_population) * 100).toFixed(3)}%</td>
                            </tr>
                            <tr>
                                <th scope="row">Z-score</th>
                                <td>{((R.qnorm(percentileWorld, 100, 15) - 100) / 15).toFixed(5)}</td>
                            </tr>
                            <tr>
                                <th scope="row">Rarity</th>
                                <td>≈ 1 in {(Math.round(Math.abs(1 / ((IQResult.percentile_world_population - 1)))))}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div>
                    <h2 className="time_taken_title">Time taken for each item</h2>
                    <Chart
                        chartType="ColumnChart"
                        width="800px"
                        height="500px"
                        data={data}
                        options={{
                            title: "Time taken for each item",
                            hAxis: {
                                title: "Item",
                            },
                            vAxis: {
                                title: "Time (milliseconds)",

                            }
                        }}
                    />
                </div>

                <div className="iq_rows" >
                    <div className="iqs">
                        <h2 className="">Age Category IQ</h2>
                        <div>Age Category: {IQResult.age_category}</div>
                        <div>Rank: {IQResult.rank_age_category}/{numberOfRows.number_of_rows_age_category.find(ageCategory => ageCategory.age_category === IQResult.age_category).count}</div>
                        <div>Percentile: {(Number(IQResult.percentile_age_category) * 100).toFixed(3)}%</div>
                        <div><b>IQ: {(R.qnorm(IQResult.percentile_age_category, 100, 15)).toFixed(0)}</b></div>
                    </div>

                    <div className="iqs">
                        <h2>Continent IQ</h2>
                        <div>Continent code: {IQResult.continent_code}</div>
                        <div>Rank: {IQResult.rank_continent}/{numberOfRows.number_of_rows_continent.find(continent => continent.continent_code === IQResult.continent_code).count} </div>
                        <div>Percentile: {(Number(IQResult.percentile_continent) * 100).toFixed(3)}%</div>
                        <div><b>IQ: {(R.qnorm(IQResult.percentile_continent, 100, 15)).toFixed(0)}</b></div>
                    </div>

                    <div className="iqs">
                        <h2>Country IQ</h2>
                        <div>Country: {IQResult.name}</div>
                        <div>Rank: {IQResult.rank_country}/{numberOfRows.number_of_rows_country.find(country => country.code === IQResult.code).count} </div>
                        <div>Percentile: {(Number(IQResult.percentile_country) * 100).toFixed(3)}%</div>
                        <div><b>IQ: {(R.qnorm(IQResult.percentile_country, 100, 15)).toFixed(0)}</b></div>
                    </div>

                    <div className="iqs">
                        <h2>Study Level IQ</h2>
                        <div>Study Level: {IQResult.study_level}</div>
                        <div>Rank: {IQResult.rank_stduy_level}/{numberOfRows.number_of_rows_study_level.find(study_level => study_level.study_level === IQResult.study_level).count} </div>
                        <div>Percentile: {(Number(IQResult.percentile_study_level) * 100).toFixed(3)}%</div>
                        <div><b>IQ: {(R.qnorm(IQResult.percentile_study_level, 100, 15)).toFixed(0)}</b></div>
                    </div>

                    <div className="iqs">
                        <h2>Study Area IQ</h2>
                        <div>Study Area: {IQResult.study_area}</div>
                        <div>Rank: {IQResult.rank_study_area}/{numberOfRows.number_of_rows_study_are.find(study_area => study_area.study_area === IQResult.study_area).count} </div>
                        <div>Percentile: {(Number(IQResult.percentile_study_area) * 100).toFixed(3)}%</div>
                        <div><b>IQ: {(R.qnorm(IQResult.percentile_study_area, 100, 15)).toFixed(0)}</b></div>
                    </div>
                </div>
                <AgeCategoryChart fetchedAgeCategoryData={fetchedAgeCategoryData} />
                <StudyLevelChart fetchedStudyLevelData={fetchedStudyLevelData} />
            </div>
        )
    }
}

export default IqTestResultsPage