const followUser = async () => {
  // Gets username of the Y user's profile that is currently being viewed by taking the last param in the route
  const username = window.location.pathname.split("/").pop();

  // Post request to create a follower model to have current logged in user follow the user of the viewed profile
  const response = await fetch("/api/users/followUser", {
    method: "POST",
    body: JSON.stringify({ username }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    console.log("Successfully made follow request");
  }

  location.reload();
};

document.querySelector("#followBtn").addEventListener("click", followUser);
