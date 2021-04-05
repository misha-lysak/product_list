const url = "https://6067460a98f405001728eaa3.mockapi.io/product-list/products";

export const data = () => (
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can't upload your data`);
      }

      return response.json();
    })
)

export const request = (url, options) => (
  fetch(`${url}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can\n't upload your comment`);
      }

      return response.json();
    })
);

export const productData = (id, options) => (
  fetch(`${url}/${id}`, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`can\n't upload your data`);
      }

      return response.json();
    })
);

export const createProduct = (data) => (
  fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      id: data.id,
      imageUrl: data.imageUrl,
      name: data.name,
      count: data.count,
      size: {
        height: data.height,
        width: data.width,
      },
      weight: `weight ${data.weight}`,
    }),
  })
    .then(response => response.json())
);

export const editProduct = (id, data) => (
  fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
);

export const createComment = (productId, data) => (
  fetch(`${url}/${productId}/comments`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
);

export const remove = id => (
  request(`${url}/${id}`, { method: 'DELETE' })
);

export const removeComment = (productId, id) => (
  request(`${url}/${productId}/comments/${id}`, { method: 'DELETE' })
);