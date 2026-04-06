  const userIcon = document.getElementById('userIcon');
  const dropdown = document.getElementById('dropdown');
  const logoutModal = document.getElementById('logoutModal');

  userIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.style.display = (dropdown.style.display === 'block') ? 'none' : 'block';
  });

  window.addEventListener('click', function () {
    dropdown.style.display = 'none';
  });

  function logout() {
    logoutModal.classList.add('show');
    dropdown.style.display = 'none';
  }

  function closeLogoutModal() {
    logoutModal.classList.remove('show');
  }

  function proceedLogout() {
    window.location.href = 'login.html';
  }

  logoutModal.addEventListener('click', function (event) {
    if (event.target === logoutModal) {
      closeLogoutModal();
    }
  });
