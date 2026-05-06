document.addEventListener("click", (e) => {
  const target = e.target;

  // IGNORE dropdown interactions completely
  if (target.closest(".dropdown-btn") || target.closest(".dropdown-content")) {
    return;
  }

  if (target.tagName === "IMG" && target.closest(".art-card")) {
    const lightbox = document.querySelector(".lightbox");
    const img = lightbox.querySelector("img");

    img.src = target.src;
    lightbox.classList.add("open");
  }
});
