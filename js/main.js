/* ==========================================================================
   GLOBAL JAVASCRIPT - MINDCARE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navigation Scroll Effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scroll-active');
            } else {
                header.classList.remove('scroll-active');
            }
        });
    }

    // 2. Mobile Menu Toggling
    const hamburger = document.querySelector('.hamburger');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileOverlay = document.querySelector('.mobile-nav-overlay');

    if (hamburger && mobileNav) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            mobileNav.classList.toggle('open');
            if (mobileOverlay) mobileOverlay.classList.toggle('open');
        });

        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', () => {
                hamburger.classList.remove('open');
                mobileNav.classList.remove('open');
                mobileOverlay.classList.remove('open');
            });
        }
    }

    // 3. Highlight Active Navigation Page
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Match path names or fallback to home
        if (currentPath.includes(href) && href !== 'index.html' && href !== '') {
            link.classList.add('active');
        } else if ((currentPath.endsWith('/') || currentPath.includes('index.html')) && href === 'index.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // 4. Global Mock Authentication Protection
    const protectedPages = ['dashboard.html', 'mood-tracker.html', 'chatbot.html'];
    const authPages = ['login.html', 'signup.html'];
    const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);

    if (!localStorage.getItem("loggedInUser")) {

    window.location.href = "login.html";

}

    if (protectedPages.includes(currentPage)) {
        if (!currentUser) {
            // Redirect to login if trying to access dashboard/tracker/chatbot without login
            window.location.href = 'login.html?redirect=' + currentPage;
        } else {
            // Update profile info in sidebar/headers if elements exist
            const profileNameElements = document.querySelectorAll('.sidebar-profile-name, .user-profile-name');
            const profileAvatarElements = document.querySelectorAll('.profile-avatar, .user-avatar');
            
            profileNameElements.forEach(el => {
                el.textContent = currentUser.name || 'Student';
            });
            
            profileAvatarElements.forEach(el => {
                const initial = (currentUser.name || 'S').charAt(0).toUpperCase();
                el.textContent = initial;
            });
        }
    }

    if (authPages.includes(currentPage) && currentUser) {
        // Redirect to dashboard if already logged in and visiting auth pages
        window.location.href = 'dashboard.html';
    }

    // Logout handling
    const logoutBtns = document.querySelectorAll('.logout-btn');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('mindcare_user');
            window.location.href = 'index.html';
        });
    });

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
