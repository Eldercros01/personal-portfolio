
// ========== CAMBIO DE TEMA ==========
const toggleTheme = () => {
  document.body.classList.toggle('light-theme');
};

// ========== ANIMACIÓN SUAVE AL HACER CLICK ==========
document.querySelectorAll('a.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = document.querySelector(link.getAttribute('href'));
    section.scrollIntoView({ behavior: 'smooth' });
  });
});

// ========== BOTÓN DE CAMBIO DE TEMA ==========
const themeButton = document.createElement('button');
themeButton.textContent = '🌓 Tema';
themeButton.id = 'theme-toggle';
themeButton.style.position = 'fixed';
themeButton.style.bottom = '20px';
themeButton.style.right = '20px';
themeButton.style.padding = '10px 15px';
themeButton.style.background = '#f97316';
themeButton.style.border = 'none';
themeButton.style.color = '#fff';
themeButton.style.borderRadius = '6px';
themeButton.style.cursor = 'pointer';
themeButton.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
themeButton.style.zIndex = '1000';
document.body.appendChild(themeButton);

themeButton.addEventListener('click', toggleTheme);
