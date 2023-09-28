const searchBar = document.getElementById("searchbar");

// function to seach for the username typed in search box
async function searchUser() {
  const username = searchBar.value.trim();

  try {
    // Checks to see if a route to if the user exists
    const response = await fetch(`/api/users/${username}`);

    // If the user exists, directed to that user profile page
    if (response.ok) {
      document.location.replace(`/profile/${username}`);

      // If user does not exist, redirect to homepage
    } else {
      document.location.replace("/");
    }
  } catch (error) {}
}

// Event listener that listens for enter key press
searchBar.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchUser();
  }
});
