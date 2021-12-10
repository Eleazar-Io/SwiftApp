import {gql} from '@apollo/client';
export const GET_POPULAR = gql`
query{
    products(search: "aaa"){
      items{
        id
        name
        price_range{
          minimum_price{
            regular_price{
              currency
              value
            }
          }
        }
        image{
          url
        }
      }
    }
  }
`