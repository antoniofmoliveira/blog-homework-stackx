/**
 * @module posts
 * @description Module for posts
 */
import { all_posts } from "./data";

/**
 * The category of posts to show
 * @type {string}
 */
let category_to_show = "";

/**
 * Filter the posts to show
 * @param {string} [category=""] The category of posts to show
 * @returns {void}
 */
export const filterPosts = (category = "") => {
  category_to_show = category;
  toggle_cards();
  hidePost();
};

/**
 * Displays a full post by updating the number of views, hiding the cards,
 * making the grid, making the post, and displaying the full post.
 *
 * @param {string} post_id - The ID of the post to display.
 * @return {void} This function does not return anything.
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
 * Hides the full post and shows the cards.
 *
 * @return {void} This function does not return anything.
 */
export const hidePost = () => {
  document.getElementById("full_post").style.display = "none";
  document.getElementById("cards").style.display = "flex";
  toggle_cards();
};

/**
 * Toggles the visibility of cards based on the category_to_show variable.
 *
 * If category_to_show is an empty string, all cards are displayed.
 * If category_to_show is a non-empty string, all cards are hidden except for those with a class matching category_to_show.
 *
 * @return {void} This function does not return anything.
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
 * Generates a card element for a given post.
 *
 * @param {Object} post - The post object containing information about the post.
 * @param {string} post.categorie - The category of the post.
 * @param {string} post.title - The title of the post.
 * @param {string} post.text - The text content of the post.
 * @param {string} post.date - The date of the post.
 * @param {number} post.qt_views - The number of views for the post.
 * @return {string} The HTML string representing the card element.
 */
const get_card = (post) => {
  return `<div class="card ${post.categorie}" onclick="show_post(${post.id})">
    <div class="card_title">${post.title.slice(0, 30)}...</div>
    <img class="card_photo" src='./images/${post.id}.jpg' />
    <div class="card_text">${post.text.slice(0, 80)}...</div>
    <div class="card_foot"><table><tr><td>${post.date}</td><td>Categoria:<br> ${
    post.categorie
  }</td><td>${post.qt_views} views</td></tr></table></div>
</div>`;
};

/**
 * Generates a full post exhibition by setting the content of the 'full_post' element in the document.
 *
 * @param {number} post_id - The ID of the post to display.
 * @return {void} This function does not return a value.
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
 * Generates a grid of cards by reducing the array of all posts into a string
 * of HTML card elements, and then sets the innerHTML of the 'cards' element
 * in the document to the generated grid.
 *
 * @return {void} This function does not return a value.
 */
const make_grid = () => {
  const grid = all_posts.reduce((acc, post) => acc + get_card(post), "");
  document.getElementById("cards").innerHTML = grid;
};

/**
 * Handles the click event on an image, creating a lightbox effect.
 *
 * @return {void} This function does not return a value.
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
 * Closes the lightbox by removing the 'show' class from the lightbox element.
 *
 * @return {void} This function does not return a value.
 */
export const lightboxClick = () => {
  lightbox.className = "";
};

/**
 * Binds the 'filter_posts' function to the 'window' object,
 * making it accessible from the global scope.
 *
 * @function
 * @param {string} category - The category to filter the posts by.
 */
window.filter_posts = filterPosts;

/**
 * Binds the 'show_post' function to the 'window' object,
 * making it accessible from the global scope.
 *
 * @function
 * @param {number} id - The ID of the post to show.
 */
window.show_post = showPost;

/**
 * Binds the 'hide_post' function to the 'window' object,
 * making it accessible from the global scope.
 *
 * @function
 * @param {number} id - The ID of the post to hide.
 */
window.hide_post = hidePost;

/**
 * Binds the 'image_click' function to the 'window' object,
 * making it accessible from the global scope.
 *
 * @function
 */
window.image_click = imageClick;

/**
 * Binds the 'lightbox_click' function to the 'window' object,
 * making it accessible from the global scope.
 *
 * @function
 */
window.lightbox_click = lightboxClick;

/**
 * Calls the 'make_grid' function to generate a grid of cards on the webpage.
 * This function is called when the script is loaded.
 */
make_grid();
