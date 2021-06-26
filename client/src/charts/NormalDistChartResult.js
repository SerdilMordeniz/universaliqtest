import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts"
import { useTranslation } from 'react-i18next';

function NormalDistChartResult({ iq, percentileWorld }) {
    const { t, i18n } = useTranslation();

    const [dataSample, setDataSample] = useState([])

    function NormalDensityZx(x, Mean, StdDev) {
        var a = x - Mean;
        return (Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev))*100;
    }


    useEffect(() => {
        const calculateDataPoints = () => {
            let index = 0;
            let chartData = new Array([])
            for (let i=40; i<=iq; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'lightblue'
                chartData[index][4] = null
                index ++
            }
            if(chartData.length>40) {
                chartData[Math.round((parseInt(iq)+40)/2)-40][4] = `${t('result.normalDistChart.annotation')}: ${(percentileWorld*100).toFixed(3)}%`
            }
            chartData.unshift([t('result.normalDistChart.yAxis'), t('result.normalDistChart.xAxis'), t('result.normalDistChart.xAxis'), { role: 'style' }, {role:'annotation'}])
            return chartData;
        }
        if(iq) {
            setDataSample(calculateDataPoints())
        }
        
    }, [iq, percentileWorld, i18n.language, t])

    if(iq) {
        return (
            <div>
                <Chart
                className="normChart"
                    height= '550px'
                    width= '500px'
                    chartType="ComboChart"
                    loader={<div>Loading Chart</div>}
                    data={dataSample}
                    formatters={[
                        {
                            type: 'NumberFormat',
                            column: 1,
                            options: {
                                suffix: '%',
                                negativeColor: 'red',
                                negativeParens: true,
                                fractionDigits: 15,
                            },
                            
                        },
                        {
                            type: 'NumberFormat',
                            column: 2,
                            options: {
                                suffix: '%',
                                negativeColor: 'red',
                                negativeParens: true,
                            },
                            
                        },
                    ]}
                    options={{
                        hAxis: {
                            title: t('result.normalDistChart.yAxis'),
                            ticks: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160]
                        },
                        vAxis: {
                            title: t('result.normalDistChart.xAxis'),
                        },
                        seriesType: 'line',
                        series: { 
                            0: {color: 'blue'},
                            1: { type: 'bars', color: 'black' },
                        },
                        // chartArea: { left: 20, top: 0, width: '80%', height: '80%' },
                        lineWidth: 5,
                        dataOpacity: 0.1,
                        annotations: {
                            highContrast: false,
                            textStyle: {
                                color: 'black',
                                fontSize: 16
                            },
                        },
                        title: t('result.normalDistChart.title'),
                        titleTextStyle: {
                            fontSize: 14
                        },
                        legend: 'none'
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        )
    } else {
        return (
            <div>Chart is loading...</div>
        )
    } 

}

export default NormalDistChartResult
