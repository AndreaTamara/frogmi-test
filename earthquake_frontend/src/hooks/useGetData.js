import { useEffect, useState } from "react";
import { baseURL } from "../constants";
import { buildUrlParams } from "../utils";
import { notification } from 'antd';

export const useGetData = (endpoint, page, per_page, mag_type) => {

    const [data, setData] = useState([]);
    const [totalRecords, setTotalRecords] = useState(null)

    useEffect(() => {
        const params = { page, per_page, mag_type }
        const getData = async () => {
            try {
                const urlParams = buildUrlParams(params)
                const url = `${baseURL}${endpoint}?${urlParams.toString()}`
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`${response.status} ${response.statusText}`);
                }
                const jsonData = await response.json();
                setData(jsonData.data);
                setTotalRecords(jsonData?.pagination?.total || jsonData?.data?.length)
            } catch (err) {
                notification.error({
                    message: 'Error',
                    description: err.message,
                });
            }
        }
        getData();
    }, [endpoint, page, per_page, mag_type])

    return { data, totalRecords }
}