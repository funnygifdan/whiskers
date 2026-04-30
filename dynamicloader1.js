document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const contentArea = document.getElementById("dynamicContent");

  function closeMenuOverlay() {
    menuOverlay.classList.remove("open");
  }

  function openMenuOverlay() {
    menuOverlay.classList.add("open");
  }

  function toggleMenu() {
    menuOverlay.classList.toggle("open");
  }

  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuOverlay);

  // Dynamic loading with auto-close
  const menuLinks = menuOverlay.querySelectorAll("a");
  menuLinks.forEach(link => {
    link.addEventListener("click", e => {
      const url = link.getAttribute("href");

      if (url && !url.startsWith("http")) {
        e.preventDefault();
        fetch(url)
          .then(res => res.text())
          .then(html => {
            contentArea.innerHTML = html;
            closeMenuOverlay();
          })
          .catch(err => {
            contentArea.innerHTML = `<p style="color:red">Error loading page: ${err}</p>`;
            closeMenuOverlay();
          });
      } else {
        closeMenuOverlay(); // Still close even for external links
      }
    });
  });
});