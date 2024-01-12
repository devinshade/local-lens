const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#venue-name').value.trim();
  const reviewRating= document.querySelector('#review-rating').value.trim();
  const reviewContent = document.querySelector('#review-content').value.trim();

  if (name && reviewRating && reviewContent) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, reviewRating, reviewContent }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/projects/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete project');
    }
  }
};

document
  .querySelector('#blog-submit-btn')
  .addEventListener('click', newFormHandler);

document
  .querySelector('.review-list')
  .addEventListener('click', delButtonHandler);
