const CLOUD_NAME = "drafrahtw";
const CLOUDINARY_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;
const API_URL = "http://localhost:3001/kinalface/v1";

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("loginForm")) {
    initLogin();
    initRegister();
  }
  if (document.getElementById("feed")) {
    initDashboard();
  }
});

// --- HELPERS ---
function getImageUrl(photoPath) {
  if (
    !photoPath ||
    photoPath === "photos/default_user" ||
    photoPath === "photos/default_publication"
  ) {
    return "https://via.placeholder.com/400x300?text=KinalFace";
  }
  if (photoPath.startsWith("http")) return photoPath;
  if (photoPath.startsWith("facekinal/"))
    return `${CLOUDINARY_BASE}${photoPath}`;
  return `${CLOUDINARY_BASE}facekinal/publications/${photoPath}`;
}

function toggleAuth() {
  const loginCard = document.getElementById("loginCard");
  const registerCard = document.getElementById("registerCard");
  loginCard.style.display =
    loginCard.style.display === "none" ? "block" : "none";
  registerCard.style.display =
    registerCard.style.display === "none" ? "block" : "none";
}

// --- AUTH ---
function initLogin() {
  document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = document.getElementById("loginId").value;
    const password = document.getElementById("loginPass").value;
    try {
      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });
      const result = await res.json();
      if (result.success) {
        localStorage.setItem("userData", JSON.stringify(result.data));
        window.location.href = "dashboard.html";
      } else {
        alert(result.message);
      }
    } catch (err) {
      alert("Error de conexión");
    }
  });
}

function initRegister() {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("username", document.getElementById("regUsername").value);
      formData.append("email", document.getElementById("regEmail").value);
      formData.append("password", document.getElementById("regPassword").value);
      const photo = document.getElementById("regPhoto")?.files[0];
      if (photo) formData.append("photo", photo);

      try {
        const res = await fetch(`${API_URL}/users`, {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (result.success) {
          alert("¡Registro exitoso! Ya puedes logearte.");
          toggleAuth();
        }
      } catch (err) {
        console.error(err);
      }
    });
}

// --- DASHBOARD & POSTS ---
async function initDashboard() {
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!user) return (window.location.href = "index.html");

  document.getElementById("userDisplay").innerText = `Hola, ${user.username}`;
  await loadPosts();

  document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("title", document.getElementById("postTitle").value);
    formData.append("category", document.getElementById("postCategory").value);
    formData.append("content", document.getElementById("postContent").value);
    const photo = document.getElementById("postPhoto").files[0];
    if (photo) formData.append("photo", photo);

    const res = await fetch(`${API_URL}/publications`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) location.reload();
  });
}

async function loadPosts() {
  const user = JSON.parse(localStorage.getItem("userData"));
  const res = await fetch(`${API_URL}/publications`);
  const result = await res.json();
  const posts = result.data || [];
  const feed = document.getElementById("feed");

  feed.innerHTML = posts
    .map((post) => {
      const isOwner = post.userId === user._id;
      if (!post.isActive && !isOwner) return "";
      const postImg = getImageUrl(post.photo);

      return `
      <div class="post-card ${!post.isActive ? "post-inactive" : ""}">
          <div class="post-meta">
              <span class="category-badge">${post.category}</span>
              ${!post.isActive ? '<span class="status-badge">DESACTIVADA</span>' : ""}
              ${
                isOwner
                  ? `
                  <div class="owner-actions">
                      <button onclick="editPost('${post._id}', '${post.title}', '${post.content}')">✏️</button>
                      <button onclick="togglePostStatus('${post._id}', ${post.isActive})">
                          ${post.isActive ? "🚫" : "✅"}
                      </button>
                  </div>
              `
                  : ""
              }
          </div>
          <h3 class="post-title">${post.title}</h3>
          <p class="post-content">${post.content}</p>
          ${post.photo ? `<img src="${postImg}" class="post-img" alt="Post">` : ""}
          <div class="comment-section">
              <div id="comments-${post._id}"></div>
              <div class="comment-input-group">
                  <input type="text" id="input-${post._id}" placeholder="Comentar...">
                  <button class="btn-comment" onclick="addComment('${post._id}')">Enviar</button>
              </div>
          </div>
      </div>`;
    })
    .join("");
  posts.forEach((post) => loadComments(post._id));
}

