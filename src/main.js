import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

searchForm.addEventListener('submit', async event => {
  event.preventDefault();

  query = event.currentTarget.elements['search-text'].value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({ message: 'Please enter a search term' });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (totalHits === 0) {
      iziToast.error({ message: 'Sorry, no images found!' });
    } else {
      createGallery(data.hits);
      checkPagination();
    }
  } catch (error) {
    iziToast.error({ message: error.message });
  } finally {
    hideLoader();
    event.target.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const galleryItem = document.querySelector('.gallery-item');
    if (galleryItem) {
      const { height: cardHeight } = galleryItem.getBoundingClientRect();
      window.scrollBy({ top: cardHeight * 2, behavior: 'smooth' });
    }

    checkPagination();
  } catch (error) {
    iziToast.error({ message: error.message });
  } finally {
    hideLoader();
  }
});

function checkPagination() {
  if (page * 15 >= totalHits) {
    hideLoadMoreButton();
    iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    showLoadMoreButton();
  }
}
