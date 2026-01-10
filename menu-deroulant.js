document.addEventListener('DOMContentLoaded', () => {
  const menuTitle = document.querySelector('.menu-title');
  const dropdown = document.querySelector('.dropdown-content');
  const links = dropdown.querySelectorAll('a');

  // Clic pour ouvrir/fermer menu
  menuTitle.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdown.classList.toggle('show');
    menuTitle.classList.toggle('active'); // pour le clic
  });

  document.addEventListener('click', function (e) {
    if (!dropdown.contains(e.target) && !menuTitle.contains(e.target)) {
      dropdown.classList.remove('show');
      menuTitle.classList.remove('active');
    }
  });

  // Gérer le scroll + lien actif
  const targetIds = [
    'qui-sommes-nous',
    'notre-histoire',
    'notre-equipe',
    'on-parle-de-nous'
  ];

  const sections = targetIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    entries => {
      let activeSection = entries.find(entry => entry.isIntersecting);

      if (activeSection) {
        const id = activeSection.target.id;
        menuTitle.classList.add('active-section');

        // Marquer le bon lien actif
        links.forEach(link => {
          link.classList.toggle('active-link', link.getAttribute('href') === `#${id}`);
        });
      } else {
        menuTitle.classList.remove('active-section');
        links.forEach(link => link.classList.remove('active-link'));
      }
    },
    {
      threshold: 0.4
    }
  );

  sections.forEach(section => observer.observe(section));
});





document.querySelector('.menu-title').addEventListener('click', () => {
  // Si on n'est pas sur la page 'qui-sommes-nous.html', on y va d'abord
  if (!window.location.pathname.endsWith('qui-sommes-nous.html')) {
    window.location.href = 'qui-sommes-nous.html#qui-sommes-nous';
  } else {
    // Sinon, juste faire défiler vers la section sur la même page
    window.location.hash = '#qui-sommes-nous';
  }
});




