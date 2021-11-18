import {useQuery, gql} from '@apollo/client'

const GET_ORDERS = gql`
    query {
        viewer{
            orderPagination{ 
                items{
                  orderID                    
                  orderDate 
                  shipName
                  shipVia
                  shipAddress {
                            city
                      }
                  details {
                            unitPrice
                      }           
                }
           } 
        }
    }
`

export const useOrders = () => {
    const {error, loading, data} = useQuery(GET_ORDERS)

    return {
        error,
        loading,
        data
    }
}