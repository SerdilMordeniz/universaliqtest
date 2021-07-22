import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts"
import R from 'rlab'
import { useTranslation } from 'react-i18next';

function NormalDistChart() {

    const [t] = useTranslation()

    const [dataSample, setDataSample] = useState([])

    function NormalDensityZx(x, Mean, StdDev) {
        var a = x - Mean;
        return (Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev))*100;
    }

    useEffect(() => {
        const calculateDataPoints = () => {
            let index = 0;
            let chartData = new Array([])
            for (let i=50; i<70; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'red'
                chartData[index][4] = null
                index ++
            }
            for (let i=70; i<90; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'orange'
                chartData[index][4] = null
                index ++
            }
            for (let i=90; i<111; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'green'
                chartData[index][4] = null
                index ++
            }
            for (let i=111; i<131; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'orange'
                chartData[index][4] = null
                index ++
            }
            for (let i=131; i<151; i+=1) {
                chartData[index] = new Array(2)
                chartData[index][0] = i
                chartData[index][1] = NormalDensityZx(i, 100, 15)
                chartData[index][2] = NormalDensityZx(i, 100, 15)
                chartData[index][3] = 'red'
                chartData[index][4] = null
                index ++
            }
            chartData[10][4] = t('home.stat.normalDistChart.annotation1')
            chartData[30][4] = t('home.stat.normalDistChart.annotation2')
            chartData[50][4] = t('home.stat.normalDistChart.annotation3')
            chartData[70][4] = t('home.stat.normalDistChart.annotation2')
            chartData[90][4] = t('home.stat.normalDistChart.annotation1')
            chartData.unshift([t('home.stat.normalDistChart.xTitle'), t('home.stat.normalDistChart.yTitle'), t('home.stat.normalDistChart.yTitle'), { role: 'style' }, {role:'annotation'}])
            return chartData;
        }
        setDataSample(calculateDataPoints())
        let index = 0;
        let chartData = []
        for (let i = 70; i < 90; i += 1) {
            chartData[index] = R.dnorm(i, 100, 15)
            index++;
        }
    }, [t])

    return (
        <div className="normalDistChartHome">
            <h3>{t('home.stat.normalDistChart.title')}</h3>
            <Chart
            className="normChart"
            charset = "utf8"
                chartLanguage='russian'
                height= '400px'
                width= '800px'
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
                        ticks: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
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
                            fontSize: 12
                        }
                    },
                    titleTextStyle: {
                        fontSize: 14
                    }
                }}
                rootProps={{ 'data-testid': '1' }}
            />
            <div className="normalDistChartYAxis">{t('home.stat.normalDistChart.yTitle')}</div>
            <div className="normalDistChartXAxis">{t('home.stat.normalDistChart.xTitle')}</div>
        </div>
    )
}

export default NormalDistChart
