/* =============================================
   NOI OUTLET — Premium Interactions
   ============================================= */
(function () {
    'use strict';

    /* ----------------------------------------
       HERO SLIDER
    ---------------------------------------- */
    var slides   = document.querySelectorAll('.hero-slide');
    var dots     = document.querySelectorAll('.hero-dot');
    var counter  = document.querySelector('.hero-counter');
    var current  = 0;
    var total    = slides.length;
    var autoPlay;

    function showSlide(idx) {
        slides.forEach(function (s) { s.classList.remove('active'); });
        dots.forEach(function (d) {
            d.classList.remove('active');
            d.setAttribute('aria-selected', 'false');
        });
        current = (idx + total) % total;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
        if (counter) {
            var n = (current + 1).toString().padStart(2, '0');
            counter.textContent = n + ' / ' + total.toString().padStart(2, '0');
        }
    }

    function next() { showSlide(current + 1); }

    function startAuto() {
        clearInterval(autoPlay);
        autoPlay = setInterval(next, 6000);
    }

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            showSlide(parseInt(dot.dataset.target, 10));
            startAuto();
        });
    });

    /* Swipe support */
    var touchStartX = 0;
    var hero = document.querySelector('.hero-slider');
    if (hero) {
        hero.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        hero.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].screenX;
            if (Math.abs(diff) > 50) { diff > 0 ? next() : showSlide(current - 1); startAuto(); }
        }, { passive: true });
    }

    if (total > 0) startAuto();

    /* ----------------------------------------
       STICKY NAV
    ---------------------------------------- */
    var nav = document.getElementById('siteNav');
    if (nav) {
        window.addEventListener('scroll', function () {
            nav.classList.toggle('scrolled', window.scrollY > 80);
        }, { passive: true });
    }

    /* ----------------------------------------
       ACTIVE ANCHOR LINK (IntersectionObserver)
    ---------------------------------------- */
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a[data-section]');

    if (navLinks.length && sections.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var id = entry.target.getAttribute('id');
                    navLinks.forEach(function (link) {
                        link.classList.toggle('active', link.dataset.section === id);
                    });
                }
            });
        }, { rootMargin: '-64px 0px -55% 0px', threshold: 0 });

        sections.forEach(function (s) { io.observe(s); });
    }

    /* ----------------------------------------
       MOBILE HAMBURGER
    ---------------------------------------- */
    var hamburger     = document.getElementById('hamburger');
    var mobileNav     = document.getElementById('mobileNav');
    var mobileOverlay = document.getElementById('mobileOverlay');
    var mobileClose   = document.getElementById('mobileClose');

    function openMenu() {
        if (mobileNav)     mobileNav.classList.add('open');
        if (mobileOverlay) mobileOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu() {
        if (mobileNav)     mobileNav.classList.remove('open');
        if (mobileOverlay) mobileOverlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (hamburger)     hamburger.addEventListener('click', openMenu);
    if (mobileClose)   mobileClose.addEventListener('click', closeMenu);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
    if (mobileNav) {
        mobileNav.querySelectorAll('a').forEach(function (a) {
            a.addEventListener('click', closeMenu);
        });
    }

    /* ----------------------------------------
       SMOOTH SCROLL for anchor links
    ---------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var top = target.getBoundingClientRect().top + window.scrollY - 64;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

    /* ----------------------------------------
       FAQ ACCORDION
    ---------------------------------------- */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item   = btn.closest('.faq-item');
            var isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item.open').forEach(function (el) { el.classList.remove('open'); });
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ----------------------------------------
       SCROLL-TRIGGERED FADE-UP
    ---------------------------------------- */
    var fadeEls = document.querySelectorAll('.fade-up, .section-header, .display-title, .store-card, .service-cell, .step-cell, .circ-cell, .partner-cell');

    if ('IntersectionObserver' in window) {
        var fadeIO = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    fadeIO.unobserve(e.target);
                }
            });
        }, { threshold: 0.1 });

        fadeEls.forEach(function (el, i) {
            el.classList.add('fade-up');
            el.style.transitionDelay = (i % 4 * 90) + 'ms';
            fadeIO.observe(el);
        });
    } else {
        fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

})();
