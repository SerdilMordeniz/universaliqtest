import React, { useEffect, useState } from 'react'
import iqTestAPI from '../apis/iqTestAPI'
import Chart from "react-google-charts";
import { useParams } from "react-router-dom";
import AgeCategoryChart from '../charts/AgeCategoryChart'
import StudyLevelChart from '../charts/StudyLevelChart'
import NormalDistChartResult from '../charts/NormalDistChartResult'
import StudyAreaChart from '../charts/StudyAreaChart'
import { useTranslation, Trans } from 'react-i18next';
import categoryNamesEN from '../locales/en/categoryNames.json'
import categoryNamesDE from '../locales/de/categoryNames.json'
var R = require("rlab");

function IqTestResultsPage() {
    const { t, i18n } = useTranslation();
    const [IQResult, setIQResult] = useState()
    const [numberOfRows, setNumberOfRows] = useState()
    const [data, setData] = useState()
    const [percentileWorld, setPercentileWorld] = useState()
    const [percentileAge, setPercentileAge] = useState()

    const [fetchedAgeCategoryData, setFetchedAgeCategoryData] = useState(null)
    const [fetchedStudyLevelData, setFetchedStudyLevelData] = useState(null)
    const [fetchedStudyAreaData, setFetchedStudyAreaData] = useState(null)

    const [textIq, setTextIq] = useState(null)

    const [textPercentileWorld1, setTextPercentileWorld1] = useState(null)
    const [textPercentileWorld2, setTextPercentileWorld2] = useState(null)
    const [textRankWorld, setTextRankWorld] = useState(null)
    const [textNumberOfRowsWorld, seTextNumberOfRowsWorld] = useState(null)

    const [studyArea, setStudyArea] = useState(null)
    const [studyArea1, setStudyArea1] = useState(null)
    const [textPercentileStudyArea1, setTextPercentileStudyArea1] = useState(null)
    const [textPercentileStudyArea2, setTextPercentileStudyArea2] = useState(null)
    const [textRankStudyArea, setTextRankStudyArea] = useState(null)
    const [textNumberOfRowsStudyArea, setNumberOfRowsStudyArea] = useState(null)

    const [ageCategory, setAgeCategory] = useState(null)
    const [ageCategory1, setAgeCategory1] = useState(null)
    const [textPercentileAgeCategory1, setTextPercentileAgeCategory1] = useState(null)
    const [textPercentileAgeCategory2, setTextPercentileAgeCategory2] = useState(null)
    const [textRankAgeCategory, setTextRankAgeCategory] = useState(null)
    const [textNumberOfRowsAgeCategory, setNumberOfRowsAgeCategory] = useState(null)

    const [studyLevel, setStudyLevel] = useState(null)
    const [studyLevel1, setStudyLevel1] = useState(null)
    const [textPercentileStudyLevel1, setTextPercentileStudyLevel1] = useState(null)
    const [textPercentileStudyLevel2, setTextPercentileStudyLevel2] = useState(null)
    const [textRankStudyLevel, setTextRankStudyLevel] = useState(null)
    const [textNumberOfRowsStudyLevel, setNumberOfRowsStudyLevel] = useState(null)

    let { id } = useParams()

    useEffect(() => {
        if (studyArea && ageCategory && studyLevel) {
            if (i18n.language === 'en') {
                let foundStudyArea = categoryNamesEN.studyArea
                foundStudyArea = Object.values(foundStudyArea)
                foundStudyArea = foundStudyArea.find(area => area.toLowerCase() === studyArea.toLowerCase())
                setStudyArea1(foundStudyArea)

            } else if (i18n.language === 'de') {
                let foundStudyArea = categoryNamesEN.studyArea
                let foundkeyStudyArea = Object.keys(foundStudyArea)
                foundkeyStudyArea = foundkeyStudyArea.find(key => key.toLowerCase() === studyArea.toLowerCase())
                let foundStudyAreaDE = categoryNamesDE.studyArea[foundkeyStudyArea]
                setStudyArea1(foundStudyAreaDE)

                let foundAgeCategory = categoryNamesEN.ageCategory
                let foundKeyAgeCategory = Object.keys(foundAgeCategory)
                foundKeyAgeCategory = foundKeyAgeCategory.find(key => key.toLowerCase() === ageCategory.toLowerCase())
                let foundAgeCategoryDE = categoryNamesDE.ageCategory[foundKeyAgeCategory]
                setAgeCategory1(foundAgeCategoryDE)

                let foundStudyLevel = categoryNamesEN.studyLevel
                let foundKeyStudyLevel = Object.keys(foundStudyLevel)
                foundKeyStudyLevel = foundKeyStudyLevel.find(key => key.toLowerCase() === studyLevel.toLowerCase())
                let foundStudyLevelDE = categoryNamesDE.studyLevel[foundKeyStudyLevel]
                setStudyLevel1(foundStudyLevelDE)
            }
        }
    }, [i18n.language, studyArea, ageCategory, studyLevel])

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

    //fetch study area data
    useEffect(() => {
        const fetchAgeCategoryChart = async () => {
            try {
                const response = await iqTestAPI.get('/study_area_chart')
                setFetchedStudyAreaData(response.data.result)
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

    useEffect(() => {
        if (IQResult && numberOfRows) {
            if (IQResult.percentile_world_population === 0) {
                setPercentileWorld(Math.abs((IQResult.rank_world_population - 1) / (IQResult.rank_world_population) - 1))
            }
            else if (IQResult.percentile_world_population === 1) {
                setPercentileWorld(Math.abs((IQResult.rank_world_population) / (numberOfRows.number_of_rows_world_population.count) - 1))
            }
            else {
                setPercentileWorld(IQResult.percentile_world_population)
            }
        }
    }, [IQResult, numberOfRows])

    useEffect(() => {
        if (IQResult && numberOfRows) {
            if (IQResult.percentile_age_category === 0) {
                let percentileAgeCategory = Math.abs((IQResult.rank_age_category - 1) / (IQResult.rank_age_category) - 1)
                setPercentileAge(percentileAgeCategory)
            }
            else if (IQResult.percentile_age_category === 1) {
                let percentileAgeCategory = Math.abs((IQResult.rank_age_category) / (numberOfRows.number_of_rows_age_category.find(ageCategory => ageCategory.age_category === IQResult.age_category).count) - 1)
                setPercentileAge(percentileAgeCategory)
            }
            else {
                setPercentileAge(IQResult.percentile_age_category)
            }
        }
    }, [IQResult, numberOfRows])

    useEffect(() => {
        if (IQResult && numberOfRows) {
            setTextIq((R.qnorm(percentileWorld, 100, 15)).toFixed(0))
            setTextPercentileWorld1(((1 - IQResult.percentile_world_population) * 100).toFixed(0))
            setTextPercentileWorld2((IQResult.percentile_world_population * 100).toFixed(0))
            setTextRankWorld(IQResult.rank_world_population)
            seTextNumberOfRowsWorld(numberOfRows.number_of_rows_world_population.count)

            setStudyArea(IQResult.study_area)
            setTextPercentileStudyArea1(((1 - IQResult.percentile_study_area) * 100).toFixed(0))
            setTextPercentileStudyArea2((IQResult.percentile_study_area * 100).toFixed(0))
            setTextRankStudyArea(IQResult.rank_study_area)
            setNumberOfRowsStudyArea(numberOfRows.number_of_rows_study_are.find(study_area => study_area.study_area === IQResult.study_area).count)

            setAgeCategory(IQResult.age_category)
            setTextPercentileAgeCategory1(((1 - IQResult.percentile_age_category) * 100).toFixed(0))
            setTextPercentileAgeCategory2((IQResult.percentile_age_category * 100).toFixed(0))
            setTextRankAgeCategory(IQResult.rank_age_category)
            setNumberOfRowsAgeCategory(numberOfRows.number_of_rows_age_category.find(ageCategory => ageCategory.age_category === IQResult.age_category).count)

            setStudyLevel(IQResult.study_level)
            setTextPercentileStudyLevel1(((1 - IQResult.percentile_study_level) * 100).toFixed(0))
            setTextPercentileStudyLevel2((IQResult.percentile_study_level * 100).toFixed(0))
            setTextRankStudyLevel(IQResult.rank_stduy_level)
            setNumberOfRowsStudyLevel(numberOfRows.number_of_rows_study_level.find(studyLevel => studyLevel.study_level === IQResult.study_level).count)
        }
    }, [IQResult, numberOfRows, percentileWorld])

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
                [t('result.totalTimeTakenChart.element'), t('result.totalTimeTakenChart.time')],
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
            ];
            setData(dataElements)
        }
    }, [IQResult, i18n.language, t])


    if (IQResult === undefined || numberOfRows === undefined) {
        return (
            <div>Results Page loading</div>
        )
    } else {
        return (
            <div className="iq_info">
                <div className="inline">
                    <div className="table_result">
                        <h1>{t('result.title')} {IQResult.pseudonym} <img className="diamond" alt="Diamond approved" src="/diamond.svg" /></h1>
                        <p className="result_paragraph">{t('result.congratulatons')} {IQResult.pseudonym}! <br /><br />
                            <Trans i18nKey="result.introduction">
                                The IQ test you took is a development of the Raven concept of progressive matrices. It measures the domain of general intelligence: it evaluates logic, the ability to reason clearly and grasp complexity, and the ability to retain and reproduce patterns of information, sometimes called reproductive capacity.
                                Note that the average standard IQ is set at 100 for historical reasons. The test you passed was designed to have an average score of 100. This allows each candidate to compare their result with statistics and various parameters.
                                <br /><br />Based on the results of the completed test, <b>your IQ score is {{ textIq }}.</b>
                                This IQ value is an estimate. Your result may change depending on your current form and the conditions under which you take the test.
                                Below you can see more details about your result. In addition, there are also some statistics in which you can compare yourself.
                            </Trans>
                        </p>
                        <p className="changingParagraph">
                            <b>
                                {t('result.bold')}
                            </b>
                        </p>
                        <div className="tableResult">
                            <table className="table table-hover table-bordered m-1 mt-4 mb-4">
                                <tbody>
                                    <tr className="table-warning">
                                        <th scope="row">{t('result.iqWorld')}</th>
                                        <td><b>{(R.qnorm(percentileWorld, 100, 15)).toFixed(0)}</b></td>
                                    </tr>
                                    <tr className="table-warning">
                                        <th scope="row">{t('result.iqAge')}</th>
                                        <td><b>{(R.qnorm(percentileAge, 100, 15)).toFixed(0)}</b></td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.rank')}</th>
                                        <td>{IQResult.rank_world_population}/{numberOfRows.number_of_rows_world_population.count}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.correct')}</th>
                                        <td>{IQResult.number_of_correct_answers}/49</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.totalTime')}</th>
                                        <td>{msToTime(IQResult.total_time_taken)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.percentile')}</th>
                                        <td>{(Number(IQResult.percentile_world_population) * 100).toFixed(3)}%</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.zscore')}</th>
                                        <td>{((R.qnorm(percentileWorld, 100, 15) - 100) / 15).toFixed(5)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{t('result.rarity')}</th>
                                        <td>≈ 1 in {(Math.round(Math.abs(1 / ((IQResult.percentile_world_population - 1)))))}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div className="timeTakenChart">
                        <Chart
                            chartType="ColumnChart"
                            width="600px"
                            height="500px"
                            data={data}
                            options={{
                                title: t('result.totalTimeTakenChart.title'),
                                hAxis: {
                                    title: t('result.totalTimeTakenChart.item'),
                                },
                                vAxis: {
                                    title: t('result.totalTimeTakenChart.time'),

                                },
                                titleTextStyle: {
                                    fontSize: 14
                                },
                                legend: 'none'
                            }}
                        />
                    </div>
                </div>
                <h2 className="h2-result">{t('result.title2')}</h2>
                <div className="resultChart">
                    <div className="googleChart">
                        <div className="normalChart">
                            <NormalDistChartResult iq={(R.qnorm(percentileWorld, 100, 15)).toFixed(0)} percentileWorld={percentileWorld} />
                            <Trans i18nKey="result.worldWideIqDescription">
                                <p>
                                    You are among the <b>{{ textPercentileWorld1 }}%</b> smartest people in the world. You are smarter than <b>{{ textPercentileWorld2 }}%</b> of the people in the world.
                                    Your rank among everyone who took this test is <b>{{ textRankWorld }}/{{ textNumberOfRowsWorld }}</b>.
                                </p>
                            </Trans>
                        </div>
                    </div>
                    <div className="googleChart">
                        <div className="studyAreaChart">
                            <StudyAreaChart fetchedStudyAreaData={fetchedStudyAreaData} iq={(R.qnorm(percentileWorld, 100, 15)).toFixed(0)} />
                            <Trans i18nKey="result.studyAreaDescription">
                                <p>
                                    You are among the <b>{{ textPercentileStudyArea1 }}%</b> smartest people in your study area ({{ studyArea1 }}). You are smarter than <b>{{ textPercentileStudyArea2 }}%</b> of the people in your study area.
                                    Your rank in your study area is <b>{{ textRankStudyArea }}/{{ textNumberOfRowsStudyArea }}</b>.
                                </p>
                            </Trans>
                        </div>
                    </div>
                    <div className="googleChart">
                        <div className="ageChart">
                            <AgeCategoryChart fetchedAgeCategoryData={fetchedAgeCategoryData} iq={(R.qnorm(percentileWorld, 100, 15)).toFixed(0)} />
                            <Trans i18nKey="result.ageCategoryDescription">
                                <p className="infoAge">
                                    You are among the <b>{{ textPercentileAgeCategory1 }}%</b> smartest people in your age category ({{ ageCategory1 }}). You are smarter than <b>{{ textPercentileAgeCategory2 }}%</b> of people in your age category.
                                    Your rank in your age category is <b>{{ textRankAgeCategory }}/{{ textNumberOfRowsAgeCategory }}</b>.
                                </p>
                            </Trans>
                        </div>
                    </div>
                    <div className="googleChart">
                        <div className="studyLevelChart">
                            <StudyLevelChart fetchedStudyLevelData={fetchedStudyLevelData} iq={(R.qnorm(percentileWorld, 100, 15)).toFixed(0)} />
                            <Trans i18nKey="result.studyLevelDescription">
                                <p className="infostudyLevel">
                                    You are among the <b>{{ textPercentileStudyLevel1 }}%</b> smartest people in your study level ({{ studyLevel1 }}). You are smarter than <b>{{ textPercentileStudyLevel2 }}%</b> of people of your study level.
                                    Your rank in your study level is <b>{{ textRankStudyLevel }}/{{ textNumberOfRowsStudyLevel }}</b>.
                                </p>
                            </Trans>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default IqTestResultsPage