export default (url, body, headers) => {
  headers = Object.assign({ 'Content-Type': 'application/json' }, headers);
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers
  })
  .then(res => res.ok ? res : Promise.reject(res))
}
