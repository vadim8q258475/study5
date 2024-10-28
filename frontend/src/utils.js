import axios from 'axios'

function get_data(trackPromise, apiUrl, token, setFn) {
  const instance = axios.create({
    baseURL: apiUrl,
    headers: { Authorization: `Token ${token}` },
  });

  trackPromise(
    instance.get().then((resp) => {
      const data = resp.data;
      setFn(data);
      console.log("des", resp.data);
    })
  );
}

export default get_data


