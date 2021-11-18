import React from 'react';
import { gql, useMutation } from "@apollo/client";
import {Box, Button} from "@mui/material";

const CREATE_PRODUCT = gql`
    mutation CreateProduct($name: String!, $quantityPerUnit: Int!) {
        createProduct(record: {
            name: $name,
            quantityPerUnit: $quantityPerUnit
        }) {
            record {
                 name,
                 quantityPerUnit
        }

  }
}
`

function Mutation() {

    const [createProduct, {error, loading, data}] = useMutation(CREATE_PRODUCT, {
        variables: {
            name: 'hotdog',
            quantityPerUnit: 4
        }
    })

    return (
        <div>
            <Button onClick={() => createProduct()}>put data</Button>
        </div>
    );
}

export default Mutation;