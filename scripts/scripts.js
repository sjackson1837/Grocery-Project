function lookupProduct() {
    const barcode = document.getElementById("barcode").value;
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const ProductName = data.product.product_name;
        const productDescription = data.product.generic_name;
        const imageUrl = data.product.image_url;

        document.getElementById("ProductBarcode").value = barcode;
        document.getElementById("ProductName").value = ProductName;
        document.getElementById("productDescription").value = productDescription;
        document.getElementById("product-image").src = imageUrl;
        document.getElementById("barcode").value = "";
        sendtogoogle();
      })
      .catch(error => console.error(error));
  }

  function sendtogoogle() {
  const scriptURL = 'https://script.google.com/macros/s/AKfycbzAew4P3qGozmSxEP22oLoEtyn_dJ-h2aiQpGy4rUzY7X5Tm-F_b5_pgfQQzZIxwF0_/exec'
  const form = document.forms['submit-to-google-sheet']

  form.addEventListener('update', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => console.log('Success!', response))
      .catch(error => console.error('Error!', error.message))
  })
  }