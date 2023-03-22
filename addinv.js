function getProductInfo() {
	const barcode = $('#barcode').val();
	const url = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;
  
	$.getJSON(url, function(data) {
	  if (data.product) {
		const product = data.product;
		$('#product-name').text(product.product_name);
		$('#product-description').text(product.generic_name);
		$('#product-image').attr('src', product.image_url);
		var audio = new Audio('Sounds/positive.mp3');
		audio.play();
	  } else {
		var audio = new Audio('Sounds/negative.mp3');
		audio.play();
		$('#product-name').text('no product found');
	  }
	});
  }
  