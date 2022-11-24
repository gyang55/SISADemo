import axios from "axios";
export async function fetchData() {
    const res = await axios.get("http://localhost:5000/getAllBuildings");
    console.log(res);
    return await res.data.buildings
};
