const API_URL = '/kinalface/v1';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) initLogin();
    if (document.getElementById('feed')) initDashboard();
});

function initLogin() {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const res = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'dashboard.html';
        } else {
            alert('Error: ' + data.message);
        }
    });
}

async function initDashboard() {
    await loadPosts();

    document.getElementById('postForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('postTitle').value;
        const content = document.getElementById('postContent').value;

        await fetch(`${API_URL}/publications`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ title, content })
        });
        location.reload();
    });
}

async function loadPosts() {
    const res = await fetch(`${API_URL}/publications`);
    const posts = await res.json();
    const feed = document.getElementById('feed');
    
    feed.innerHTML = posts.map(post => `
        <div class="card">
            <div class="post-header">${post.title || 'Publicación'}</div>
            <p>${post.content}</p>
            <hr>
            <div id="comments-${post._id}">
                <!-- Comentarios se cargan aquí -->
            </div>
            <input type="text" id="input-${post._id}" placeholder="Escribe un comentario...">
            <button class="btn-comment" onclick="addComment('${post._id}')">Comentar</button>
        </div>
    `).join('');
    posts.forEach(post => loadComments(post._id));
}

async function loadComments(postId) {
    const res = await fetch(`${API_URL}/comentaries/${postId}`);
    const comments = await res.json();
    const box = document.getElementById(`comments-${postId}`);
    box.innerHTML = comments.map(c => `
        <div class="comment-box">
            <strong>Usuario:</strong> ${c.text}
        </div>
    `).join('');
}

async function addComment(postId) {
    const text = document.getElementById(`input-${postId}`).value;
    await fetch(`${API_URL}/comentaries`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ text, publicationId: postId })
    });
    loadComments(postId);
}