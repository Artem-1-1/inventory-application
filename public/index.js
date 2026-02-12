const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('closeBtn');
const submitBtn = document.getElementById('submitBtn');
const passwordInput = document.getElementById('password');

if (!dialog || !closeBtn || !submitBtn || !passwordInput) {
} else {
  let currentProductId = null;
  let currentAction = null;

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-modal')) {
    currentProductId = e.target.dataset.id;
    currentAction = e.target.classList.contains('editBtn') ? 'edit' : 'delete';
    dialog.showModal();
  }
});

submitBtn.onclick = async () => {
  const password = passwordInput.value;

  const checkRes = await fetch('/products/check-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password })
  });

  if (checkRes.ok) {
    if (currentAction === 'edit') {
      window.location.href = `/products/edit/${currentProductId}`;
    } else {
      const deleteRes = await fetch(`/products/delete/${currentProductId}`, {
        method: 'POST'
      });
      if (deleteRes.ok) {
        window.location.href = '/products';
      }
    }
  } else {
    alert('Invalid Password!');
  }
};

dialog.addEventListener('close', () => {
  passwordInput.value = ''; 
});

closeBtn.onclick = () => dialog.close();
}