// Error Modal Code 
document.addEventListener('DOMContentLoaded', function() {
    const errorModal = document.querySelector('.error-modal');
    const errorMessage = document.querySelector('.error-modal-message');
    const errorModalTitle = document.querySelector('.error-modal-title');
    const closeModalBtn = document.querySelector('.error-modal-close');
    
    // Error messages
    const errorMessages = {
        signup: 'Sign Up functionality is coming soon!',
        login: 'Login functionality is coming soon!',
        courses: 'Course purchase functionality is not available yet.',
        viewAll: 'View All functionality will be added soon.',
        checkout: 'Checkout functionality is not available yet.',
        social: 'Social media links are for demonstration only.',
        testimonial: 'Full testimonial story is not available.'
    };

    function showErrorModal(message, title = 'Notification') {
        errorMessage.textContent = message;
        errorModalTitle.textContent = title;
        errorModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeErrorModal() { 
        errorModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Modal closing handlers
    closeModalBtn.addEventListener('click', closeErrorModal);
    
    errorModal.addEventListener('click', (e) => {
        if (e.target === errorModal) closeErrorModal();
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeErrorModal();
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Calculate offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - navbarHeight - 20;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL hash without scrolling
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Navigation handlers
    document.querySelectorAll('.nav-text[href="#signup"], .nav-button[href="#login"]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const isSignup = button.getAttribute('href') === '#signup';
            showErrorModal(
                isSignup ? errorMessages.signup : errorMessages.login,
                isSignup ? 'Sign Up' : 'Login'
            );
        });
    });
   
    // View All buttons
    document.querySelectorAll('.view-all, .See-all').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            showErrorModal(errorMessages.viewAll, 'Coming Soon');
        });
    });

    // Course buttons
    document.querySelectorAll('.cta').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseTitle = button.closest('.course-card').querySelector('h3').textContent;
            showErrorModal(
                `"${courseTitle}" - ${errorMessages.courses}`,
                'Course Enrollment'
            );
        });
    });

    // Testimonial functionality
    document.querySelectorAll('.read-story').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const userName = button.closest('.testimonial-user').querySelector('h3').textContent;
            showErrorModal(
                `Full story for ${userName} is not available. ${errorMessages.testimonial}`,
                'Testimonial Story'
            );
        });
    });

    // Pricing toggle functionality
    const monthlyBtn = document.querySelector('.monthly-active');
    const yearlyBtn = document.querySelector('.yearly');
    const timeElements = document.querySelectorAll('.time');
    const proPriceElement = document.querySelector('.pricing-card.featured .price');
    
    // Initialize pricing
    updatePrices('monthly');
    
    monthlyBtn.addEventListener('click', () => {
        if (!monthlyBtn.classList.contains('active')) {
            monthlyBtn.classList.add('active');
            monthlyBtn.setAttribute('aria-pressed', 'true');
            yearlyBtn.classList.remove('active');
            yearlyBtn.setAttribute('aria-pressed', 'false');
            updatePrices('monthly');
        }
    });

    yearlyBtn.addEventListener('click', () => {
        if (!yearlyBtn.classList.contains('active')) {
            yearlyBtn.classList.add('active');
            yearlyBtn.setAttribute('aria-pressed', 'true');
            monthlyBtn.classList.remove('active');
            monthlyBtn.setAttribute('aria-pressed', 'false');
            updatePrices('yearly');
        }
    });

    function updatePrices(plan) {
        const yearlyPrice = (450 * 12 * 0.9).toFixed(0); // 10% discount for yearly
        
        timeElements.forEach(time => {
            time.textContent = plan === 'yearly' ? '/year' : '/month';
        });
        
        if (proPriceElement) {
            proPriceElement.textContent = plan === 'yearly' 
                ? `BDT ${yearlyPrice}` 
                : 'BDT 450';
        }
        
        // Update time display for featured card
        const featuredTime = document.querySelector('.pricing-card.featured .time');
        if (featuredTime) {
            featuredTime.textContent = plan === 'yearly' ? '/year' : '/month';
        }
    }

    // FAQ functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const icon = question.querySelector('i');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    const otherIcon = item.querySelector('.faq-question i');
                    if (otherIcon) {
                        otherIcon.classList.remove('ti-minus');
                        otherIcon.classList.add('ti-plus');
                    }
                }
            });
            
            // Toggle current FAQ item
            const isActive = faqItem.classList.contains('active');
            faqItem.classList.toggle('active');
            
            // Change icon
            if (faqItem.classList.contains('active')) {
                icon.classList.remove('ti-plus');
                icon.classList.add('ti-minus');
            } else {
                icon.classList.remove('ti-minus');
                icon.classList.add('ti-plus');
            }
        });
    });

    // Social media functionality
    document.querySelectorAll('.social-icons a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = link.getAttribute('aria-label');
            showErrorModal(
                `${platform} link is for demonstration. ${errorMessages.social}`,
                'Social Media'
            );
        });
    });

    // Buy button functionality
    document.querySelectorAll('.buy-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const planTitle = button.closest('.pricing-card').querySelector('.plan-title').textContent;
            showErrorModal(
                `${planTitle} - ${errorMessages.checkout}`,
                'Get Started'
            );
        });
    });
    
    // Hero buttons
    document.querySelectorAll('.hero-buttons .explore, .hero-buttons .pricing').forEach(button => {
        button.addEventListener('click', (e) => {
            // Smooth scrolling is already handled by the anchor links
            // No need for extra functionality here
        });
    });
    
    // Benefit card arrow functionality
    document.querySelectorAll('.benefit-card i').forEach(arrow => {
        arrow.addEventListener('click', () => {
            const benefitTitle = arrow.closest('.benefit-card').querySelector('h3').textContent;
            showErrorModal(
                `More details about "${benefitTitle}" will be available soon.`,
                'Benefit Details'
            );
        });
    });
    
    // Form submission prevention (if any forms are added in the future)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            showErrorModal('Form submission is not available in this demo.', 'Form Submission');
        });
    });
    
    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            
            const href = link.getAttribute('href');
            if (href === `#${current}` || (current === '' && href === '#')) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call
    
    // Responsive navigation for mobile (if needed in future)
    function handleResize() {
        const navbar = document.querySelector('.navbar');
        const navbarLeft = document.querySelector('.navbar-left');
        const navbarRight = document.querySelector('.navbar-right');
        
        if (window.innerWidth <= 768) {
            // Mobile adjustments if needed
        } else {
            // Desktop adjustments if needed
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Add loading animation for buttons
    document.querySelectorAll('button, .cta, .buy-btn, .view-all').forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .loaded {
            animation: fadeIn 0.5s ease-in;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize tooltips (if needed)
    document.querySelectorAll('[title]').forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('title');
            tooltip.style.cssText = `
                position: absolute;
                background: var(--secondary-color);
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                z-index: 1000;
                white-space: nowrap;
                pointer-events: none;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });
});