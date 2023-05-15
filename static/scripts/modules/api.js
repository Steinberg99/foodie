export const getProductByBarcode = async (productId) => {
  try {
    const url = `https://world.openfoodfacts.org/api/v0/product/${productId}`;
    const response = await fetch(url);
    const data = await response.json();
    const productData = data.product;

    return productData;
  } catch (error) {
    console.log(error);
  }
};

export const getProductsByNameAndPageNumber = async (productName, pageNumber) => {
  try {
    const url = `https://nl.openfoodfacts.org/cgi/search.pl?search_terms=${productName}&page=${pageNumber}&json=true`;
    const response = await fetch(url);
    const data = await response.json();
    const productsData = {
      count: data.count,
      products: data.products,
    };

    return productsData;
  } catch (error) {
    console.log(error);
  }
};
