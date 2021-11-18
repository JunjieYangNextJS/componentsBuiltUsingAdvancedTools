import { useQuery, gql } from "@apollo/client";
import React from "react";


const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
     character(id: $id) {
      name
      id
      gender
      image
      episode {
      name episode
      }
     }
     } 
`

export const useCharacter = (id: string | string[] | undefined) => {
    const {data, error, loading} = useQuery(GET_CHARACTER, {
        variables: {
            id
        }
    })



    return {
        data,
        error,
        loading
    }
}