import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function OpenWishlist(){
let response;
const { main_header, main_Page } = Parameters();
    
group(
    'Open wishlist page',
    function () {
      response = http.get(`${main_Page}=account/wishlist`,
        {
          headers: main_header,
        }
      )
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      console.log(response)
      sleep(3.9)
    }
  );
  }
