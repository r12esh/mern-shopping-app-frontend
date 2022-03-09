import {API} from "../../backend";

export const createCategory = (userId, token, name) => {
  return fetch(`${API}/category/create/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(name)
    }
  ).then(response => {
    return response.json()
  }).catch(err => {
    console.log(err)
  })
}
