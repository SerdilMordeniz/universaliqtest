import React, { useState, useEffect } from 'react'
import Chart from "react-google-charts"
import R from 'rlab'

function AgeCategoryChart({ fetchedAgeCategoryData }) {
    const [percentileYouth, setPercentileYouth] = useState(null)
    const [percentileYoungAdult, setPercentileYoungAdult] = useState(null)
    const [percentileAdult, setPercentileAdult] = useState(null)
    const [percentileSenior, setPercentileSenior] = useState(null)

    const [iqYouth, setIqYouth] = useState(null)
    const [iqYoungAdult, setIqYoungAdult] = useState(null)
    const [iqAdult, setIqAdult] = useState(null)
    const [iqSenior, setIqSenior] = useState(null)

    useEffect(() => {
        let percentileYouthtmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Youth'))
        if(percentileYouthtmp) {
            percentileYouthtmp = percentileYouthtmp.avg
        }
        let percentileYoungAdulttmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Young Adult'))
        if(percentileYoungAdulttmp) {
            percentileYoungAdulttmp = percentileYoungAdulttmp.avg
        }
        let percentileAdulttmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Adult'))
        if(percentileAdulttmp) {
            percentileAdulttmp = percentileAdulttmp.avg
        }
        let percentileSeniortmp = (fetchedAgeCategoryData.find(o => o.age_category === 'Senior'))
        if(percentileSeniortmp) {
            percentileSeniortmp = percentileSeniortmp.avg
        }
        setPercentileYouth(percentileYouthtmp)
        setPercentileYoungAdult(percentileYoungAdulttmp)
        setPercentileAdult(percentileAdulttmp)
        setPercentileSenior(percentileSeniortmp)

        if(percentileYouth) {
            const iqYouthtmp = parseInt(R.qnorm(percentileYouth, 100, 15), 10).toFixed(0)
            setIqYouth(iqYouthtmp)
        }
        if(percentileYoungAdult) {
            const iqYoungAdulttmp = parseInt(R.qnorm(percentileYoungAdult, 100, 15), 10).toFixed(0)
            setIqYoungAdult(iqYoungAdulttmp)
        }
        if(percentileAdult) {
            const iqAdulttmp = parseInt(R.qnorm(percentileAdult, 100, 15), 10).toFixed(0)
            setIqAdult(iqAdulttmp)
        }
        if(percentileSenior) {
            const iqSeniortmp = parseInt(R.qnorm(percentileSenior, 100, 15), 10).toFixed(0)
            setIqSenior(iqSeniortmp)
        }

    }, [fetchedAgeCategoryData, percentileAdult, percentileSenior, percentileYouth, percentileYoungAdult])

    return (
        <div>
            <Chart
                width={'500px'}
                height={'300px'}
                chartType="BarChart"
                loader={<div>Loading Chart</div>}
                data={[
                    [
                        'Age Category',
                        'Average IQ',
                        { role: 'style' },
                    ],
                    ['Youth (12-18)', parseInt(iqYouth), 'blue'],
                    ['Young Adult (19-35)', parseInt(iqYoungAdult), 'orange'],
                    ['Adult (36-65)', parseInt(iqAdult), 'green'],
                    ['Senior (66-100)', parseInt(iqSenior), 'violet'],
                    ['You', null, 'grey']
                ]}
                options={{
                    width: 510,
                    height: 400,
                    legend: { position: 'none' },
                    dataOpacity: 0.2,
                    title: 'General breakdown according to age category',
                    hAxis: { 
                        title: 'IQ',
                        
                    }
                }}
                // For tests
                rootProps={{ 'data-testid': '6' }}
            />
        </div>
    )
}

export default AgeCategoryChart
