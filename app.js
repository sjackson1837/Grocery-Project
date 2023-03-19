function getProductInfo() {
	const barcode = $('#barcode').val();
	const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  
	$.getJSON(url, function(data) {
	  if (data.product) {
		const product = data.product;
		$('#product-name').text(product.product_name);
		$('#product-description').text(product.generic_name);
		$('#product-image').attr('src', product.image_url);
	  } else {
		$('#product-name').text('no product found');
	  }
	});
  }
  