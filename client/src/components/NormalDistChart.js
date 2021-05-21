import React, { useEffect, useState } from 'react'
import Chart from "react-google-charts"
import R from 'rlab'

function NormalDistChart() {

    const [dataSample, setDataSample] = useState([])

    function NormalDensityZx(x, Mean, StdDev) {
        var a = x - Mean;
        return (Math.exp(-(a * a) / (2 * StdDev * StdDev)) / (Math.sqrt(2 * Math.PI) * StdDev))*100;
    }

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
        chartData[10][4] = '1.74% of the population (red)'
        chartData[30][4] = '22.1% of the population (orange)'
        chartData[50][4] = '51.6% of the population (green)'
        chartData[70][4] = '22.1% of the population (orange)'
        chartData[90][4] = '1.74% of the population (red)'
        chartData.unshift(['IQ', 'Frequency', 'Frequency', { role: 'style' }, {role:'annotation'}])
        return chartData;
    }

    useEffect(() => {
        setDataSample(calculateDataPoints())
        let index = 0;
        let chartData = []
        for (let i = 70; i < 90; i += 1) {
            chartData[index] = R.dnorm(i, 100, 15)
            index++;
        }
        // eslint-disable-next-line
    }, [])

    return (
        <div>
            <Chart
            className="normChart"
                height= '400px'
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
                        title: 'IQ',
                        ticks: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150]
                    },
                    vAxis: {
                        title: 'Frequency',
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
                    title:'Worldwide IQ distribution'
                }}
                rootProps={{ 'data-testid': '1' }}
            />
        </div>
    )
}

export default NormalDistChart
