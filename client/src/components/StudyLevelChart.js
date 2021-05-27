import React from 'react'
import Chart from "react-google-charts"
import R from 'rlab'

function StudyLevelChart({fetchedStudyLevelData}) {
    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Study Level',
                        'IQ',
                        { role: 'style' },
                    ],
                    ['No Diploma', fetchedStudyLevelData.find(o => o.study_level ==='No diploma') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='No diploma').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    ['High School', fetchedStudyLevelData.find(o => o.study_level ==='High School') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='High School').avg, 100, 15).toFixed(0), 10) : null, 'orange'],
                    ['2 years graduation', fetchedStudyLevelData.find(o => o.study_level ==='2 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='2 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'green'],
                    ['3 years graduation', fetchedStudyLevelData.find(o => o.study_level ==='3 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='3 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'violet'],
                    ['4 years graduation', fetchedStudyLevelData.find(o => o.study_level ==='4 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='4 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'red'],
                    ['5 years graduation', fetchedStudyLevelData.find(o => o.study_level ==='5 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='5 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'pink'],
                    ['More than 5 years graduation', fetchedStudyLevelData.find(o => o.study_level ==='More Than 5 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='More Than 5 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'yellow'],
                    ['You', null, 'grey']
                ]}
                options={{
                    width: 510,
                    height: 400,
                    legend: { position: 'none' },
                    dataOpacity: 0.2,
                    title: 'General breakdown according to study level',
                    hAxis: {
                        title: 'IQ'
                    }
                }}
                // For tests
                rootProps={{ 'data-testid': '6' }}
            />
        </div>
    )
}

export default StudyLevelChart
