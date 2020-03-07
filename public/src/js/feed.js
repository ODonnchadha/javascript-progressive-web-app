var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';

  if (deferredPromptBanner) {
    deferredPromptBanner.prompt();

    deferredPromptBanner.userChoice().then(function(result) {
      console.log('result.outcome ', result);

      if (result.outcome === 'dismissed') {
        console.log('Cancelled result');
      } else {
        console.log('Successful result');
      }

    });

    deferredPromptBanner = null;
  }
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

shareImageButton.addEventListener('click', openCreatePostModal);

closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);