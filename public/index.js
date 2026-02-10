const dialog = document.getElementById('dialog');
const closeBtn = document.getElementById('closeBtn');
const submitBtn = document.getElementById('submitBtn');
const passwordInput = document.getElementById('password');

let currentDeleteId = null;

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-modal')) {
    productIdToDelete = e.target.dataset.id;
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
    const deleteRes = await fetch(`/products/delete/${productIdToDelete}`, {
      method: 'POST'
    });

    if (deleteRes.ok) {
      window.location.href = '/products';
    }
  } else {
    alert('Invalid Password!');
  }
};

dialog.addEventListener('close', () => {
  passwordInput.value = ''; 
});

closeBtn.onclick = () => dialog.close();