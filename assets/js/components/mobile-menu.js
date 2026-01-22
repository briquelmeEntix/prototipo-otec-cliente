/**
 * Mobile Menu Component
 * Handles the responsive sidebar navigation for mobile devices
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileMenu);
    } else {
        initMobileMenu();
    }

    function initMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const sidebar = document.getElementById('sidebar');
        const mobileOverlay = document.getElementById('mobile-overlay');
        const closeMenuButton = document.getElementById('close-menu-button');

        // Check if elements exist (some pages might not have sidebar)
        if (!mobileMenuButton || !sidebar || !mobileOverlay) {
            return;
        }

        // Open menu
        function openMenu() {
            sidebar.classList.remove('-translate-x-full');
            sidebar.classList.add('translate-x-0');
            mobileOverlay.classList.remove('hidden');
            mobileOverlay.classList.add('block');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        // Close menu
        function closeMenu() {
            sidebar.classList.add('-translate-x-full');
            sidebar.classList.remove('translate-x-0');
            mobileOverlay.classList.add('hidden');
            mobileOverlay.classList.remove('block');
            document.body.style.overflow = ''; // Restore scrolling
        }

        // Event listeners
        mobileMenuButton.addEventListener('click', function (e) {
            e.stopPropagation();
            openMenu();
        });

        mobileOverlay.addEventListener('click', closeMenu);

        if (closeMenuButton) {
            closeMenuButton.addEventListener('click', closeMenu);
        }

        // Close menu when clicking on a navigation link (optional, for better UX)
        const navLinks = sidebar.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                // Only close on mobile
                if (window.innerWidth < 768) {
                    closeMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && !sidebar.classList.contains('-translate-x-full')) {
                closeMenu();
            }
        });

        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                // Close mobile menu if window is resized to desktop
                if (window.innerWidth >= 768) {
                    closeMenu();
                }
            }, 250);
        });
    }
})();
