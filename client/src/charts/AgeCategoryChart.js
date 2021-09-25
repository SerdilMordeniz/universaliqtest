import React, { useState, useEffect } from 'react'
import Chart from "react-google-charts"
import R from 'rlab'
import { useTranslation } from 'react-i18next';

function AgeCategoryChart({ fetchedAgeCategoryData, iq }) {
    const [t] = useTranslation()
    const [percentileYouth, setPercentileYouth] = useState(null)
    const [percentileYoungAdult, setPercentileYoungAdult] = useState(null)
    const [percentileAdult, setPercentileAdult] = useState(null)
    const [percentileSenior, setPercentileSenior] = useState(null)

    const [iqYouth, setIqYouth] = useState(null)
    const [iqYoungAdult, setIqYoungAdult] = useState(null)
    const [iqAdult, setIqAdult] = useState(null)
    const [iqSenior, setIqSenior] = useState(null)

    useEffect(() => {
        let percentileYouthtmp;
        let percentileYoungAdulttmp
        let percentileAdulttmp
        let percentileSeniortmp
        if (fetchedAgeCategoryData) {
            percentileYouthtmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Youth'))
            if (percentileYouthtmp) {
                percentileYouthtmp = percentileYouthtmp.avg
            }
            percentileYoungAdulttmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Young Adult'))
            if (percentileYoungAdulttmp) {
                percentileYoungAdulttmp = percentileYoungAdulttmp.avg
            }
            percentileAdulttmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Adult'))
            if (percentileAdulttmp) {
                percentileAdulttmp = percentileAdulttmp.avg
            }
            percentileSeniortmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Senior'))
            if (percentileSeniortmp) {
                percentileSeniortmp = percentileSeniortmp.avg
            }
        }
        setPercentileYouth(percentileYouthtmp)
        setPercentileYoungAdult(percentileYoungAdulttmp)
        setPercentileAdult(percentileAdulttmp)
        setPercentileSenior(percentileSeniortmp)

        if (percentileYouth) {
            const iqYouthtmp = parseInt(R.qnorm(percentileYouth, 100, 15), 10).toFixed(0)
            setIqYouth(iqYouthtmp)
        }
        if (percentileYoungAdult) {
            const iqYoungAdulttmp = parseInt(R.qnorm(percentileYoungAdult, 100, 15), 10).toFixed(0)
            setIqYoungAdult(iqYoungAdulttmp)
        }
        if (percentileAdult) {
            const iqAdulttmp = parseInt(R.qnorm(percentileAdult, 100, 15), 10).toFixed(0)
            setIqAdult(iqAdulttmp)
        }
        if (percentileSenior) {
            const iqSeniortmp = parseInt(R.qnorm(percentileSenior, 100, 15), 10).toFixed(0)
            setIqSenior(iqSeniortmp)
        }

    }, [fetchedAgeCategoryData, percentileAdult, percentileSenior, percentileYouth, percentileYoungAdult])

    return (
        <div>
            <h3 className="charth3">{t('home.stat.ageCategoryChart.title')}</h3>
            {fetchedAgeCategoryData &&
                <Chart
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            t('home.stat.ageCategoryChart.yTitle'),
                            t('home.stat.ageCategoryChart.xTitle'),
                            { role: 'style' },
                        ],
                        [t('home.stat.ageCategoryChart.annotation1'), parseInt(iqYouth), 'blue'],
                        [t('home.stat.ageCategoryChart.annotation2'), parseInt(iqYoungAdult), 'orange'],
                        [t('home.stat.ageCategoryChart.annotation3'), parseInt(iqAdult), 'green'],
                        [t('home.stat.ageCategoryChart.annotation4'), parseInt(iqSenior), 'violet'],
                        [t('home.stat.ageCategoryChart.annotation5'), iq, 'grey']
                    ]}
                    options={{
                        width: 510,
                        height: 400,
                        legend: { position: 'none' },
                        dataOpacity: 0.2,
                        titleTextStyle: {
                            fontSize: 14
                        }
                    }}
                    // For tests
                    rootProps={{ 'data-testid': '6' }}
                />
            }
            <div className="chartXaxis">{t('home.stat.ageCategoryChart.xTitle')}</div>
        </div>
    )
}

export default AgeCategoryChart
