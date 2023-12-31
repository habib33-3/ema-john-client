import { getShoppingCart } from "../utilities/fakeDb";

const cartProductsLoader = async () => {
  const storedCart = getShoppingCart();
  const storedCartId = Object.keys(storedCart);

  const loadedProducts = await fetch("http://localhost:5000/productsById", {
    method: "POST",

    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(storedCartId),
  });
  const products = await loadedProducts.json();

  const savedCart = [];

  for (const id in storedCart) {
    const addedProduct = products.find((pd) => pd._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }

  // if you need to send two things
  // return [products, savedCart]
  // another options
  // return { products, cart: savedCart }

  return savedCart;
};

export default cartProductsLoader;
