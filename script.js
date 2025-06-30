const CLAVE_MAESTRA = "bremyebhelizlasamo"; // 🔐 Cambia esta clave
const ITEMS_PER_PAGE = 20;
let currentPage = 1;
let videos = [];

document.getElementById("entrar").addEventListener("click", () => {
  const clave = document.getElementById("clave").value;
  if (clave === CLAVE_MAESTRA) {
    document.getElementById("login").style.display = "none";
    document.getElementById("contenido").style.display = "block";
    cargarVideos();
  } else {
    alert("❌ Clave incorrecta.");
  }
});

function cargarVideos() {
  fetch("videos.json")
    .then(res => res.json())
    .then(data => {
      videos = data;
      renderVideos();
    })
    .catch(err => {
      document.getElementById("video-container").innerHTML = "<p>Error cargando videos.</p>";
      console.error(err);
    });
}

function renderVideos() {
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const pageItems = videos.slice(start, end);

  const container = document.getElementById("video-container");
  container.innerHTML = "";

  pageItems.forEach(video => {
    const div = document.createElement("div");
    div.className = "video-card";
    div.innerHTML = `
      <h3>${video.title}</h3>
      <iframe src="${video.url}" allowfullscreen></iframe>
    `;
    container.appendChild(div);
  });

  renderPagination();
}

function renderPagination() {
  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const pag = document.getElementById("pagination");
  pag.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === currentPage ? "disabled" : "";
    if (i !== currentPage) {
      btn.onclick = () => {
        currentPage = i;
        renderVideos();
      };
    }
    pag.appendChild(btn);
  }
}
