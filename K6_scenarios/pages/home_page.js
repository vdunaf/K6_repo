import { sleep, check, group } from 'k6';
import http from 'k6/http';
import {Parameters} from './parameters.js';
let response;

export function HomePage() {
  const vars = {};
  let address, formData, match, response;

const { main_header, main_Page } = Parameters();

  group('Open Home page', function () {
    // Make an HTTP request to the home page
    response = http.get(`${main_Page}=common/home`, {
      headers: main_header,
    });

    check(response, { 'status equals 200': (r) => r.status === 200 });
    console.log(response.body); // Print the response body

   // match = new RegExp('category&amp;path=(\\d+)"').exec(response.body);
  //  vars['category1'] = match ? match[1] || match[0] : null;

    sleep(5);
  });

  return response; // Return the response object
}