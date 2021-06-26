import React from 'react'
import Chart from "react-google-charts"
import R from 'rlab'
import { useTranslation } from 'react-i18next';

function StudyLevelChart({fetchedStudyLevelData, iq}) {
    const [t] = useTranslation()
    return (
        <div>
            <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        t('home.stat.studyLevelChart.yTitle'),
                        t('home.stat.studyLevelChart.xTitle'),
                        { role: 'style' },
                    ],
                    [t('home.stat.studyLevelChart.annotation1'), fetchedStudyLevelData.find(o => o.study_level ==='No diploma') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='No diploma').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyLevelChart.annotation2'), fetchedStudyLevelData.find(o => o.study_level ==='High School') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='High School').avg, 100, 15).toFixed(0), 10) : null, 'orange'],
                    [t('home.stat.studyLevelChart.annotation3'), fetchedStudyLevelData.find(o => o.study_level ==='2 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='2 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'green'],
                    [t('home.stat.studyLevelChart.annotation4'), fetchedStudyLevelData.find(o => o.study_level ==='3 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='3 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'violet'],
                    [t('home.stat.studyLevelChart.annotation5'), fetchedStudyLevelData.find(o => o.study_level ==='4 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='4 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'red'],
                    [t('home.stat.studyLevelChart.annotation6'), fetchedStudyLevelData.find(o => o.study_level ==='5 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='5 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'pink'],
                    [t('home.stat.studyLevelChart.annotation7'), fetchedStudyLevelData.find(o => o.study_level ==='More Than 5 years graduation') ? parseInt(R.qnorm(fetchedStudyLevelData.find(o => o.study_level ==='More Than 5 years graduation').avg, 100, 15).toFixed(0), 10) : null, 'yellow'],
                    [t('home.stat.studyLevelChart.annotation8'), iq, 'grey']
                ]}
                options={{
                    width: 610,
                    height: 400,
                    legend: { position: 'none' },
                    dataOpacity: 0.2,
                    title: t('home.stat.studyLevelChart.title'),
                    hAxis: {
                        title: t('home.stat.studyLevelChart.xTitle')
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

export default StudyLevelChart
