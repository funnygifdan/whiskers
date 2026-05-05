document.addEventListener("DOMContentLoaded", function () {

  // Load EmailJS v4 SDK dynamically (safe)
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
  document.head.appendChild(script);

  script.onload = function () {

    // INIT EmailJS
    emailjs.init({
      publicKey: "SRGwT3NbCw-Wu1wBc"
    });

    // FORM HANDLER
    document.addEventListener("submit", function (e) {
      if (e.target && e.target.id === "contactForm") {
        e.preventDefault();

        emailjs.sendForm(
          "service_9eckk4i",
          "template_m1soyic",
          e.target
        )
        .then(function (response) {
          console.log("SUCCESS:", response);
          alert("Message sent successfully!");
          e.target.reset();
        })
        .catch(function (error) {
          console.log("EMAILJS ERROR:", error);
          alert("Failed to send message. Check console.");
        });
      }
    });

  };

});