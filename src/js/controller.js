const form = document.getElementById('contact-form');
const statusContainer = document.createElement('div');

document.addEventListener('DOMContentLoaded', () => {
  statusContainer.id = 'form-status';
  statusContainer.style.marginTop = '1rem';
  form.parentNode.insertBefore(statusContainer, form.nextSibling);

  form.addEventListener('submit', async e => {
    e.preventDefault();
    statusContainer.textContent = 'Sending…';
    const data = new FormData(form);
    console.log(data);

    try {
      const resp = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (resp.ok) {
        statusContainer.textContent =
          '✅ Thanks for reaching out! I’ll get back to you soon.';
        form.reset();
      } else {
        const err = await resp.json();
        statusContainer.textContent =
          '❌ Oops! ' + (err.error || 'Something went wrong.');
      }
    } catch (err) {
      statusContainer.textContent = '❌ Network error: ' + err.message;
    }
  });
});
