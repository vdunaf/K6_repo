import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import {Parameters} from './parameters.js';

export function Logout() {
let response;
const { main_header, main_Page } = Parameters();
group(
    'Logout',
    function () {
      response = ${main_Page}route=account/logout', {
       headers: main_header,
      })
      check(response, { 'status equals 200': response => response.status.toString() === '200' })
      console.log(response)
    }
  );
  }
