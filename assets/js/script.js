document.addEventListener('DOMContentLoaded', () => {
    // --- Sticky Header ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const roles = [
        "Web Developer",
        "AI Automation Engineer",
        "Graphic Designer",
        "Email/Chat Support Specialist",
        "Database & Backend Management"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 100;
        } else {
            typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 200;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();

    // --- Active Link Indicator on Scroll ---
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Certificate Modal ---
    const modal = document.getElementById('certModal');
    const modalImg = document.getElementById('modalImg');
    const closeBtn = document.querySelector('.close-modal');
    const viewBtns = document.querySelectorAll('.view-cert-btn');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = btn.getAttribute('data-img');
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // --- Contact Form Handling ---
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Simple validation
        if (!name || !email || !subject || !message) {
            formStatus.textContent = 'Please fill in all fields.';
            formStatus.className = 'form-status error';
            return;
        }

        // Simulate form submission
        formStatus.textContent = 'Sending message...';
        formStatus.className = 'form-status';

        // EmailJS
        const serviceID = 'service_ff6gmgh';
        const templateID = 'template_xqzzv1m';
        const params = {
            name: name,
            email: email,
            subject: subject,
            message: message
        };

        emailjs.send(serviceID, templateID, params)
            .then(res => {
                document.getElementById('name').value = "";
                document.getElementById('email').value = "";
                document.getElementById('subject').value = "";
                document.getElementById('message').value = "";
                console.log(res);
                
                setTimeout(() => {
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();

                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                }, 1500);
            })
            .catch(err => {
                formStatus.textContent = 'Error sending message. Please try again.';
                formStatus.className = 'form-status error';
                console.error('EmailJS Error:', err);
            });
    });

    // disable button during submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
submitBtn.disabled = true;
submitBtn.disabled = false;


        } // end of contact form handling
});
