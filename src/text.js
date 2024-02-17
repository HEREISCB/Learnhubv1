const url = 'http://localhost:8000/submitted_texts.json';

fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log('Data from JSON file:', data);
  
  })
  .catch(error => console.error('Error fetching JSON:', error));
