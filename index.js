// loader functionality
window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
})

// get all ten users and display them on the page
function getAllUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) {
                throw Error("ERROR");
            }
            return response.json();
        })
        .then(users => {
            const html = users.map(user => {
                return `
                <div class="user">
                    <p>Name: ${user.name}</p>
                    <p>Email: ${user.email}</p>
                    <button onClick="getUserPosts(${user.id})" class="user-posts-btn">Get Users' Posts</button>
                </div>
                `;
            }).join("");
            document.querySelector(".users").insertAdjacentHTML('afterbegin', html);

        })
}

getAllUsers();

// get each user's posts by passing id associated to the user
function getUserPosts(id) {
    const postContainer = document.querySelector(".posts");
    postContainer.innerHTML = "Posts Loading ...";
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then(response => response.json())
        .then(posts => {
            const html = posts.map(post => {
                return `
                <div class="post">
                    <h1 class="post-title">${post.title}</h1>
                    <p>${post.body}</p>
                </div>  
                `
            }).join("");
            postContainer.innerHTML = html;
        })
}

