import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const loadMoreBtn = document.querySelector('.load-more');

export function createGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a class="gallery-link" href="${img.largeImageURL}">
        <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p><b>Likes</b><br>${img.likes}</p>
        <p><b>Views</b><br>${img.views}</p>
        <p><b>Comments</b><br>${img.comments}</p>
        <p><b>Downloads</b><br>${img.downloads}</p>
      </div>
    </li>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function showLoader() {
  document.querySelector('.loader').classList.remove('is-hidden');
}

export function hideLoader() {
  document.querySelector('.loader').classList.add('is-hidden');
}

// Нові функції для кнопки
export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}
