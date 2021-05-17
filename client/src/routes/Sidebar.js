import React, { useEffect, useState } from 'react'
import R from 'rlab'
import iqTestAPI from '../apis/iqTestAPI'

function Sidebar() {
    const [numberOfTestsTaken, setNumberOfTestsTaken] = useState(0)
    const [last20results, setlast20results] = useState([])

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

    return (
            <div className="sidebar_info">
                <div className="summary">
                    <div><b>{numberOfTestsTaken}</b> tests</div>
                    <div>highest IQ :<b> {(R.qnorm((1 - (1 / numberOfTestsTaken)), 100, 15)).toFixed(0)}</b></div>
                    <div>lowest IQ :<b> {(R.qnorm((1 - ((numberOfTestsTaken - 1) / numberOfTestsTaken)), 100, 15)).toFixed(0)}</b></div>
                    <div><i>average IQ : <b>100</b></i></div>
                </div>
                <div className="last-20">
                    <h2 className="last20" >The last 20 results</h2>
                    {last20results.map((element, index) => {
                        return (
                            <div key={index} className="results" style={{ width: '150px' }}>
                                {/* <Flags.CH title="United States" className="flag" /> */}
                                <img className="flag border border-dark" alt="United States" src={`http://purecatamphetamine.github.io/country-flag-icons/1x1/${element.code}.svg`} />
                                <div className="testDetails">
                                    <div>{element.pseudonym}</div>
                                    <div>IQ: <b>{(R.qnorm(element.percentile_age_category / 100, 100, 15)).toFixed(0)}</b></div>
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
