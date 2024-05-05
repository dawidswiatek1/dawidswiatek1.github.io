function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  }
  
  document.getElementById('callButton').addEventListener('click', function() {
    window.location.href = 'tel:NUMER_TELEFONU';
  });