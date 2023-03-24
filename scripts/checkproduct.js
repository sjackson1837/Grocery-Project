function checkProduct() {

    const barcode = document.getElementById("barcode").value;
    const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
    document.getElementById("ProductName").value = "";
    document.getElementById("product-image").src = "";
  

    fetch(url)
      .then(response => response.json())
      .then(data => {
        const ProductName = data.product.product_name;
        const imageUrl = data.product.image_url;

        document.getElementById("ProductBarcode").value = barcode;
        document.getElementById("ProductName").value = ProductName;
        //document.getElementById("ProductDescription").value = ProductDescription;
        document.getElementById("product-image").src = imageUrl;
        document.getElementById("barcode").value = "";
        var audio = new Audio('Sounds/positive.mp3');
		    audio.play();
      })
      .catch(error => console.error(error));
    
  }