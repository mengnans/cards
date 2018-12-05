import 'whatwg-fetch';

export const get = (url = '', params = {}) => {
  return new Promise((resolve, reject) => {
    let extraUrl = '';
    if (params) {
      const paramUrls = [];
      Object.keys(params).forEach((key) => {
        typeof params[key] !== 'undefined' &&
        paramUrls.push(`${key}=${params[key]}`);
      });
      if (paramUrls.length) extraUrl = `?${paramUrls.join('&')}`;
    }
    let totalItemNumber;
    fetch(url + extraUrl, {
      headers: {
        'Content-Type': 'application/json',
        "apitoken": 'eyJhbGciOiJSUzUxMiIsInppcCI6IkRFRiJ9.eNqUkt1qg0AQhd9lrqU0aiB41a2OsmhcWddKKUWMbotQV_GHFsR37yZ3LSWmt2e-MzMczgLjfAIH3oZOTVLVkxwnMKCc60aqSurJpzxpoRpkOckanN3etg7mYW9au3vbgF4ObTOOTadGcF4WUGV7NnEkXnEkSULjQLv7odPg1EgNLetq_OSIK-gTFgKPSUQEXuNdbRBY5IyHfsTyzdWCuiGKImUZdzHdxGMmqE9dIiiLr8GC0yBAfvsf1MNYUPG8CfoUI--mKC74P4PYxMKY5RF6AT6SdPs6z6K_Qn014H3o5v7cCCCCF1mKHLQqv_pLgWzbsizT0kJbNh-_2vdQVpVU0zzIu6prYf0GAAD__w.hA1UxpMEszy7oIY-DJWeOk9iuaShq0GMx1V2LROfmTX6Goi1VYwYvnNLkPke_19-Ianku9e9pwF7hJNgkS8szOl4w_12x3UbDRXzPw7cRMmbDhlyRDXM-q8l7YGtVEBgn7t4yDjgdKnK5tB7ayDvb1tbE6IatvVW0Z42XSAchfQ',
      },
    })
      .then((response) => {
        totalItemNumber = response.headers.get('X-Total-Count');
        return response.json();
      })
      .then(
        (result) => {
          if (result) {
            let dataFetched = {};
            dataFetched.data = result;
            dataFetched.totalItemNumber = totalItemNumber;
            resolve(dataFetched);
          } else {
            console.log(result.data || 'fetching data failed');
            reject(params);
          }
        },
        (err) => {
          console.log(err);
          reject(params);
        }
      )
      .catch((err) => {
        console.log(err);
        reject(params);
      });
  });
};

