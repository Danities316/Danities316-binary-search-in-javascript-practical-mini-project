// Sample phonebook data
const endpoint = './phoneBook.json';
var phoneBook = [];

fetch(endpoint)
.then(blob =>{
  return blob.json()
})
.then(data => {
  // Sorting or array of objects so as to run binary search
  sortData = data.sort((a, b) => a.first_name.localeCompare(b.first_name))
  // console.log(sortData)
 return phoneBook.push(...data)
})
.catch(err => console.log(err));
console.log(phoneBook)
  
  // Function to perform binary search on the phonebook array
  function binarySearch(arr, searchName) {
    let low = 0;
    let high = arr.length - 1;
  
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const contact = arr[mid];
  
      if (contact.first_name === searchName) {
        return contact;
      } else if (contact.first_name < searchName) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  
    return null; // Contact not found
  }
  
  // Function to handle search button click event
  function handleSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchName = searchInput.value.trim();
  
    if (searchName === '') {
      alert('Please enter a name to search');
      return;
    }
  
    const contact = binarySearch(phoneBook, searchName);
  
    if (contact) {
      document.getElementById('resultsContainer').innerHTML = `<p>Name: ${contact.first_name}</p><p>Phone: ${contact.phone}</p>`;
    } else {
      document.getElementById('resultsContainer').innerHTML = '<p>Contact not found</p>';
    }
  }
  
  // Add event listener to search button
  document.getElementById('searchButton').addEventListener('click', handleSearch);
  