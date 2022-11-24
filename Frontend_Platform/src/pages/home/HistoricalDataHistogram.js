import React, { useEffect, useState, useRef } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import "../../styles/line.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Graph = (props) => {
    const reference = useRef(0);
    const [gasUsage, setGasUsage] = useState({});
    const [electUsage, setElecUsage] = useState({});
    const [selectedPeriod, setSelectedPeriod] = useState({
        startDate: moment(Date.now())
            .subtract(6, "month")
            .subtract(moment(Date.now()).date() - 1, "day"),
        endDate: moment(Date.now()),
    });
    const [data, setData] = useState({
        gas: {},
        electricity: {},
    });

    const options = (text) => ({
        maintainAspectRatio: false,
        responsive: true,
        interaction: {
            mode: "index",
            intersect: false,
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: text,
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: text
                },
                type: "linear",
                display: true,
                position: "left",
            },
        },
    });
    useEffect(() => {
        let res = props.dataset
        let rawData = res;
        let electricity = rawData.electricity;
        let gas = rawData.gas;
        for (const key in electricity) {
            setElecUsage((oldElec) => ({
                ...oldElec,
                [key]: electricity[key],
            }));
            data.electricity[key] = {
                consumption: [],
                month: [],
            };
            setData({ ...data });
        }
        for (const key in gas) {
            setGasUsage((oldGas) => ({ ...oldGas, [key]: gas[key] }));
            data.gas[key] = {
                consumption: [],
                month: [],
            };
            setData({ ...data });
        }
        reference.current++;
    }, [props.dataset]);

    useEffect(() => {
        //if(reference.current != 0) setDefaultData()
        populateData();
    }, [electUsage, gasUsage, selectedPeriod]);

    const populateData = () => {
        let startDate = moment(selectedPeriod.startDate).subtract(1, "day");
        let endDate = selectedPeriod.endDate;
        setDefaultData();
        for (const key in electUsage) {
            electUsage[key].forEach((element) => {
                if (moment(element.month).isBetween(startDate, endDate, "[]")) {
                    let monthDifference = moment(element.month).diff(
                        startDate,
                        "month"
                    );
                    data.electricity[key].consumption[monthDifference] =
                        element.cons;
                    data.electricity[key].month[monthDifference] =
                        element.month;
                    //setData({...data})
                }
            });
        }
        for (const key in gasUsage) {
            gasUsage[key].forEach((element) => {
                if (moment(element.month).isBetween(startDate, endDate, "[]")) {
                    let monthDifference = moment(element.month).diff(
                        startDate,
                        "month"
                    );
                    data.gas[key].consumption[monthDifference] = element.cons;
                    data.gas[key].month[monthDifference] = element.month;
                    //setData({...data})
                }
            });
        }
        document.querySelector(".gas-line").data = generateData(data.gas);
        document.querySelector(".elect-line").data = generateData(
            data.electricity
        );
    };
    const setDefaultData = () => {
        for (const key in electUsage) {
            data.electricity[key] = {
                consumption: [],
                month: [],
            };
            setData({ ...data });
        }
        for (const key in gasUsage) {
            data.gas[key] = {
                consumption: [],
                month: [],
            };
            setData({ ...data });
        }
    };
    const generateRandomColor = (index) => {
        const colorList = [
            "#204e8d",
            "#ad4501",
            "#f760ad",
            "#24f580",
            "#bcbc57",
            "#66a61b",
            "#c90dd6",
            "#02986c",
            "#0456d9",
            "#91b049",
            "#a2bf5b",
            "#bb68de",
            "#b4f090",
            "#869805",
            "#5daa3a",
            "#4a0845",
            "#7f5b03",
            "#883015",
            "#6190e2",
            "#2f2590",
            "#bc63fa",
            "#42f2d7",
            "#05d9dc",
            "#99595d",
            "#64dc8b",
            "#e16020",
            "#3a321a",
            "#620df8",
            "#c986d5",
            "#5ca8e8",
            "#02e056",
            "#035f10",
            "#d736ee",
            "#27b27b",
            "#d42530",
            "#71aecd",
            "#49da6a",
            "#1216b9",
            "#7a5f04",
            "#496938",
            "#fad391",
            "#654e1f",
            "#7a50ca",
            "#da727b",
            "#745e40",
            "#713874",
            "#767a00",
            "#8f2bbc",
            "#b91b21",
            "#edc0ac",
        ];
        return colorList[index];
    };
    const generateData = (rawData) => {
        let startDate = moment(selectedPeriod.startDate);
        let endDate = moment(selectedPeriod.endDate);
        let dates = [];

        let month = moment(startDate);
        while (month < endDate) {
            dates.push(month.format("YYYY-MMM"));
            month.add(1, "month");
        }
        let chartData = { labels: dates, datasets: [] };
        let counter = 0;
        for (const key in rawData) {
            let spec = {
                label: key,
                data: rawData[key].consumption,
                borderColor: generateRandomColor(counter),
                backgroundColor: generateRandomColor(counter),
                yAxisID: "y",
                pointRadius: 0,
                tension: 0.4,
                spanGaps: true,
            };
            chartData.datasets.push(spec);
            counter++;
        }
        return chartData;
    };

    const handleClick = (e) => {
        e.preventDefault();
        document.querySelector("#from-input").value = "";
        document.querySelector("#to-input").value = "";
        let btnValue = e.target.innerText;
        let startDate;
        switch (btnValue) {
            case "6M":
                startDate = moment(Date.now())
                    .subtract(6, "month")
                    .subtract(moment(Date.now()).date() - 1, "day");
                break;
            case "1Y":
                startDate = moment(Date.now())
                    .subtract(1, "year")
                    .subtract(moment(Date.now()).date() - 1, "day");
                break;
            case "2Y":
                startDate = moment(Date.now())
                    .subtract(2, "year")
                    .subtract(moment(Date.now()).date() - 1, "day");
                break;
            case "MAX":
                let electMaxDate;
                let gasMaxDate;
                for (const key in electUsage) {
                    if (electMaxDate == undefined) {
                        electMaxDate = electUsage[key][0].month;
                    } else if (electUsage[key][0].month < electMaxDate) {
                        electMaxDate = electUsage[key][0].month;
                    }
                }
                for (const key in gasUsage) {
                    if (gasMaxDate == undefined) {
                        gasMaxDate = gasUsage[key][0].month;
                    } else if (gasUsage[key][0].month < gasMaxDate) {
                        gasMaxDate = gasUsage[key][0].month;
                    }
                }
                startDate =
                    electMaxDate < gasMaxDate
                        ? moment(electMaxDate)
                        : moment(gasMaxDate);
                break;
            default:
                break;
        }
        setSelectedPeriod({ ...selectedPeriod, startDate: startDate });
    };

    const handleChange = (e) => {
        let fromInput = document.querySelector("#from-input").value;
        let toInput = document.querySelector("#to-input").value;
        if (fromInput != null && toInput != null) {
            setSelectedPeriod({
                startDate: moment(fromInput),
                endDate: moment(toInput),
            });
        }
    };

    useEffect(() => {
        document.querySelector("#btn-max").click();
    }, [gasUsage, electUsage]);

    return (
        <div className="widget h-full flex flex-col gap-5">
            <div className="widget-header">
                <h2 className="font-mukta">Historial Data Breakdown</h2>
            </div>
            <div className="h-full flex gap-5">
                <div className="w-full" id="">
                    <Line
                        height={"420px"}
                        className="elect-line"
                        options={options("Electricity Usage (KWh)")}
                        data={generateData(data.electricity)}
                    />
                </div>
                <div className="line w-full" id="">
                    <Line
                        height={"420px"}
                        className="gas-line"
                        options={options("Gas Usage (GJ)")}
                        data={generateData(data.gas)}
                    />
                </div>
            </div>
            <div className="flex justify-end mb-3">
                <div className="custom-zoom">
                    <label className="date-label" htmlFor="from-input">
                        From:
                    </label>
                    <input
                        type="month"
                        id="from-input"
                        onChange={handleChange}
                    ></input>
                    <label className="date-label" htmlFor="to-input">
                        To:
                    </label>
                    <input
                        type="month"
                        id="to-input"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="preset-zoom">
                    <button onClick={handleClick}>6M</button>
                    <button onClick={handleClick}>1Y</button>
                    <button onClick={handleClick}>2Y</button>
                    <button onClick={handleClick} id="btn-max">
                        MAX
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Graph;
