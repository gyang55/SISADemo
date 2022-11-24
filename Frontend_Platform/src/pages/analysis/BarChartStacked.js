import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
//import { Chart as ChartJS } from 'chart.js/auto' // this import is important
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarController, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarController, BarElement);

const BarChartStackedAnalysis = (props) => {

    const [utilityData, setUtilityData] = useState({
        labels: ["Loading..."],
        datasets: [
            {
                label: "Utility Breakdown",
                data: 56,
                backgroundColor: "#204e8d"
            },
        ],
    });

    useEffect(() => {
        let res = props.dataset
        // Currently pulling total utility costs from "utility-ghg-emission-data".  


        const currentYear = (new Date()).getFullYear();

        // use range to generate sample data arrays
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

        let labels = []
        let data = []
        let temp_list = []

        // Sample function that could be used to generate an array for projected cost/yr using starting value and multiplying it by the step (energy rate).
        const projectedData = function (start, step) {
            var data = []
            var currentValue = start

            for(let i = 0; i <= 10; i++){
                data.push(((currentValue)).toFixed(2));
                currentValue = (currentValue+upgradeData[i]) * step
            }
            return data;
        }

        res.forEach(obj => {
            data.push(parseFloat(obj[6])); // Get total utility cost (cost/yr) for each building in utility-ghg-emission-data.
            labels.push(String(obj[0])); // Get name for each building in utility-ghg-emission-data.
        })
        sortByValue(labels, data, temp_list);

        let sum = 450000;
        // data.reduce((x, y) => x + y); // Sum up utility cost/yr of all buildings in this portfolio. This is the initial value for the bar chart.
        // let initialData = range(sum, 5000000, 87300) // Create an array of dummy data to simulate projecting costs from initial value.
        let upgradeData = [0, 54000, 153500, 30000, 0, 64000, 2400, 0, 6400] // Create an array of dummy data to mimic upgrade costs applied by filter.
        
        let initialData = projectedData(sum, 1.06) // Create an array of utility cost projections (Starting from the sum of current cost/yr multiplied by inflation rate 3% per year)

        setUtilityData(
            {
                labels: range(currentYear, currentYear + 8, +1), // Set x-axis labels from current year to 28 years later.
                datasets: [
                    // Each dataset should represent projected total cost/yr of the portfolio (All buildings combined).
                    // Each bar will stack on top of each other for each data point.
                    {
                        label: "No data to Show", //'Utility Cost', // First dataset will be at the base of the stack.
                        data: ["No data to show"], // initalData
                        backgroundColor: "#B3B3B5"//"#000c9b", // deep blue
                    }
                    // ,
                    // {
                    //     label: 'Upgrade Cost', // This dataset will be at the top of the stack.
                    //     data: ["No data to show"],//upgradedData
                    //     backgroundColor: "#32cc35", // blue
                    // },
                ],
            }
        )
        function sortByValue(labels, data, temp_list) {
            for (var j = 0; j < labels.length; j++)
                temp_list.push({ 'label': labels[j], 'datas': data[j] });
            temp_list.sort(function (a, b) {
                return ((a.datas > b.datas) ? -1 : ((a.datas == b.datas) ? 0 : 1));
            });
            for (var k = 0; k < temp_list.length; k++) {
                labels[k] = temp_list[k].label;
                data[k] = temp_list[k].datas;
            }
            return { j, k };
        }
    }, [props.dataset])


    return (
        <div id='portfolio' >
            <div className='widget' id='grid-1'>
                <div className="widget-header">
                    <h2>Upgrade and Utility Cost Projection</h2>
                </div>

                <div style={{ margin: 'auto', padding: '5px 50px' }}>
                    <Bar
                        width={"300px"}
                        data={utilityData}
                        plugins={[ChartDataLabels]}
                        options={{
                            layout: {
                                padding: {
                                    top: 35,
                                    bottom: 30
                                }
                            },
                            plugins: {
                                legend: {
                                    display: true,
                                    position: 'top'
                                },
                                datalabels: {
                                    display: false
                                }
                            },
                            responsive: true,
                            scales: {
                                // stacked property on x and y scales set to true to create stacked bar.
                                x: {
                                    stacked: true,
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Year'
                                    }
                                },
                                y: {
                                    stacked: true,
                                    max: 1200000,
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Total Projected Cost ($)',
                                    }
                                }
                            }
                        }} />
                </div>
            </div>
        </div>)
}

export default BarChartStackedAnalysis
