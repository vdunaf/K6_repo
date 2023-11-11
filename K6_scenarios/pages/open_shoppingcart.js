import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export function OpenShoppingCart() {
let response;

group (  'Open shopping cart', function (){
// Open shopping cart
      response = http.get(
        'http://172.23.176.132/opencart/upload/index.php?route=common/cart/info',
        {
          headers: {
            host: '172.23.176.132',
            accept: 'text/html, */*; q=0.01',
            'accept-language': 'en-US,en;q=0.5',
            'accept-encoding': 'gzip, deflate',
            'x-requested-with': 'XMLHttpRequest',
            connection: 'keep-alive',
          },
        }
      )
      check(response, {
        'status equals 200': response => response.status.toString() === '200',
//        'body contains shopping cart': response => response.body.includes('shopping cart'),
      })
      sleep(9.1)
    });
  }