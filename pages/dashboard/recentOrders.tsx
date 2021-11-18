import React from 'react';
import {useOrders} from "../../hooks/useOrders";
import {Box} from "@mui/material";
import moment from "moment/moment";
import {DataGrid, GridRowsProp, GridColumns, GridValueGetterParams, GridColDef} from '@mui/x-data-grid';
import {ApolloError} from "@apollo/client";

interface Iprops {
    data: any,
    error: ApolloError | undefined,
    loading: boolean
}

function RecentOrders({data, error, loading}: Iprops) {


    const rows: GridRowsProp = data?.viewer.orderPagination.items.map((item: any) => {
        return {
            id: item.orderID,
            shipName: item.shipName,
            unitPrice: item.details[0].unitPrice,
            orderDate: moment(new Date(item.orderDate)).format('ll'),
            shipAddress: item.shipAddress.city,
            shipVia: item.shipVia

        } })

    const columns: GridColDef[] = [
        { field: 'id', width: 90},
        { field: 'orderDate', headerName: 'Date', width: 150 },
        { field: 'shipName', headerName: 'Name', width: 220},
        { field: 'shipAddress', headerName: 'Ship To', width: 150, editable: true },
        { field: 'shipVia', headerName: 'Item Count', width: 150 },
        { field: 'unitPrice', headerName: 'Sale Amount', width: 150 },

        ]


    return (
        <Box sx={{height: 370, width: '1000px'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
            />
        </Box>
    );
}

export default RecentOrders;