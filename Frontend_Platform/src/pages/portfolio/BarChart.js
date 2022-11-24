import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types";
// import ChartDataLabels from "chartjs-plugin-datalabels";
//import { Chart as ChartJS } from 'chart.js/auto' // this import is important
// import {
//     Chart as ChartJS,
//     ArcElement,
//     Tooltip,
//     Legend,
//     BarController,
//     BarElement,
// } from "chart.js";
// ChartJS.register(ArcElement, Tooltip, Legend, BarController, BarElement);

const BarChart = (props) => {
    //init placeholder values for label, data, and background color
    const [data, setData] = useState({
        labels: ["Sample A", "Sample B", "Sample C"],
        datasets: [
            {
                label: 'Default Dataset',
                data: [10, 10, 10, 13],
                backgroundColor: ["#B3B3B5"]
            },
        ],
    });

    //use endpoint to get query data
    useEffect(() => {
        let res = props.dataset

        if(res[0][0] !== 'No building data to show'){
            let labels = [];
            let data = [];
            let temp_list = [];

            //push site name and cost/consumption from queried data to empty arrs
            res.forEach((obj) => {
                data.push(parseFloat(obj[props.columns[1]]));
                labels.push(String(obj[props.columns[0]]));
            });

            //set data as queried data, set labels and chart color
            sortByValue(labels, data, temp_list);
            setData({
                labels: labels,
                datasets: [
                    {
                        label: props.label,
                        data: data,
                        backgroundColor: props.color,
                    },
                ],
            });

            //sort the bar chart to display in descending format
            function sortByValue(labels, data, temp_list) {
                for (var j = 0; j < labels.length; j++)
                    temp_list.push({ label: labels[j], datas: data[j] });
                temp_list.sort(function (a, b) {
                    return a.datas > b.datas ? -1 : a.datas === b.datas ? 0 : 1;
                });
                for (var k = 0; k < temp_list.length; k++) {
                    labels[k] = temp_list[k].label;
                    data[k] = temp_list[k].datas;
                }
                return { j, k };
            }
        }

        

    }, [props.dataset]);

    return (
        <div className="flex items-center h-full w-full gap-5">
            <div className="widget h-full w-full">
                <div className="widget-header">
                    <h2 className="font-mukta">{props.title}</h2>
                </div>
                    <Bar
                        width={"100%"}
                        height={"100%"}
                        data={data}
                        options={{
                            maintainAspectRatio: false,
                            layout: {
                                padding: {
                                    top: 35,
                                    bottom: 30,
                                },
                            },
                            plugins: {
                                legend: {
                                    display: false,
                                    position: "right",
                                },
                                datalabels: {
                                    display: false,
                                },
                            },
                            scales: {
                                y: {
                                    display: true,
                                    title: {
                                        display: true,
                                        text: props.yaxis,
                                    },
                                },
                            },
                        }}
                    />
            </div>
        </div>
    );
};

// required props when creating the barchart
BarChart.propTypes = {
    dataset: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    columns: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    yaxis: PropTypes.string.isRequired,
};

export default BarChart;
