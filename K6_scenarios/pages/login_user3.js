import http from 'k6/http';
import { check, sleep, group, } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
//import { SharedArray } from 'k6/data';

//// Load CSV file and parse it using Papa Parse
//const csvRead = new SharedArray('credentials', function () {
//  return papaparse.parse(open('./data.csv'), { header: true }).data;
//
//});

export function LoginUser3(randomUser) {
  group('Login account', function () {
    // Login
    const formData = new FormData();
    formData.boundary = '---------------------------35179360043200327002197957960';
    formData.append('email', randomUser.username); // Assuming your CSV has an 'email' field
    formData.append('password', randomUser.password); // Assuming your CSV has a 'password' field

    const response = http.post(
      'http://172.23.176.132/opencart/upload/index.php?route=account/login',
      formData.body(),
      {
        headers: {
          host: '172.23.176.132',
          accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'accept-language': 'en-US,en;q=0.5',
          'accept-encoding': 'gzip, deflate',
          'content-type': `multipart/form-data; boundary=${formData.boundary}`,
          origin: 'http://172.23.176.132',
          connection: 'keep-alive',
          'upgrade-insecure-requests': '1',
        },
      }
    );

    check(response, {
          'status equals 200': (response) => response.status === 200,
          'body contains Edit your account information': (response) =>
            response.body.includes('Edit your account information'),
            });
    sleep(5.8);
  });
}
