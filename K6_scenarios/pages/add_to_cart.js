import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function AddToCart(product1, vars) {
let response;
    const { main_header, main_Page } = Parameters();
    
// Add to cart
    group(  'Add To Cart', function (){
    response = http.post(
        `${main_Page}=checkout/cart/add`,
        {
          quantity: '1',
          product_id: `${product1}`,
        },
        {
          headers: main_header,
        }
      )
      check(response, {
        'status equals 200': response => response.status.toString() === '200',
        'body contains success': response => response.body.includes('success'),
      })
      });
      };
