import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';

export function RemoveProduct(product1, vars) {
let address, response;
group(
    `Remove product from wish list - http://172.23.176.132/opencart/upload/index.php?route=account/wishlist&remove=${vars['product1']}`,
    function () {
      address = new URL(
        `http://172.23.176.132/opencart/upload/index.php?route=account/wishlist&remove=${vars['product1']}`
      )
      address.searchParams.append('remove', `${vars['product1']}`)
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
      check(response, { 'status equals 200': response => response.status.toString() === '200' });

      sleep(4.1);
    }
  );
  }