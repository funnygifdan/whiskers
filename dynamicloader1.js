// ===============================
// 🚀 DYNAMIC LOADER (EXPANDABLE)
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  // ===============================
  // 📌 CORE ELEMENTS
  // ===============================
  const contentArea = document.getElementById("dynamicContent");
  const menuOverlay = document.getElementById("menuOverlay");
  const menuToggle = document.getElementById("menuToggle");
  const closeMenuBtn = document.getElementById("closeMenu");

  // ===============================
  // 📅 FOOTER YEAR
  // ===============================
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ===============================
  // 🍔 MENU CONTROLS
  // ===============================
  function openMenu() {
    menuOverlay?.classList.add("open");
  }

  function closeMenu() {
    menuOverlay?.classList.remove("open");
  }

  function toggleMenu() {
    menuOverlay?.classList.toggle("open");
  }

  menuToggle?.addEventListener("click", toggleMenu);
  closeMenuBtn?.addEventListener("click", closeMenu);

  // ===============================
  // 🌐 PAGE LOADER FUNCTION
  // ===============================
  function loadPage(page) {
    if (!page) return;

    fetch(page)
      .then(res => {
        if (!res.ok) throw new Error(`Page not found: ${page}`);
        return res.text();
      })
      .then(html => {
        contentArea.innerHTML = html;

        // Close menu if open
        closeMenu();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: "smooth" });

        // 🔥 Hook: run page-specific scripts
        afterPageLoad(page);
      })
      .catch(err => {
        contentArea.innerHTML = `
          <div style="color:red;padding:20px;">
            <h3>Error loading page</h3>
            <p>${err.message}</p>
          </div>
        `;
      });
  }

  // ===============================
  // 🧠 GLOBAL CLICK HANDLER
  // ===============================
  document.addEventListener("click", (e) => {

    const link = e.target.closest("a[data-page]");

    if (!link) return;

    const page = link.dataset.page;

    if (page) {
      e.preventDefault();
      loadPage(page);
    }

  });

  // ===============================
  // 🔁 DEFAULT PAGE LOAD
  // ===============================
  function loadDefaultPage() {
    loadPage("listings.html"); // change if needed
  }

  loadDefaultPage();

  // ===============================
  // ⚙️ AFTER LOAD HOOK (EXPAND HERE)
  // ===============================
  function afterPageLoad(page) {

    // 👉 Example: highlight active tab
    highlightActiveTab(page);

    // 👉 Future features go here:
    // initGallery();
    // initFilters();
    // initForms();
  }

  // ===============================
  // 🎯 ACTIVE TAB HIGHLIGHT
  // ===============================
  function highlightActiveTab(page) {
    const tabs = document.querySelectorAll(".tab");

    tabs.forEach(tab => {
      tab.classList.remove("active");

      if (tab.dataset.page === page) {
        tab.classList.add("active");
      }
    });
  }

  // ===============================
  // 🔮 FUTURE FEATURES (ADD BELOW)
  // ===============================

  /*
  function initGallery() {
    console.log("Gallery initialized");
  }

  function initFilters() {
    console.log("Filters initialized");
  }

  function initForms() {
    console.log("Forms initialized");
  }
  */

});