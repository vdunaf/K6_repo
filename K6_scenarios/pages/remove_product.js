import { sleep, check, group } from 'k6';
import http from 'k6/http';
import { URL } from 'https://jslib.k6.io/url/1.0.0/index.js';
import {Parameters} from './parameters.js';

export function RemoveProduct(product1, vars) {
let address, response;
const { main_header, main_Page } = Parameters();
    
group(
    `Remove product from wish list - ${vars['product1']}`,
    function () {
      address = new URL(
        `${main_Page}=account/wishlist&remove=${vars['product1']}`
      )
      address.searchParams.append('remove', `${vars['product1']}`)
      response = http.get(address.toString(), {
        headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' });

      sleep(4.1);
    }
  );
  }
