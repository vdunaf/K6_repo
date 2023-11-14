import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import { SharedArray } from 'k6/data';

export function OpenCategory(selectedCategory1, vars) {
//const vars = {}

let address, match, response;

group(
    `Open a Category - http://172.23.176.132/opencart/upload/index.php?route=product/category&path=${selectedCategory1}`,
    function () {
      // category
      address = new URL(
        `http://172.23.176.132/opencart/upload/index.php?route=product/category&path=${selectedCategory1}`
      )
      address.searchParams.append('path', selectedCategory1); // Use category1 from the function argument
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

      match = new RegExp('product_id=(.+?)">').exec(response.body)
      vars['product1'] = match ? match[1] || match[0] : null


      sleep(4.1)
    }
  );
  }
