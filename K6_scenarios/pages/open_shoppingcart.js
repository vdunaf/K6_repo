import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function OpenShoppingCart() {
let response;
const { main_header, main_Page } = Parameters();
      
group (  'Open shopping cart', function (){
// Open shopping cart
      response = http.get(
        `${main_Page}=common/cart/info`,
        {
          headers: main_header,
        }
      )
      check(response, {
        'status equals 200': response => response.status.toString() === '200',
//        'body contains shopping cart': response => response.body.includes('shopping cart'),
      })
      sleep(9.1)
    });
  }
