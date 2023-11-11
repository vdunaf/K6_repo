import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export function OpenProduct(category1, vars) {

let address, match, response;

group(
    `Open a product - http://172.23.176.132/opencart/upload/index.php?route=product/product&path=${category1}&product_id=${vars['product1']}`,
    function () {
      // open_product
      address = new URL(
        `http://172.23.176.132/opencart/upload/index.php?route=product/product&path=${category1}&product_id=${vars['product1']}`
      )
      address.searchParams.append('path', `${category1}`)
      address.searchParams.append('product_id', `${vars['product1']}`)
      response = http.get(address.toString(), {
        headers: {
          host: '172.23.176.132',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate',
          connection: 'keep-alive',
          'upgrade-insecure-requests': '1',
        },
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      sleep(0.9)

      address = new URL(
        `http://172.23.176.132/opencart/upload/index.php?route=product/product/review&product_id=${vars['product1']}`
      )
      address.searchParams.append('product_id', `${vars['product1']}`)
      response = http.get(address.toString(), {
        headers: {
          host: '172.23.176.132',
          accept: 'text/html, */*; q=0.01',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate',
          'x-requested-with': 'XMLHttpRequest',
          connection: 'keep-alive',
        },
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })

      match = new RegExp('category&amp;path=(17|24|34)"').exec(response.body)

      vars['category'] = match ? match[1] || match[0] : null

      sleep(3.8)
      }
      );
      }