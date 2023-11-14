import { sleep, check, group } from 'k6';
import http from 'k6/http';
let response;

export function HomePage() {
  const vars = {};
  let address, formData, match, response;

  group('Open Home page - http://172.23.176.132/opencart/upload/index.php?route=common/home', function () {
    // Make an HTTP request to the home page
    response = http.get('http://172.23.176.132/opencart/upload/index.php?route=common/home', {
      headers: {
        host: '172.23.176.132',
        accept:
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'accept-language': 'en-US,en;q=0.5',
        'accept-encoding': 'gzip, deflate',
        connection: 'keep-alive',
        'upgrade-insecure-requests': '1',
      },
    });

    check(response, { 'status equals 200': (r) => r.status === 200 });
    console.log(response.body); // Print the response body

    // match = new RegExp('category&amp;path=(\\d+)"').exec(response.body);
    // vars['category1'] = match ? match[1] || match[0] : null;

    sleep(5);
  });

  return response; // Return the response object
}
