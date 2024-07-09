/**
 * posts data
 */
import { all_posts } from "./data.mjs";

/**
 * category of posts to show
 */
let category_to_show = "";

/**
 * filter posts
 * @param {*} category
 */
export const filterPosts = (category = "") => {
    category_to_show = category;
    toggle_cards();
    hidePost();
};

/**
 * show a full post
 * @param {*} post_id
 */
export const showPost = (post_id) => {
    let post = all_posts.find(({ id }) => id == post_id);
    post.qt_views = 1 + Number(post.qt_views);
    document.getElementById("cards").style.display = "none";
    make_grid();
    make_post(post_id);
    document.getElementById("full_post").style.display = "block";
};

/**
 * hides the post in exhibition
 */
export const hidePost = () => {
    document.getElementById("full_post").style.display = "none";
    document.getElementById("cards").style.display = "flex";
    toggle_cards();
};

/**
 * toggles visibility of cards
 */
const toggle_cards = () => {
    if (category_to_show === "") {
        let result = document.getElementsByClassName("card");
        for (let index = 0; index < result.length; index++) {
            result.item(index).style.display = "block";
        }
    } else {
        let result = document.getElementsByClassName("card");
        for (let index = 0; index < result.length; index++) {
            result.item(index).style.display = "none";
        }
        result = document.getElementsByClassName(category_to_show);
        for (let index = 0; index < result.length; index++) {
            result.item(index).style.display = "block";
        }
    }
};

/**
 * makes a card
 * @param {*} post
 * @returns
 */
const get_card = (post) => {
    return `<div class="card ${post.categorie}" onclick="show_post(${post.id})">
    <div class="card_title">${post.title.slice(0, 30)}...</div>
    <img class="card_photo" src='./images/${post.id}.jpeg' />
    <div class="card_text">${post.text.slice(0, 80)}...</div>
    <div class="card_foot"><table><tr><td>${post.date}</td><td>Categoria:<br> ${
        post.categorie
    }</td><td>${post.qt_views} views</td></tr></table></div>
</div>`;
};

/**
 * makes a full post exhibition
 * @param {*} post_id
 */
const make_post = (post_id) => {
    const post = all_posts.filter((post) => post.id == post_id)[0];
    document.getElementById("full_post").innerHTML = `
    <div id="full_title">${post.title}</div>
    <div id="full_detail"><table><tr>
        <td>${post.date}</td>
        <td>Categoria: ${post.categorie}</td>
        <td>${post.qt_views} views</td>
    </tr></table><p id="button_close" onclick="hide_post()">Fechar</p></div>
    <div id="full_text">
        <img id="full_image" src="./images/${post.image}" 
            alt="${post.title}" title='clique para zoom in' onclick='image_click()'>
        <p>${post.text}
        </p>
    </div>`;
};

/**
 * makes the grid of cards
 */
const make_grid = () => {
    const grid = all_posts.reduce((acc, post) => acc + get_card(post), "");
    document.getElementById("cards").innerHTML = grid;
};

/**
 * lightbox effect
 */
export const imageClick = () => {
    let lightbox = document.getElementById("lightbox");
    let clone = document.getElementById("full_image").cloneNode();
    clone.className = "";
    clone.title = "clique para zoom out";
    lightbox.innerHTML = "";
    lightbox.appendChild(clone);
    lightbox.className = "show";
};

/**
 * close ligthbox
 */
export const lightboxClick = () => {
    lightbox.className = "";
};

/**
 * exposes exported module functions to window
 */
window.filter_posts = filterPosts;
window.show_post = showPost;
window.hide_post = hidePost;
window.image_click = imageClick;
window.lightbox_click = lightboxClick;
/**
 * starts
 */
make_grid();
