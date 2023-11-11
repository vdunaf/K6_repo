import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';

export function Logout() {
let response;
group(
    'Logout - http://172.23.176.132/opencart/upload/index.php?route=account/logout',
    function () {
      response = http.get('http://172.23.176.132/opencart/upload/index.php?route=account/logout', {
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
      console.log(response)
    }
  );
  }