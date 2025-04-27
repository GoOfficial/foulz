// Show/Hide Back to Top Button
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
backToTopBtn.addEventListener('click', function() {
    window.scrollTo({top: 0, behavior: 'smooth'});
});
