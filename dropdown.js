document.addEventListener("DOMContentLoaded", function () {
  console.log("dropdown.js loaded");

  const buttons = document.querySelectorAll(".dropdown-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      const dropdown = this.nextElementSibling;

      if (!dropdown) {
        console.log("Dropdown not found");
        return;
      }

      dropdown.classList.toggle("open");
    });
  });
});
