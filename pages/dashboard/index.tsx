import React from 'react';
import RecentOrders from "./recentOrders";
import TodayChart from "./todayChart";
import {useOrders} from "../../hooks/useOrders";
import {ApolloError} from "@apollo/client";
import {Box} from "@mui/material";
import Navbar from "../../components/Navbar";


function Index() {

    const {error, loading, data} = useOrders();

    // console.log(error, loading, data)

    // const props = {data, error, loading}

    return (
        <Box>
            <Navbar/>
            <Box sx={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <TodayChart data={data} error={error} loading={loading}/>
                <RecentOrders data={data} error={error} loading={loading}/>
            </Box>
        </Box>

    );
}

export default Index;