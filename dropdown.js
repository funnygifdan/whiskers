document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".dropdown-btn").forEach(button => {
    button.addEventListener("click", () => {
      const dropdown = button.nextElementSibling;
      dropdown.classList.toggle("open");
    });
  });
});
