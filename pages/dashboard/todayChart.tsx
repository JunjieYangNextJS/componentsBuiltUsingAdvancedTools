import React from 'react';
import { LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    Tooltip,
    Area,
    Legend
} from 'recharts';
import {ApolloError} from "@apollo/client";
import {Card, Typography} from '@mui/material'
import {GridRowsProp} from "@mui/x-data-grid";
import moment from "moment/moment";


interface Iprops {
    data: any,
    error: ApolloError | undefined,
    loading: boolean
}

function TodayChart({data, error, loading}: Iprops) {
    const info = data?.viewer.orderPagination.items.map((item: any) => {
        return {
            // id: item.orderID,
            // shipName: item.shipName,
            unitPrice: item.details[0].unitPrice,
            // orderDate: moment(new Date(item.orderDate)).format('ll'),
            shipAddress: item.shipAddress.city,
            // shipVia: item.shipVia

        } })


    return (
        <Card sx={{display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <Typography variant="h5" component="div">
                Sells Chart
            </Typography>
            <Typography width={770}>
                <LineChart width={730} height={250} data={info}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="shipAddress" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="unitPrice" stroke="#8884d8" />
                </LineChart>
            </Typography>

        </Card>
    );
}

export default TodayChart;