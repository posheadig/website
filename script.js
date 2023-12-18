// Toggle display of About and Gallery sections based on navigation clicks
/*
document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.getElementById('about');
    const gallerySection = document.getElementById('gallery');
    const sidebar = document.querySelector('.sidebar');
    const aboutLink = document.getElementById('link-about');
    const projectsLink = document.getElementById('link-projects');

    // Initially display About and hide Gallery
    aboutSection.style.display = 'none';
    gallerySection.style.display = 'flex';
    sidebar.style.display = 'none';

    aboutLink.addEventListener('click', event => {
        event.preventDefault();
        aboutSection.style.display = 'block';
        gallerySection.style.display = 'none';
        sidebar.style.display = 'block'; 
    });

    projectsLink.addEventListener('click', event => {
        event.preventDefault();
        aboutSection.style.display = 'none';
        gallerySection.style.display = 'flex';
        sidebar.style.display = 'none';
    });

    // Add event listeners for other links if necessary
});
*/
// Email reveal function
function revealEmail() {
    let encodedEmail = 'cGNvc2hlYTJAZ21haWwuY29t'; // Replace with your Base64 encoded email
    let decodedEmail = atob(encodedEmail);
    document.getElementById('email').innerHTML = 'Email: <a href="mailto:' + decodedEmail + '">' + decodedEmail + '</a>';
}