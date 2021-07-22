import React from 'react'
import Chart from "react-google-charts"
import R from 'rlab'
import { useTranslation } from 'react-i18next';

function StudyAreaChart({fetchedStudyAreaData, iq}) {
    const [t] = useTranslation()
    return (
        <div>
            <h3 className="studyAreaCharth3">{t('home.stat.studyAreaChart.title')}</h3>
            <Chart
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        t('home.stat.studyAreaChart.yTitle'),
                        t('home.stat.studyAreaChart.xTitle'),
                        { role: 'style' },
                    ],
                    [t('home.stat.studyAreaChart.annotation1'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'no diploma') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'no diploma').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation2'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'performing arts') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'performing arts').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation3'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'visual arts') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'visual arts').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation4'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'history') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'history').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation5'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'languages and literature') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'languages and literature').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation6'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'law') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'law').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation7'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'philosophy') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'philosophy').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation8'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'theology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'theology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation9'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'anthropology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'anthropology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation10'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'economics') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'economics').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation11'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'geography') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'geography').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation12'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'political science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'political science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation13'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'psychology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'psychology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation14'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'sociology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'sociology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation15'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'social work') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'social work').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation16'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'biology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'biology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation17'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'chemistry') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'chemistry').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation18'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'earth science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'earth science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation19'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'space sciences') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'space sciences').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation20'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'computer science') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'computer science').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation21'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'mathematics') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'mathematics').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation22'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'business') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'business').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation23'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'engineering and technology') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'engineering and technology').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation24'), fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'medicine and health') ? parseInt(R.qnorm(fetchedStudyAreaData.find(o => o.study_area.toLowerCase() === 'medicine and health').avg, 100, 15).toFixed(0), 10) : null, 'blue'],
                    [t('home.stat.studyAreaChart.annotation25'), parseInt(iq), 'grey']

                ]}
                options={{
                    width: 500,
                    height: 500,
                    legend: { position: 'none' },
                    dataOpacity: 0.2,
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
            <div className="chartXaxis">{t('home.stat.studyAreaChart.xTitle')}</div>
        </div>
    )
}

export default StudyAreaChart