// --- COMENTARIOS --
async function loadComments(postId) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const res = await fetch(`${API_URL}/comentaries/${postId}`);
  const result = await res.json();

  const comments = result.data || [];
  const box = document.getElementById(`comments-${postId}`);

  if (comments.length === 0) {
    box.innerHTML =
      '<p style="font-size: 0.8rem; color: #888;">Sin comentarios aún.</p>';
    return;
  }

  box.innerHTML = comments
    .map((c) => {
      const commentAuthorId = c.user._id || c.user;
      const isOwner = commentAuthorId === user._id;

      if (!c.isActive && !isOwner) return "";

      return `
      <div class="comment-item" style="${!c.isActive ? "opacity: 0.5; background: #f0f0f0;" : ""}">
          <div class="comment-body">
              <strong>${c.user.username || "Usuario"}:</strong> 
              <span>${c.text}</span>
              ${!c.isActive ? '<b style="color:red; font-size:10px;"> [DESACTIVADO]</b>' : ""}
          </div>
          ${
            isOwner
              ? `
              <div class="comment-actions">
                  <button onclick="editComment('${c._id}', '${c.text}', '${postId}')">✏️</button>
                  <button onclick="toggleCommentStatus('${c._id}', ${c.isActive}, '${postId}')">
                      ${c.isActive ? "🚫" : "✅"}
                  </button>
              </div>
          `
              : ""
          }
      </div>`;
    })
    .join("");
}

async function toggleCommentStatus(commentId, currentlyActive, postId) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const action = currentlyActive ? "desactivate" : "activate";

  try {
    const res = await fetch(`${API_URL}/comentaries/${commentId}/${action}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: user._id }),
    });

    const result = await res.json();
    if (result.success) {
      loadComments(postId);
    } else {
      alert(result.message || "Error al cambiar estado");
    }
  } catch (err) {
    console.error("Error toggle comment:", err);
  }
}

async function addComment(postId) {
  const input = document.getElementById(`input-${postId}`);
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!input.value) return;
  await fetch(`${API_URL}/comentaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      text: input.value,
      publication: postId,
      user: user._id,
    }),
  });
  input.value = "";
  loadComments(postId);
}

async function editComment(id, oldText, postId) {
  const nText = prompt("Editar comentario:", oldText);
  const user = JSON.parse(localStorage.getItem("userData"));
  if (!nText) return;
  await fetch(`${API_URL}/comentaries/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: nText, user: user._id }),
  });
  loadComments(postId);
}

// --- ACCIONES DE POSTS ---
async function editPost(id, title, content) {
  const nTitle = prompt("Nuevo título:", title);
  const nContent = prompt("Nuevo contenido:", content);
  if (!nTitle || !nContent) return;
  await fetch(`${API_URL}/publications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nTitle, content: nContent }),
  });
  location.reload();
}

async function togglePostStatus(id, currentlyActive) {
  const action = currentlyActive ? "desactivate" : "activate";
  await fetch(`${API_URL}/publications/${id}/${action}`, { method: "PUT" });
  location.reload();
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

async function changePassword() {
  const user = JSON.parse(localStorage.getItem("userData"));

  const passwordActual = prompt("Introduce tu contraseña actual:");
  if (!passwordActual) return;

  const passwordNueva = prompt("Introduce tu NUEVA contraseña:");
  if (!passwordNueva) return;

  try {
    const res = await fetch(`${API_URL}/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        passwordActual: passwordActual,
        passwordNueva: passwordNueva,
      }),
    });

    const result = await res.json();

    if (result.success) {
      alert("¡Contraseña actualizada con éxito!");
      logout();
    } else {
      alert(result.message || "Error al cambiar la contraseña");
    }
  } catch (err) {
    console.error("Error:", err);
    alert("Error de conexión con el servidor");
  }
}
