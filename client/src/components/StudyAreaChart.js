import React from 'react'
import Chart from "react-google-charts"
import R from 'rlab'

function StudyAreaChart({fetchedStudyAreaData, iq}) {
    return (
        <div>
            <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Study Area',
                        'Average IQ',
                        { role: 'style' },
                    ],
                    ['No diploma', fetchedStudyAreaData.find(o => o.study_area === 'No diploma') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'No diploma').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Performing Arts', fetchedStudyAreaData.find(o => o.study_area === 'Performing arts') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Performing arts').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Visual Arts', fetchedStudyAreaData.find(o => o.study_area === 'Visual arts') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Visual arts').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['History', fetchedStudyAreaData.find(o => o.study_area === 'History') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'History').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Languages', fetchedStudyAreaData.find(o => o.study_area === 'Languages and literature') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Languages and literature').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Law', fetchedStudyAreaData.find(o => o.study_area === 'Law') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Law').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Philosophy', fetchedStudyAreaData.find(o => o.study_area === 'Philosophy') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Philosophy').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Theology', fetchedStudyAreaData.find(o => o.study_area === 'Theology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Theology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Anthropology', fetchedStudyAreaData.find(o => o.study_area === 'Anthropology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Anthropology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Economics', fetchedStudyAreaData.find(o => o.study_area === 'Economics') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Economics').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Geography', fetchedStudyAreaData.find(o => o.study_area === 'Geography') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Geography').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Political Science', fetchedStudyAreaData.find(o => o.study_area === 'Political science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Political science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Psychology', fetchedStudyAreaData.find(o => o.study_area === 'Psychology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Psychology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Sociology', fetchedStudyAreaData.find(o => o.study_area === 'Sociology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Sociology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Social Work', fetchedStudyAreaData.find(o => o.study_area === 'Social Work') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Social Work').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Biology', fetchedStudyAreaData.find(o => o.study_area === 'Biology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Biology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Chemistry', fetchedStudyAreaData.find(o => o.study_area === 'Chemistry') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Chemistry').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Earth Science', fetchedStudyAreaData.find(o => o.study_area === 'Earth science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Earth science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Space Sciences', fetchedStudyAreaData.find(o => o.study_area === 'Space sciences') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Space sciences').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Computer Science', fetchedStudyAreaData.find(o => o.study_area === 'Computer Science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Computer Science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Mathematics', fetchedStudyAreaData.find(o => o.study_area === 'Mathematics') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Mathematics').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Business', fetchedStudyAreaData.find(o => o.study_area === 'Business') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Business').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Engineering', fetchedStudyAreaData.find(o => o.study_area === 'Engineering and technology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Engineering and technology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['Medicine', fetchedStudyAreaData.find(o => o.study_area === 'Medicine and health') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area === 'Medicine and health').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['You', parseInt(iq), 'grey']

                ]}
                options={{
                    width: 500,
                    height: 500,
                    legend: { position: 'none' },
                    chartArea:{left:100,top:50,bottom:110},
                    dataOpacity: 0.2,
                    title: 'General breakdown according to study area',
                    hAxis: {
                        title: 'IQ',
                        format: '0',
                    },
                    vAxis: {
                        textStyle: {
                            color: 'black',
                            fontSize: 12
                        }
                    },
                    titleTextStyle: {
                        fontSize: 14
                    }
                }}
                // For tests
                rootProps={{ 'data-testid': '6' }}
            />
        </div>
    )
}

export default StudyAreaChart
