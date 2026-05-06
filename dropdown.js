document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     LIGHTBOX (image expand)
  ========================== */
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const img = document.createElement("img");
  lightbox.appendChild(img);
  document.body.appendChild(lightbox);

  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "IMG" && target.closest(".art-card")) {
      img.src = target.src;
      lightbox.classList.add("open");
    }
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    img.src = "";
  });


  /* =========================
     DROPDOWN MENU
  ========================== */
  document.querySelectorAll(".dropdown-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevents weird bubbling issues

      const menu = btn.nextElementSibling;
      if (!menu) return;

      menu.classList.toggle("open");
    });
  });

});
