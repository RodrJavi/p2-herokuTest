// Function to unfollow user
const unfollowUser = async () => {
  try {
    // Gets user name via the url
    const username = window.location.pathname.split("/").pop();

    // Delete method to the route
    const response = await fetch(`/api/users/unfollow`, {
      method: "DELETE",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      console.log(`Successfully unfollowed ${username}`);
    } else {
      console.log(response);
      console.log(`Error unfollowing ${username}`);
    }

    // Reloads the page with button click
    location.reload();
  } catch (error) {
    console.error("Error unfollowing", error);
  }
};

// Event listener for unfollow button
document.querySelector("#unfollowBtn").addEventListener("click", unfollowUser);
