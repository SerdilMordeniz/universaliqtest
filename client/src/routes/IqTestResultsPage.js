import React, { useEffect, useState } from 'react'
import iqTestAPI from '../apis/iqTestAPI'
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
var R = require("rlab");

function IqTestResultsPage(props) {
    const [IQResult, setIQResult] = useState()
    const [data, setData] = useState()

    let {id} = useParams()

    useEffect(() => {
        const fetchIQResult = async () => {
            try {
                const response = await iqTestAPI.get(`/results/${props.id}`)
                setIQResult(response.data.result)

            } catch (error) {
                console.log(error)
            }
        }
        if(props.id && IQResult === undefined) {
            fetchIQResult()
        }
    })

    useEffect(() => {
        
        const fetchIQResult = async () => {
            try {
                const response = await iqTestAPI.get(`/results/${id}`)
                setIQResult(response.data.result)

            } catch (error) {
                console.log(error)
            }
        }
        if(id) {
            fetchIQResult()
        }
    },[id])

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


    if(IQResult === undefined) {
    return (
        <div>Results Page loading</div>
    )} else {
    return (
        <div className="iq_info">
            <h1 className="mt-5">IQ result of {IQResult.pseudonym}</h1>
            <table className="table table-hover table-bordered m-1 mt-4 mb-4">
                <tbody>
                    <tr>
                        <th width="170px" scope="row">Age category</th>
                        <td>{IQResult.age_category}</td>
                    </tr>
                    <tr className="table-warning">
                        <th scope="row">IQ</th>
                        <td><b>{(R.qnorm(IQResult.percentile_age_category / 100, 100, 15)).toFixed(0)}</b></td>
                    </tr>
                    <tr>
                        <th scope="row">Rank</th>
                        <td>{IQResult.rank_age_category}/{IQResult.number_of_rows_age_category}</td>
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
                        <td>{(Number(IQResult.percentile_age_category)).toFixed(3)}%</td>
                    </tr>
                    <tr>
                        <th scope="row">Z-score</th>
                        <td>{((R.qnorm(IQResult.percentile_age_category / 100, 100, 15) - 100) / 15).toFixed(5)}</td>
                    </tr>
                    <tr>
                        <th scope="row">Rarity</th>
                        <td>≈ 1 in {(Math.round(Math.abs(1 / ((IQResult.percentile_age_category - 100) / 100))))}</td>
                    </tr>
                </tbody>

            </table>

            <h2 className="mt-5 mb-3">Time taken for each item</h2>
            <Chart
                chartType="ColumnChart"
                width="100%"
                height="100%"
                data={data}
                options={{
                    title: "Time taken for each item",
                    hAxis: {
                        title: "Item"
                    },
                    vAxis: {
                        title: "Time (milliseconds)"
                    }
                }}
            />

            <h2 className="mt-5">Worldwide IQ</h2>
            <div>Rank: {IQResult.rank_world_population}/{IQResult.number_of_rows_world_population}</div>
            <div>Percentile: {Number(IQResult.percentile_world_population).toFixed(3)}%</div>
            <div><b>IQ: {(R.qnorm(IQResult.percentile_world_population / 100, 100, 15)).toFixed(0)}</b></div>

            <h2 className="mt-5">Continent IQ</h2>
            <div>Continent code: {IQResult.continent_code}</div>
            <div>Rank: {IQResult.rank_continent}/{IQResult.number_of_rows_continent} </div>
            <div>Percentile: {Number(IQResult.percentile_continent).toFixed(3)} </div>
            <div><b>IQ: {(R.qnorm(IQResult.percentile_continent / 100, 100, 15)).toFixed(0)}</b></div>

            <h2 className="mt-5">Study Level IQ</h2>
            <div>Study Level: {IQResult.study_level}</div>
            <div>Rank: {IQResult.rank_study_level}/{IQResult.number_of_rows_study_level} </div>
            <div>Percentile: {Number(IQResult.percentile_study_level).toFixed(3)} </div>
            <div><b>IQ: {(R.qnorm(IQResult.percentile_study_level / 100, 100, 15)).toFixed(0)}</b></div>

            <h2 className="mt-5">Study Area IQ</h2>
            <div>Study Area: {IQResult.study_area}</div>
            <div>Rank: {IQResult.rank_study_area}/{IQResult.number_of_rows_study_area} </div>
            <div>Percentile: {Number(IQResult.percentile_study_area).toFixed(3)} </div>
            <div><b>IQ: {(R.qnorm(IQResult.percentile_study_area / 100, 100, 15)).toFixed(0)}</b></div>
        </div>
    )}
}

export default IqTestResultsPage