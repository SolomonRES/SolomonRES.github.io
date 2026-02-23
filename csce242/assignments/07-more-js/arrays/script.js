// associative arrays 
const happySongs = {
  "Can't Stop the Feeling! by Justin Timberlake": "ru0K8uYEZWw",
  "Happy by Pharrell Williams": "ZbZSe6N_BXs",
  "September by Earth, Wind & Fire": "Gs069dndIYk",
  "Walking On Sunshine by Katrina & the Waves": "iPUmE-tne5U",
  "Levitating by Dua Lipa": "TUVcZfQe-Kw"
};

const sadSongs = {
  "Someone Like You by Adele": "hLQl3WQQoQ0",
  "Drivers License by Olivia Rodrigo": "ZmDBbnmKpqQ",
  "Fix You by Coldplay": "k4V3Mo61fJM",
  "Whiskey Lullaby by Brad Paisley & Alison Krauss": "IZbN_mNre1U",
  "The Night We Met by Lord Huron": "KtlgYxa6BMU"
};

// grab the elements
const moodSelect = document.getElementById("mood-select");
const songList = document.getElementById("song-list");
const videoContainer = document.getElementById("video-container");
const videoPlayer = document.getElementById("video-player");

// hide video on load
videoContainer.style.display = "none";

// when the mood dropdown changes, show the matching song links
moodSelect.addEventListener("change", function () {
  // clear previous songs and hide video
  songList.innerHTML = "";
  videoContainer.style.display = "none";
  videoPlayer.src = "";

  const mood = moodSelect.value;
  if (!mood) return; // "Select" chosen - does nothing

  // pick the associative array
  const songs = mood === "happy" ? happySongs : sadSongs;

  // loop through the associative array and create a link for each song
  for (const songName in songs) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = songName;
    link.className = "song-link";

    // store the video ID on the element
    link.dataset.videoId = songs[songName];

    // clicking a song shows its video
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // mark active link
      const allLinks = songList.querySelectorAll(".song-link");
      for (let i = 0; i < allLinks.length; i++) {
        allLinks[i].classList.remove("active");
      }
      this.classList.add("active");

      const videoId = this.dataset.videoId;
      videoPlayer.src = "https://www.youtube.com/embed/" + videoId;
      videoContainer.style.display = "block";
    });

    songList.appendChild(link);
  }
});