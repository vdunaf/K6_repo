import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export function AddToCart(product1, vars) {
let response;
// Add to cart
    group(  'Add To Cart', function (){
    response = http.post(
        'http://172.23.176.132/opencart/upload/index.php?route=checkout/cart/add',
        {
          quantity: '1',
          product_id: `${product1}`,
        },
        {
          headers: {
            host: '172.23.176.132',
            accept: 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            origin: 'http://172.23.176.132',
            connection: 'keep-alive',
          },
        }
      )
      check(response, {
        'status equals 200': response => response.status.toString() === '200',
        'body contains success': response => response.body.includes('success'),
      })
      });
      };