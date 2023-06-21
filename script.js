const tableHeader = ["S/N", "FirstName", "LastName", "Gender"];
const display = document.getElementById("data-table");
// Sample phonebook data
const endpoint = "./phoneBook.json";
var phoneBook = [];

fetch(endpoint)
  .then((blob) => {
    return blob.json();
  })
  .then((data) => {
    // Sorting or array of objects so as to run binary search
    sortData = data.sort((a, b) => a.first_name.localeCompare(b.first_name));
    // console.log(sortData)
    return phoneBook.push(...data);
  })
  .catch((err) => console.log(err));
// console.log(phoneBook)

function generateTable() {
  const table = document.getElementById("html-data-table");

  display.style.display = "block";

  // phoneBook = phoneBook.slice(0, 10);
  phoneBook.forEach((number) => {
    let newRow = document.createElement("tr");
    const data = {
      first_name: number.first_name,
      last_name: number.last_name,
      gender: number.gender,
    };
    Object.values(data).forEach((value) => {
      let cell = document.createElement("td");
      cell.innerText = value;
      newRow.appendChild(cell);
    });

    // console.log(number.first_name)

    table.appendChild(newRow);
  });
}

// Function to perform binary search on the phonebook array
function binarySearch(arr, searchName) {
  searchName = searchName.toLowerCase();
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const contact = arr[mid];
    const FirstNametoLowerCase = contact.first_name.toLowerCase(); // Convert contact name to lowercase

    if (FirstNametoLowerCase === searchName) {
      return contact;
    } else if (FirstNametoLowerCase < searchName) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null; // Contact not found
}

// Function to handle search button click event
function handleSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchName = searchInput.value.trim();
  display.style.display = "none";
  searchInput.style.display = "block";

  if (searchName === "") {
    alert("Please enter a name to search");
    return;
  }

  const contact = binarySearch(phoneBook, searchName);

  if (contact) {
    document.getElementById(
      "resultsContainer"
    ).innerHTML = `<p class ="success">Name: ${contact.first_name}</p><p>Phone: ${contact.phone}</p>`;
  } else {
    document.getElementById("resultsContainer").innerHTML =
      '<p class ="error">Contact not found</p>';
  }
}

// Add event listener to search button
document.getElementById("searchButton").addEventListener("click", handleSearch);
document
  .getElementById("generateTable")
  .addEventListener("click", generateTable);
