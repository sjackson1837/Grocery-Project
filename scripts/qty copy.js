// Load the Google Sheets API client library
gapi.load('client', function() {
    // Authenticate the client with the Google Sheets API using OAuth 2.0
    // ...
  
    // Retrieve the data from the "Jackson Inventory" sheet
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: 'your-spreadsheet-id',
      range: 'A:C'
    }).then(function(response) {
      // Process the data to get the unique barcodes and calculate the quantity for each item
      var data = response.result.values;
      var items = {};
      data.forEach(function(row) {
        var barcode = row[0];
        var name = row[1];
        var qty = Number(row[2]);
        if (items[barcode]) {
          items[barcode].qty += qty;
        } else {
          items[barcode] = {
            name: name,
            qty: qty
          };
        }
      });
  
      // Display the data on the screen
      var table = document.createElement('table');
      var header = table.createTHead();
      var row = header.insertRow(0);
      row.insertCell(0).innerHTML = 'Barcode';
      row.insertCell(1).innerHTML = 'Product Name';
      row.insertCell(2).innerHTML = 'Qty';
      var body = table.createTBody();
      Object.keys(items).forEach(function(barcode) {
        row = body.insertRow();
        row.insertCell(0).innerHTML = barcode;
        row.insertCell(1).innerHTML = items[barcode].name;
        row.insertCell(2).innerHTML = items[barcode].qty;
      });
      document.body.appendChild(table);
    }, function(reason) {
      console.error('Error: ' + reason.result.error.message);
    });
  });
  