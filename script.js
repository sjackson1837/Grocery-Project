// Load the Google Sheets API
gapi.load('client', start);

// Authenticate the user with your API key
function start() {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY_HERE',
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  }).then(function() {
    // Add an event listener to the submit button
    document.getElementById('submit').addEventListener('click', writeToSheet);
  });
}

// Function to write data to the sheet
function writeToSheet() {
  // Get the search term from the input field
  var searchTerm = document.getElementById('search').value;
  
  // Build the request object
  var request = gapi.client.sheets.spreadsheets.values.append({
    spreadsheetId: 'YOUR_SPREADSHEET_ID_HERE',
    range: 'data!A:B',
    valueInputOption: 'RAW',
    resource: {
      values: [[searchTerm]],
    },
  });
  
  // Execute the request
  request.then(function(response) {
    console.log(response.result);
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}
