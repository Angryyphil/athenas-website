// Automatically update the copyright year
const yearSpan = document.querySelector('#current-year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Disable right-click context menu
document.addEventListener('contextmenu', event => event.preventDefault());

// Disable common keyboard shortcuts (Ctrl+C, Ctrl+U, F12 for Inspect)
document.onkeydown = function(e) {
  if (e.keyCode == 123) { // F12
    return false;
  }
  if (e.ctrlKey && (e.keyCode == 'U'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) {
    return false;
  }
};

// 1. Get the elements from the page
const contactForm = document.getElementById('contact-form');
const formContainer = document.getElementById('form-container');
const successMessage = document.getElementById('success-message');

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Stop the page from redirecting to Formspree
        
        const data = new FormData(event.target);
        const submitBtn = document.getElementById('submit-btn');
        
        // Change button text to show it's working
        submitBtn.innerHTML = "Sending...";
        submitBtn.disabled = true;

        // 2. Send the data to Formspree in the background
        fetch(event.target.action, {
            method: contactForm.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // 3. If successful, hide the form and show the success message!
                formContainer.style.display = "none";
                successMessage.style.display = "block";
                successMessage.style.animation = "fadeIn 0.5s ease-in-out";
            } else {
                alert("Oops! There was a problem submitting your form.");
                submitBtn.innerHTML = "Send Message";
                submitBtn.disabled = false;
            }
        }).catch(error => {
            alert("Error: Could not connect to the server.");
            submitBtn.innerHTML = "Send Message";
            submitBtn.disabled = false;
        });
    });
}