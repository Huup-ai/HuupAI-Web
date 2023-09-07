const FetchRequest = async (url, method, header = {}, data = {}) => {
  const response = await fetch(url, {
    method: method,
    headers: header,
    body: JSON.stringify(data),
  });
  return response.json();
};

export async function callapi() {
  return FetchRequest("http://localhost:8000/users/logout/", "POST");
}
