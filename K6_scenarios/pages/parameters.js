import { sleep, check, group } from 'k6';
import http from 'k6/http';

export function Parameters() {
    const main_header = {
        host: '172.23.176.132',
      //  accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
       // 'accept-language': 'en-US,en;q=0.5',
      //  'accept-encoding': 'gzip, deflate',
      //  connection: 'keep-alive',
      //  'upgrade-insecure-requests': '1',
    };

    const main_Page = 'http://172.23.176.132/opencart/upload/index.php?route';
    const countryId = '222';

    return { main_header, main_Page, countryId };
}