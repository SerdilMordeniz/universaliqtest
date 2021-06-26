import React, { useEffect, useState } from 'react'
import R from 'rlab'
import iqTestAPI from '../apis/iqTestAPI'
import { useTranslation } from 'react-i18next';

function Sidebar() {
    const { t } = useTranslation();
    const [numberOfTestsTaken, setNumberOfTestsTaken] = useState(0)
    const [last20results, setlast20results] = useState([])
    const [percentileWorld, setPercentileWorld] = useState([])

    function msToTime(s) {
        var ms = s % 1000;
        s = (s - ms) / 1000;
        var secs = (s % 60).toString().padStart(2, "0");
        s = (s - secs) / 60;
        var mins = (s % 60).toString().padStart(2, "0");
        var hrs = ((s - mins) / 60);

        //return hrs + ':' + mins + ':' + secs + '.' + ms;
        return hrs + ':' + mins + ':' + secs;
    }

    useEffect(() => {
        const fetchNumberOfTestsTaken = async () => {
            try {
                const response = await iqTestAPI.get('/number_of_tests_taken')
                setNumberOfTestsTaken(response.data.number_of_tests_taken.count)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNumberOfTestsTaken()
    }, [])

    useEffect(() => {
        const fetchLast20Results = async () => {
            try {
                const response = await iqTestAPI.get('/last_20_results')
                setlast20results(response.data.last_20_results)
            } catch (error) {
                console.log(error)
            }
        }
        fetchLast20Results()
    }, [])

    useEffect(() => {
        if(last20results.length > 0 && numberOfTestsTaken.length > 0) {
            console.log(last20results[0].percent_rank)
            const percentiles = last20results.map((element, index) => {
                if(element.percent_rank === 0) { 
                    return (1 - ((numberOfTestsTaken - 1) / numberOfTestsTaken))
                }
                else if(element.percent_rank === 1) {
                    return (1-(1 / numberOfTestsTaken))
                }
                else {
                    return element.percent_rank
                }
            })
            setPercentileWorld(percentiles)
        }
        // if(last20results && numberOfTestsTaken >0){
        //     if(last20results.percent_rank === 0 ) {
        //         setPercentileWorld(1 - ((numberOfTestsTaken - 1) / numberOfTestsTaken))
        //     }
        //     else if(last20results.percent_rank === 1 ) {
        //         setPercentileWorld(1-(1 / numberOfTestsTaken))
        //     }
        //     else {
        //         setPercentileWorld(last20results.percent_rank) 
        //     }
        // }
    }, [last20results, numberOfTestsTaken])

    return (
            <div className="sidebar_info">
                <div className="summary">
                    <div><b>{numberOfTestsTaken}</b> {t("sidebar.tests")}</div>
                    <div>{t("sidebar.highestIq")}<b> {(R.qnorm((1 - (1 / numberOfTestsTaken)), 100, 15)).toFixed(0)}</b></div>
                    <div>{t("sidebar.lowestIq")}<b> {(R.qnorm((1 - ((numberOfTestsTaken - 1) / numberOfTestsTaken)), 100, 15)).toFixed(0)}</b></div>
                    <div><i>{t("sidebar.averageIq")}<b>100</b></i></div>
                </div>
                <div className="last-20">
                    <h2 className="last20" >{t("sidebar.title")}</h2>
                    {last20results.map((element, index) => {
                        return (
                            <div key={index} className="results" style={{ width: '150px' }}>
                                {/* <Flags.CH title="United States" className="flag" /> */}
                                <img className="flag border border-dark" alt={`${element.name}`} title={element.name} src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${element.code}.svg`} />
                                <div className="testDetails">
                                    <div>{element.pseudonym}</div>
                                    <div>IQ: <b>{(R.qnorm(percentileWorld[index], 100, 15)).toFixed(0)}</b></div>
                                    <div>{element.number_of_correct_answers}/49 in {msToTime(element.total_time_taken)}</div>
                                    <div>{element.to_char}</div>
                                </div>
                            </div>
                        )
                    }
                    )}

                </div>
            </div>

    )
}

export default Sidebar
