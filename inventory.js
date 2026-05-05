document.addEventListener("click", function (e) {

  if (e.target.matches(".tab")) {

    const category = e.target.dataset.category;

    // update active tab
    document.querySelectorAll(".tab").forEach(btn => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    // switch gallery
    document.querySelectorAll(".gallery").forEach(gallery => {
      gallery.classList.remove("active");
    });

    document.getElementById(category).classList.add("active");
  }

});