import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }


  timesince(ts) {
    var ms = (Date.now() - ts) / 1000;
    var ago = Math.floor(ms);
    var part = 0;

    if (ago < 60) {
      return 'just now';
    }

    if (ago < 120) {
      return 'for a minute';
    }
    if (ago < 7199 && ago > 3600) {
      return 'for about 30 minutes';
    }

    if (ago < 7200) {
      return 'for an hour';
    }
    if (ago < 86400) {
      while (ago >= 3600) {
        ago -= 3600;
        part += 1;
      }
      return 'for ' + part + ' hours';
    }

    if (ago < 172800) {
      return 'for about a day';
    }
    if (ago < 604800) {
      while (ago >= 172800) {
        ago -= 172800;
        part += 1;
      }
      return 'for about ' + part + ' days';
    }

    if (ago < 1209600) {
      return 'for about a week';
    }
    if (ago < 2592000) {
      while (ago >= 604800) {
        ago -= 604800;
        part += 1;
      }
      return 'for about ' + part + ' weeks';
    }

    if (ago < 5184000) {
      return 'for about a month';
    }
    if (ago < 31536000) {
      while (ago >= 2592000) {
        ago -= 2592000;
        part += 1;
      }
      return 'for about ' + part + ' months';
    }

    if (ago < 1419120000) {
      // 45 years, approximately the epoch
      return 'for more than year';
    }

    // TODO pass in Date.now() and ms to check for 0 as never
    return 'never';
  }
}
