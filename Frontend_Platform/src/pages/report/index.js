import React, { useEffect, useState } from "react";
import { getData } from "../../utils/HttpClient";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../global/LoadingSpinner";
import ReportTabs from "./ReportTabs";

export const Report = (props) => {
    const [data, setData] = useState([])
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState({
    report_gas_breakdown: ["No data to show"],
    report_electrical_breakdown: ["No data to show"],
    });

    useEffect(() => {
        setIsLoading(true)
        getData(
            `report/${(window.location.pathname).substring(8)}`,
            props.removeToken,
            navigate,
            `report_ecm_data/${(window.location.pathname).substring(8)}`,
            props.getCache,
            props.putCache,
            props.clearCache
        ).then((res) => {
            delete res.report_gas_breakdown[0];  // delete 'total' row
            delete res.report_electrical_breakdown[0];  // delete 'total' row 
            console.log(res);
            setData(res)
            setIsLoading(false)
        })
    }, []);


    return(
        <>
            {isLoading ? <LoadingSpinner/> :
            <div className="mb-16">
            <div className="title">
				<h1 className="text-4xl text-black font-mukta">Report Template</h1>
			</div>
            {/* <h2>
                Report Number: {(window.location.pathname).substring(8)}
            </h2> */}
            <div>
                <ReportTabs data={data}/>
            </div>
            <div className="h-full flex flex-col gap-10">
				<div className="bg-white flex flex-col rounded drop-shadow-md p-5">
                
                {/* {data.report_ecm_data} */}
                </div>
            </div>

            </div>}
        </>
    )
}