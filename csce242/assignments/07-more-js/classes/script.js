/* song class */
class Song {
  constructor(title, artist, album, year, genre, image, youtubeCode) {
    this.title = title;
    this.artist = artist;
    this.album = album;
    this.year = year;
    this.genre = genre;
    this.image = image;
    this.youtubeCode = youtubeCode;
  }

  /* returns the image path relative to this page */
  getImagePath() {
    return `../../../assets/${this.image}`;
  }

  /* returns embed URL */
  getEmbedURL() {
    return `https://www.youtube.com/embed/${this.youtubeCode}`;
  }

  /* builds and returns a DOM element (card) for the gallery */
  getCard() {
    const section = document.createElement("section");
    section.classList.add("song-card");

    section.innerHTML = `
      <div class="song-card-header">
        <h3 class="song-title">${this.title}</h3>
        <p class="song-artist">By ${this.artist}</p>
      </div>
      <img class="song-cover" src="${this.getImagePath()}" alt="${this.album} cover art" />
    `;

    section.addEventListener("click", () => openModal(this));
    return section;
  }
}

/* song data */
const songs = [
  new Song(
    "Hell of a Time",
    "Hoodie Allen",
    "Whatever USA",
    2014,
    "Pop Rap",
    "HA.png",
    "wrYtf1ZavlU"
  ),

  new Song(
    "Under Pressure",
    "Logic",
    "Under Pressure",
    2014,
    "Hip-Hop",
    "logic.png",
    "oJAUMIvTXF4"
  ),

  new Song(
    "Fade Away",
    "Logic",
    "The Incredible True Story",
    2015,
    "Hip-Hop",
    "logic2.png",
    "tX2ruzIKL5c"
  ),

  new Song(
    "HOPE",
    "NF",
    "HOPE",
    2023,
    "Hip-Hop",
    "nf.png",
    "tsmPCi7NKrg"
  ),
];

/* dom references */
const gallery = document.getElementById("gallery");
const modalOverlay = document.getElementById("modal-overlay");
const modalIframe = document.getElementById("modal-iframe");
const modalTitle = document.getElementById("modal-title");
const modalArtist = document.getElementById("modal-artist");
const modalAlbum = document.getElementById("modal-album");
const modalGenre = document.getElementById("modal-genre");
const modalClose = document.getElementById("modal-close");

/* render gallery */
function renderGallery(songArray) {
  songArray.forEach((song) => {
    gallery.appendChild(song.getCard());
  });
}

/* modal helpers */
function openModal(song) {
  modalTitle.textContent = song.title;
  modalArtist.textContent = `by ${song.artist}`;
  modalAlbum.textContent = `${song.album}, ${song.year}`;
  modalGenre.textContent = song.genre;
  modalIframe.src = song.getEmbedURL();
  modalOverlay.classList.remove("hidden");
}

function closeModal() {
  modalOverlay.classList.add("hidden");
  modalIframe.src = "";
}

/* close via button, overlay click, or escape key (not required, but +) */
modalClose.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

/* init */
renderGallery(songs);