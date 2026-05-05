document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const menuOverlay = document.getElementById("menuOverlay");
  const closeMenu = document.getElementById("closeMenu");
  const contentArea = document.getElementById("dynamicContent");

  // Footer year (small bonus fix)
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  function openMenu() {
    menuOverlay.classList.add("open");
  }

  function closeMenuOverlay() {
    menuOverlay.classList.remove("open");
  }

  function toggleMenu() {
    menuOverlay.classList.toggle("open");
  }

  if (menuToggle) menuToggle.addEventListener("click", toggleMenu);
  if (closeMenu) closeMenu.addEventListener("click", closeMenuOverlay);

  // 🧠 Dynamic page loader
  const menuLinks = menuOverlay.querySelectorAll("a");

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const page = link.dataset.page;

      // Only intercept internal pages
      if (page) {
        e.preventDefault();

        fetch(page)
          .then(res => {
            if (!res.ok) throw new Error("Page not found: " + page);
            return res.text();
          })
          .then(html => {
            contentArea.innerHTML = html;
            closeMenuOverlay();
            window.scrollTo({ top: 0, behavior: "smooth" });
          })
          .catch(err => {
            contentArea.innerHTML = `
              <div style="color:red;padding:20px;">
                <h3>Error loading page</h3>
                <p>${err.message}</p>
              </div>
            `;
            closeMenuOverlay();
          });
      } else {
        closeMenuOverlay();
      }
    });
  });
});