// Add scroll class to header for shadow effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('mainHeader');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.add('scrolled'); // Always scrolled or dynamic shadow
            // actually dynamic shadow is better
            if (window.scrollY <= 20) {
                header.classList.remove('scrolled');
            }
        }
    });
});
