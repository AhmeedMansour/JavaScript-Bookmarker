var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput = document.getElementById("bookmarkURL");
var SearchInput = document.getElementById('searchInput');
var bookmarksContainer = JSON.parse(localStorage.getItem("allBookmarks")) || [];
displayTables();

function getBookmark() {
  const bookmarkName = bookmarkNameInput.value.trim();
  const bookmarkURL = bookmarkURLInput.value.trim();

  if (!bookmarkName) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a Site Name!',
      footer: `<p class="text-start fw-semibold">
        <i class="fa fa-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="fa fa-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
      
    });
    return;
  }

  if (/[^a-zA-Z0-9\s]/.test(bookmarkName)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Site Name',
      text: 'Site Name should only contain letters, numbers, and spaces.',
      footer: `<p class="text-start fw-semibold">
        <i class="fa fa-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="fa fa-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
      
    });
    return;
  }

  
  if (!bookmarkURL) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a Site URL!',
      footer: `<p class="text-start fw-semibold">
        <i class="fa fa-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="fa fa-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
    });
    return;
  }

  if (!/^https?:\/\//i.test(bookmarkURL)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid URL',
      text: 'Site URL must start with http:// or https://',
      footer: `<p class="text-start fw-semibold">
        <i class="fa fa-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="fa fa-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
    });
    return;
  }

  const validDomainPattern = /\.(com|org|net|edu|gov|io|co|info)$/i;
  if (!validDomainPattern.test(bookmarkURL)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid URL',
      text: 'Please enter a valid Site URL with a recognized domain (e.g., .com, .org, .net).',
      footer: `<p class="text-start fw-semibold">
        <i class="fa fa-angle-double-right text-danger"></i> The Site Name must contain at least 3 characters. 
        <br>
        <i class="fa fa-angle-double-right text-danger"></i> The Site URL must be valid.</p>`
    });
    return;
  }

  var bookmark = {
    name: bookmarkName,
    url: bookmarkURL,
  };

  bookmarksContainer.push(bookmark);
  localStorage.setItem("allBookmarks", JSON.stringify(bookmarksContainer));
  displayTables();
  clearInputs();

  // Success Alert
  Swal.fire({
    icon: 'success',
    title: 'Bookmark Added',
    text: 'Your bookmark has been successfully added!',
  });
}


function displayTables() {
  let cartona = ``;
  for (let i = 0; i < bookmarksContainer.length; i++) {
    cartona += `
      <tr>
        <td>${i + 1}</td>
        <td>${bookmarksContainer[i].name}</td>
        <td>
          <a href="${bookmarksContainer[i].url}" target="_blank">
            <button class="btn btn-visit">
              <i class="fa-solid fa-eye pe-2"></i>Visit
            </button>
          </a>
        </td>
        <td>
          <button class="btn btn-delete" onclick="deleteBookmark(${i})">
            <i class="fa-solid fa-trash-can pe-2"></i>Delete
          </button>
        </td>
      </tr>`;
  }
  document.getElementById("bookmarkTable").innerHTML = cartona;
}

function clearInputs() {
  bookmarkNameInput.value = "";
  bookmarkURLInput.value = "";
}

function deleteBookmark(index) {
  bookmarksContainer.splice(index, 1);
  localStorage.setItem("allBookmarks", JSON.stringify(bookmarksContainer));
  displayTables();
}


const darkModeToggle = document.getElementById("darkModeToggle");
const sunIcon = document.getElementById("sun-icon");
const moonIcon = document.getElementById("moon-icon");


if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  sunIcon.style.opacity = 0; 
  moonIcon.style.opacity = 1;
}


darkModeToggle.addEventListener("click", function() {
  document.body.classList.toggle("dark-mode");


  if (document.body.classList.contains("dark-mode")) {
    sunIcon.style.opacity = 0;  
    moonIcon.style.opacity = 1;
    localStorage.setItem("darkMode", "enabled");  
  } else {
    sunIcon.style.opacity = 1;  
    moonIcon.style.opacity = 0; 
    localStorage.setItem("darkMode", "disabled");
  }
});