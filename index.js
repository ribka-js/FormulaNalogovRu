// index.js - Основной JavaScript файл для сайта Формула налога

document.addEventListener('DOMContentLoaded', function() {
    
    /* ======================================== */
    /* МОБИЛЬНОЕ МЕНЮ (БУРГЕР) */
    /* ======================================== */
    
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links .TextNav, .mobile-phone, .mobile-social-btn');
    
    if (burgerMenu && mobileMenu && menuOverlay) {
        
        function openMobileMenu() {
            burgerMenu.classList.add('active');
            mobileMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeMobileMenu() {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Используем только click событие - оно работает на всех устройствах
        burgerMenu.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        menuOverlay.addEventListener('click', function() {
            closeMobileMenu();
        });
        
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                closeMobileMenu();
            });
        });
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        });
    }

    /* ======================================== */
    /* КОПИРОВАНИЕ ТЕЛЕФОНА */
    /* ======================================== */
    
    const phoneBox = document.getElementById('phone-box');
    
    if (phoneBox) {
        const tooltip = phoneBox.querySelector('.home-tooltip');
        const copiedIndicator = phoneBox.querySelector('.home-copied-indicator');
        const phoneNumber = '+7 (912) 446-92-02';
        
        if (tooltip) tooltip.style.display = 'none';
        if (copiedIndicator) copiedIndicator.style.display = 'none';
        
        function copyPhoneNumber(e) {
            e.preventDefault(); // Работает для всех устройств
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(phoneNumber).then(() => {
                    showCopiedFeedback();
                }).catch(() => {
                    fallbackCopy();
                });
            } else {
                fallbackCopy();
            }
            
            function showCopiedFeedback() {
                phoneBox.classList.add('copied');
                if (copiedIndicator) copiedIndicator.style.display = 'flex';
                if (tooltip) tooltip.style.display = 'none';
                
                setTimeout(() => {
                    phoneBox.classList.remove('copied');
                    if (copiedIndicator) copiedIndicator.style.display = 'none';
                }, 2000);
            }
            
            function fallbackCopy() {
                const textArea = document.createElement('textarea');
                textArea.value = phoneNumber;
                textArea.style.position = 'fixed';
                textArea.style.left = '-9999px';
                textArea.style.top = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                textArea.remove();
                showCopiedFeedback();
            }
        }
        
        // Убираем touchstart, оставляем только click
        phoneBox.addEventListener('click', copyPhoneNumber);
        
        if (tooltip) {
            phoneBox.addEventListener('mouseenter', function() {
                if (!phoneBox.classList.contains('copied')) {
                    tooltip.style.display = 'block';
                }
            });
            
            phoneBox.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });
        }
    }

    /* ======================================== */
    /* ВИДЕО ПЛЕЕР */
    /* ======================================== */
    
    const video = document.querySelector('.home-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const soundBtn = document.getElementById('sound-btn');
    const videoOverlay = document.querySelector('.home-video-overlay');
    
    if (video) {
        
        function toggleVideoPlayback(e) {
            e.preventDefault(); // Работает для всех устройств
            
            if (video.paused) {
                video.play().catch(err => console.log('Ошибка воспроизведения:', err));
            } else {
                video.pause();
            }
        }
        
        // Убираем touchstart, оставляем только click
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', toggleVideoPlayback);
        }
        
        if (videoOverlay) {
            videoOverlay.addEventListener('click', toggleVideoPlayback);
        }
        
        if (soundBtn) {
            soundBtn.addEventListener('click', function(e) {
                e.preventDefault();
                video.muted = !video.muted;
                this.innerHTML = video.muted ? '🔇 Выкл' : '🔊 Вкл';
            });
        }
        
        video.addEventListener('play', function() {
            if (playPauseBtn) playPauseBtn.innerHTML = '⏸️ Пауза';
            if (videoOverlay) videoOverlay.style.opacity = '0';
        });
        
        video.addEventListener('pause', function() {
            if (playPauseBtn) playPauseBtn.innerHTML = '▶ Воспроизвести';
            if (videoOverlay) videoOverlay.style.opacity = '1';
        });
        
        video.addEventListener('ended', function() {
            if (playPauseBtn) playPauseBtn.innerHTML = '▶ Воспроизвести';
            if (videoOverlay) videoOverlay.style.opacity = '1';
        });
    }

    /* ======================================== */
    /* КНОПКИ ЗАКАЗА В TELEGRAM */
    /* ======================================== */
    
    const orderButtons = document.querySelectorAll('.catalog-buy-btn, .catalog-cta-btn, .footer-order-btn, .about-cta-button');
    
    orderButtons.forEach(button => {
        function openTelegram(e) {
            e.preventDefault(); // Работает для всех устройств
            
            let serviceName = 'консультация';
            const serviceCard = this.closest('.catalog-service-card');
            
            if (serviceCard) {
                const serviceNameElement = serviceCard.querySelector('.catalog-service-name');
                if (serviceNameElement) {
                    serviceName = serviceNameElement.textContent.trim();
                }
            } else if (this.classList.contains('catalog-cta-btn')) {
                serviceName = 'индивидуальная консультация';
            } else if (this.classList.contains('about-cta-button')) {
                serviceName = 'консультация';
            }
            
            const message = `Здравствуйте! Хочу заказать услугу: ${serviceName}`;
            const telegramUrl = `https://t.me/KosarevaKEA?text=${encodeURIComponent(message)}`;
            window.open(telegramUrl, '_blank');
        }
        
        // Убираем touchstart, оставляем только click
        button.addEventListener('click', openTelegram);
    });

    /* ======================================== */
    /* ССЫЛКИ - добавляем cursor: pointer */
    /* ======================================== */
    
    // Добавляем CSS для улучшения кликабельности на мобильных
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .home-box, .catalog-buy-btn, .catalog-cta-btn, .footer-order-btn, 
            .about-cta-button, .TextNav, .mobile-phone, .mobile-social-btn,
            .burger-menu, .footer-social-btn, .footer-links a {
                cursor: pointer !important;
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0.3);
                touch-action: manipulation; /* Отключает двойное нажатие для зума */
            }
            
            /* Убираем задержку при нажатии */
            .home-box, .catalog-buy-btn, .catalog-cta-btn, .footer-order-btn,
            .about-cta-button, .TextNav, .burger-menu {
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                user-select: none;
            }
        }
    `;
    document.head.appendChild(style);

    /* ======================================== */
    /* ПЛАВНАЯ ПРОКРУТКА */
    /* ======================================== */
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    /* ======================================== */
    /* ХЕДЕР ПРИ СКРОЛЛЕ */
    /* ======================================== */
    
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    let ticking = false;
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (scrollTop > 100 && mobileMenu && !mobileMenu.classList.contains('active')) {
                        header.style.transform = scrollTop > lastScrollTop ? 'translateY(-100%)' : 'translateY(0)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                    
                    lastScrollTop = scrollTop;
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });
    }

    /* ======================================== */
    /* Улучшение для мобильных устройств */
    /* ======================================== */
    
    // Убираем задержку в 300ms на мобильных
    if ('ontouchstart' in window) {
        document.documentElement.style.touchAction = 'manipulation';
    }
    
    console.log('Сайт успешно загружен');
});