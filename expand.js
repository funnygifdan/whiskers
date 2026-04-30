document.addEventListener("DOMContentLoaded", () => {
  // Create lightbox once
  const lightbox = document.createElement("div");
  lightbox.classList.add("lightbox");

  const img = document.createElement("img");
  lightbox.appendChild(img);

  document.body.appendChild(lightbox);

  // Open lightbox when any gallery image is clicked
  document.addEventListener("click", (e) => {
    const target = e.target;

    if (target.tagName === "IMG" && target.closest(".art-card")) {
      img.src = target.src;
      lightbox.classList.add("open");
    }
  });

  // Close on click
  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("open");
    img.src = "";
  });
});