import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function AddToWishList(product1, vars) {
let response;
const { main_header, main_Page } = Parameters();

group( 'Add to Wishlist', function (){
response = http.post(
        `${main_Page}=account/wishlist/add`,
        {
          product_id: `${product1}`,
        },
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(4.3)
}
);
}
