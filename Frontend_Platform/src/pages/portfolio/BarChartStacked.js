import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
//import { Chart as ChartJS } from 'chart.js/auto' // this import is important
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarController, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarController, BarElement);

const BarChartStacked = (props) => {
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

    // Will need to change endpoint for getData() from "utility-ghg-emission-data" when real data is ready. This will require a brand new SQL query to the backend.   
    useEffect(() => {
        let res = props.dataset

        const currentYear = (new Date()).getFullYear();

        // use range to generate sample data arrays
        const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));

        let labels = []
        let data = []

        // These sample arrays are just for show. Values in the chart have no significance.
        // When real data is available, these arrays will need to be generated starting from the real current cost/yr and use energy rates to calculate the projected costs for future years. 
        let electricData = range(750000, 1500000, 24000)
        let waterData = range(450000, 830000, 13488) // Database currently missing Water ($/yr)
        let gasData = range(450000, 830000, 13488)
        let ghgData = range(50000, 500000, 10000) // Database currently missing GHG ($/yr)

        // Sample function that could be used to generate an array for projected cost/yr using starting value and multiplying it by the step (energy rate).
        const projectedData = function (start, step) {
            var data = []
            var currentValue = start
            while (data.length < 29) {
                data.push(+(currentValue * step).toFixed(2));
                currentValue *= step
            }
            return data;
        }

        let temp_list = []

        // res.data.table_data.forEach(obj => {
        //     data.push(parseFloat(obj[4]));
        //     labels.push(String(obj[0]));
        // })
        // sortByValue(labels, data, temp_list);

        setUtilityData(
            {
                labels: range(currentYear, currentYear + 28, +1), // Set x-axis labels from current year to 28 years later.
                datasets: [
                    // Each dataset should represent projected total cost/yr of the portfolio (All buildings combined).
                    // Each bar will stack on top of each other for each data point.
                    { // First dataset will be at the base of the stack.
                        label: 'Electricity ($/yr)',
                        data: [509384	,524666	,540405	,556618	,573316	,590516	,608231	,626478	,645272	,664631	,684570	,705107	,726260	
                            ,748048	,770489	,793604	,817412	,841934	,867192	,893208	,920004	,947604	,976032	,1005313	,1035473	
                            ,1066537	,1098533	,1131489	,1165434],
                        backgroundColor: "#1B8E17", // green
                    },
                    {
                        label: 'Water ($/yr)',
                        data: [],
                        backgroundColor: "#329DAD", // blue
                    },
                    {
                        label: 'Gas ($/yr)',
                        data: [],
                        backgroundColor: "#FF0000", // red
                    },
                    { // Last dataset will be at the top of the stack.
                        label: 'GHG ($/yr)',
                        data: [81400	,105820	,130240	,154660	,179080	,203500	,227920	,252340	,276760	,276760	,276760	,276760	,276760	,276760
                            ,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760	,276760],
                        backgroundColor: "#957531", // tan
                    },
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
    }, [])


    return (
        <div id='portfolio' >
            <div className='widget' id='grid-1'>
                <div className="widget-header">
                    <h2>Utility and GHG Cost Projection</h2>
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
                                    display: true,
                                    title: {
                                        display: true,
                                        text: 'Utility Cost'
                                    }
                                }
                            }
                        }} />
                </div>
            </div>
        </div>)
}

export default BarChartStacked
