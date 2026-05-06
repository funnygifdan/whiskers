document.querySelectorAll(".dropdown-btn").forEach(button => {
  button.addEventListener("click", () => {
    const dropdown = button.nextElementSibling;

    dropdown.style.display =
      dropdown.style.display === "flex" ? "none" : "flex";
  });
});