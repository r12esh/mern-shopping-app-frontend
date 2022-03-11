import {API} from "../../backend";

//Category calls:-
//Create a category:
export const createCategory = (userId, token, name) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(name)
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

//Get all the categories:
export const getAllCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

//Product calls:-
//Create a product:
export const createProduct = (userId, token, product) => {
  return fetch(`${API}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

//Update a product:
export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}

//Get a product:
const getProduct = productId => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
}


//Get all the products:
export const getAllProducts = () => {
  return fetch(`${API}/products`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.log(err)
    })
}

//Delete a product:
export const deleteProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    }
  })
    .then(response => {
      return response.json()
    })
    .catch(err => {
      console.log(err)
    })
}
