// Get Local IP
const twitterAPI = 'http://localhost:7890/1.1'; // PROXY

const api = {
  search: query => {
    const queryEncoded = encodeURIComponent(query);
    return fetch(`${twitterAPI}/search/tweets.json?q=${queryEncoded}`, {
      // method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // body: JSON.stringify(credentials),
    })
      .then(response => {
        if (response.status >= 400) {
          throw new Error('Received bad status ' + response.status);
        }

        return response.json();
      })
      .then(json => {
        return json.statuses;
      });
  },
};
export default api;
