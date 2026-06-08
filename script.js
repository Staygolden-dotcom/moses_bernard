// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgress = document.getElementById('loadingProgress');
    const loadingPercentage = document.getElementById('loadingPercentage');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        loadingProgress.style.width = progress + '%';
        loadingPercentage.textContent = Math.floor(progress) + '%';
        
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.cursor = 'none';
                initApp();
            }, 500);
        }
    }, 100);
});

// ============================================
// Initialize Application
// ============================================
function initApp() {
    initCustomCursor();
    initNavigation();
    initScrollProgress();
    initParticleBackground();
    initThreeJS();
    initScrollReveal();
    initCounters();
    initSkills();
    initProjects();
    initServices();
    initTimeline();
    initTestimonials();
    initContactForm();
    initSmoothScroll();
}

// ============================================
// Custom Cursor
// ============================================
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX - 4 + 'px';
            cursorFollower.style.top = e.clientY - 4 + 'px';
        }, 50);
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
    
    // Enlarge cursor on hoverable elements
    const hoverables = document.querySelectorAll('a, button, .btn, .skill-card, .project-card, .service-card, .about-card, .timeline-content, .info-card, .social-icon');
    
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'rgba(0, 240, 255, 0.2)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'transparent';
        });
    });
}

// ============================================
// Navigation
// ============================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const themeToggle = document.getElementById('themeToggle');
    
    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        });
    });
    
    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('light');
        const icon = themeToggle.querySelector('i');
        if (document.documentElement.classList.contains('light')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// ============================================
// Scroll Progress Bar
// ============================================
function initScrollProgress() {
    const scrollProgress = document.getElementById('scrollProgress');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });
}

// ============================================
// Particle Background
// ============================================
function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const particleCount = 100;
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 240, 255, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Draw connections
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(0, 240, 255, ${0.1 * (1 - distance / 150)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ============================================
// Three.js 3D Background
// ============================================
function initThreeJS() {
    const container = document.getElementById('threeContainer');
    if (!container || !window.THREE) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    // Create geometries
    const geometries = [
        new THREE.IcosahedronGeometry(0.5, 0),
        new THREE.TorusGeometry(0.4, 0.15, 16, 32),
        new THREE.OctahedronGeometry(0.4, 0),
        new THREE.TorusKnotGeometry(0.3, 0.1, 64, 8),
        new THREE.DodecahedronGeometry(0.35, 0)
    ];
    
    const meshes = [];
    
    geometries.forEach((geometry, index) => {
        const material = new THREE.MeshPhongMaterial({
            color: index % 2 === 0 ? 0x00f0ff : 0xb500ff,
            wireframe: true,
            transparent: true,
            opacity: 0.3,
            emissive: index % 2 === 0 ? 0x00f0ff : 0xb500ff,
            emissiveIntensity: 0.5
        });
        
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 4 - 2
        );
        
        scene.add(mesh);
        meshes.push(mesh);
    });
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight1 = new THREE.PointLight(0x00f0ff, 1, 10);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0xb500ff, 1, 10);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);
    
    camera.position.z = 5;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        meshes.forEach((mesh, index) => {
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.008;
            mesh.position.y += Math.sin(Date.now() * 0.002 + index) * 0.002;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Mouse parallax
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        
        meshes.forEach(mesh => {
            mesh.rotation.x += mouseY * 0.01;
            mesh.rotation.y += mouseX * 0.01;
        });
    });
    
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// ============================================
// Scroll Reveal Animation
// ============================================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        reveals.forEach(reveal => {
            const revealTop = reveal.getBoundingClientRect().top;
            
            if (revealTop < windowHeight - revealPoint) {
                reveal.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkReveal);
    checkReveal(); // Initial check
}

// ============================================
// Animated Counters
// ============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter-number[data-target]');
    
    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    function checkCounters() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && !counter.classList.contains('counted')) {
                counter.classList.add('counted');
                animateCounter(counter);
            }
        });
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters();
}

// ============================================
// Skills Section
// ============================================
const skillsData = [
    { name: 'React', level: 95, icon: '⚛️', category: 'frontend' },
    { name: 'TypeScript', level: 90, icon: '📘', category: 'frontend' },
    { name: 'Next.js', level: 88, icon: '▲', category: 'frontend' },
    { name: 'Tailwind CSS', level: 95, icon: '🎨', category: 'frontend' },
    { name: 'JavaScript', level: 95, icon: '💛', category: 'frontend' },
    { name: 'HTML5/CSS3', level: 98, icon: '🌐', category: 'frontend' },
    { name: 'JavaFX', level: 92, icon: '☕', category: 'desktop' },
    { name: 'Scene Builder', level: 90, icon: '🏗️', category: 'desktop' },
    { name: 'Firebase', level: 85, icon: '🔥', category: 'tools' },
    { name: 'Git & GitHub', level: 92, icon: '📦', category: 'tools' },
    { name: 'REST APIs', level: 90, icon: '🔌', category: 'tools' },
    { name: 'UI/UX Design', level: 88, icon: '🎯', category: 'frontend' },
    { name: 'Motion Design', level: 85, icon: '✨', category: 'frontend' },
    { name: 'Responsive Design', level: 95, icon: '📱', category: 'frontend' },
];

function initSkills() {
    const skillsGrid = document.getElementById('skillsGrid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    function renderSkills(filter = 'all') {
        const filtered = filter === 'all' 
            ? skillsData 
            : skillsData.filter(skill => skill.category === filter);
        
        skillsGrid.innerHTML = filtered.map(skill => `
            <div class="skill-card" data-category="${skill.category}">
                <div class="skill-card-header">
                    <span class="skill-icon">${skill.icon}</span>
                    <svg class="skill-progress-ring" viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="url(#gradient)" stroke-width="2"
                            stroke-dasharray="${skill.level}, 100" class="skill-ring-fill"/>
                    </svg>
                </div>
                <h3 class="skill-name">${skill.name}</h3>
                <div class="skill-bar">
                    <div class="skill-bar-fill" style="width: 0%" data-width="${skill.level}%"></div>
                </div>
            </div>
        `).join('');
        
        // Animate skill bars
        setTimeout(() => {
            document.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.getAttribute('data-width');
            });
        }, 100);
    }
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderSkills(btn.getAttribute('data-filter'));
        });
    });
    
    renderSkills();
}

// ============================================
// Projects Section
// ============================================
const projectsData = [
    {
        title: 'Hotel Reservation System',
        description: 'Enterprise-grade hotel management desktop application',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop',
        tech: ['JavaFX', 'Scene Builder', 'MySQL', 'Jasper Reports'],
        features: ['Room Management', 'Online Booking', 'Payment Processing', 'Report Generation'],
        live: '#',
        github: '#',
        fullDescription: 'A comprehensive JavaFX desktop application for managing hotel reservations, room inventory, guest profiles, and billing. Features include real-time availability updates, automated email confirmations, and detailed reporting dashboards.'
    },
    {
        title: 'Inventory Management App',
        description: 'Desktop inventory tracking and management system',
        image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&h=400&fit=crop',
        tech: ['JavaFX', 'Hibernate', 'PostgreSQL', 'iText'],
        features: ['Stock Tracking', 'Barcode Integration', 'Supplier Management', 'Auto Reorder'],
        live: '#',
        github: '#',
        fullDescription: 'Advanced inventory management solution built with JavaFX, featuring barcode scanning, stock level alerts, supplier management, and automated reorder points.'
    },
    {
        title: 'Modern React Dashboard',
        description: 'Analytics dashboard with real-time data visualization',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
        tech: ['React', 'TypeScript', 'Recharts', 'Tailwind CSS'],
        features: ['Real-time Analytics', 'Custom Widgets', 'Data Export', 'Team Collaboration'],
        live: '#',
        github: '#',
        fullDescription: 'A cutting-edge analytics dashboard featuring real-time data updates, interactive charts, and customizable widgets.'
    },
    {
        title: 'Animated Landing Page',
        description: 'Award-winning animated marketing landing page',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
        tech: ['Next.js', 'GSAP', 'Framer Motion', 'Three.js'],
        features: ['Parallax Scrolling', '3D Elements', 'Optimized Performance', 'SEO Ready'],
        live: '#',
        github: '#',
        fullDescription: 'Pixel-perfect landing page with advanced animations, parallax scrolling, and micro-interactions.'
    },
    {
        title: 'POS Desktop Application',
        description: 'Point of sale system for retail businesses',
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
        tech: ['JavaFX', 'SQLite', 'Thermal Printer SDK', 'REST API'],
        features: ['Multi-payment', 'Inventory Sync', 'Loyalty Program', 'Sales Analytics'],
        live: '#',
        github: '#',
        fullDescription: 'Full-featured POS system supporting multiple payment methods, inventory synchronization, and customer loyalty programs.'
    },
    {
        title: 'Admin Dashboard UI',
        description: 'Comprehensive admin interface with dark mode',
        image: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=600&h=400&fit=crop',
        tech: ['React', 'ShadCN UI', 'TanStack Table', 'Zustand'],
        features: ['Dark Mode', 'Role-based Access', 'Drag & Drop', 'Advanced Tables'],
        live: '#',
        github: '#',
        fullDescription: 'Modern admin dashboard featuring dark/light themes, role-based access control, and data tables with advanced filtering.'
    }
];

function initProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    const modal = document.getElementById('projectModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');
    
    function renderProjects() {
        projectsGrid.innerHTML = projectsData.map(project => `
            <div class="project-card" onclick="openProjectModal(${projectsData.indexOf(project)})">
                <div class="project-image">
                    <img src="${project.image}" alt="${project.title}" loading="lazy">
                    <div class="project-overlay"></div>
                </div>
                <div class="project-body">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">
                        ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-buttons">
                        <a href="${project.live}" class="project-btn project-btn-primary" target="_blank" onclick="event.stopPropagation()">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                        <a href="${project.github}" class="project-btn project-btn-secondary" target="_blank" onclick="event.stopPropagation()">
                            <i class="fab fa-github"></i> Code
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    window.openProjectModal = function(index) {
        const project = projectsData[index];
        document.getElementById('modalImage').src = project.image;
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.fullDescription;
        document.getElementById('modalTech').innerHTML = project.tech.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');
        document.getElementById('modalFeatures').innerHTML = `
            <h4>Key Features</h4>
            <ul>${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
        `;
        document.getElementById('modalLive').href = project.live;
        document.getElementById('modalGithub').href = project.github;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    renderProjects();
}

// ============================================
// Services Section
// ============================================
const servicesData = [
    { icon: 'fa-globe', title: 'Front-End Development', description: 'Building responsive, performant web applications using React, Next.js, and modern CSS frameworks with pixel-perfect implementation.' },
    { icon: 'fa-desktop', title: 'JavaFX Desktop Apps', description: 'Developing enterprise-grade desktop applications with JavaFX, Scene Builder, and robust backend integration.' },
    { icon: 'fa-mobile-alt', title: 'Responsive UI Design', description: 'Creating fluid, adaptive interfaces that work beautifully across all devices and screen sizes.' },
    { icon: 'fa-chart-bar', title: 'Dashboard Systems', description: 'Designing and building complex dashboard interfaces with real-time data visualization and analytics.' },
    { icon: 'fa-magic', title: 'UI Animation & Motion', description: 'Crafting smooth, engaging animations and micro-interactions that enhance user experience.' },
    { icon: 'fa-plug', title: 'API Integration', description: 'Seamlessly integrating RESTful APIs and third-party services for full-stack functionality.' }
];

function initServices() {
    const servicesGrid = document.getElementById('servicesGrid');
    
    servicesGrid.innerHTML = servicesData.map(service => `
        <div class="service-card">
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3>${service.title}</h3>
            <p>${service.description}</p>
        </div>
    `).join('');
}

// ============================================
// Experience / Timeline Section
// ============================================
const timelineData = [
    { date: '2023 - Present', title: 'Senior Front-End Developer', company: 'Tech Innovations Inc.', description: 'Leading front-end development for enterprise web applications. Implementing modern UI/UX practices.', icon: 'fa-star' },
    { date: '2021 - 2023', title: 'JavaFX Developer', company: 'Desktop Solutions Ltd.', description: 'Developed enterprise desktop applications using JavaFX and Scene Builder for Fortune 500 clients.', icon: 'fa-code' },
    { date: '2020 - 2021', title: 'Full Stack Developer', company: 'Digital Agency Pro', description: 'Built responsive web applications and integrated REST APIs for various client projects.', icon: 'fa-briefcase' },
    { date: '2019 - 2020', title: 'Computer Science Degree', company: 'Tech University', description: 'Graduated with honors. Specialized in software engineering and user interface design.', icon: 'fa-graduation-cap' }
];

function initTimeline() {
    const timeline = document.getElementById('timeline');
    
    timeline.innerHTML = timelineData.map((item, index) => `
        <div class="timeline-item">
            <div class="timeline-spacer"></div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <div class="timeline-date"><i class="fas ${item.icon}"></i> ${item.date}</div>
                <h3>${item.title}</h3>
                <div class="timeline-company">${item.company}</div>
                <p>${item.description}</p>
            </div>
        </div>
    `).join('');
    
    // Animate timeline items on scroll
    function checkTimeline() {
        const items = document.querySelectorAll('.timeline-item');
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                item.classList.add('visible');
            }
        });
    }
    
    window.addEventListener('scroll', checkTimeline);
    checkTimeline();
}

// ============================================
// Testimonials Section
// ============================================
const testimonialsData = [
    {
        name: 'Sarah Johnson',
        role: 'CEO, TechStart Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        feedback: 'An exceptional developer who delivered beyond our expectations. The JavaFX application was robust, intuitive, and perfectly tailored to our business needs.',
        rating: 5
    },
    {
        name: 'Michael Chen',
        role: 'Product Manager, Digital Solutions',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        feedback: 'Outstanding front-end development work. The animations and user experience are simply world-class. Highly recommended!',
        rating: 5
    },
    {
        name: 'Emily Rodriguez',
        role: 'CTO, Enterprise Systems',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        feedback: 'Professional, skilled, and innovative. The dashboard system transformed how we visualize our data. A true expert in both web and desktop development.',
        rating: 5
    },
    {
        name: 'David Park',
        role: 'Founder, StartupHub',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        feedback: 'Working with this developer was a game-changer. The attention to detail and creative solutions made our project stand out from competitors.',
        rating: 4
    }
];

function initTestimonials() {
    const card = document.getElementById('testimonialCard');
    const dotsContainer = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    let currentIndex = 0;
    
    function renderStars(rating) {
        return Array.from({ length: 5 }, (_, i) => 
            `<i class="fas fa-star${i < rating ? '' : ' text-muted'}"></i>`
        ).join('');
    }
    
    function renderTestimonial(index) {
        const t = testimonialsData[index];
        card.innerHTML = `
            <div class="testimonial-quote">"</div>
            <p class="testimonial-text">${t.feedback}</p>
            <div class="testimonial-author">
                <img src="${t.avatar}" alt="${t.name}" class="testimonial-avatar">
                <div>
                    <div class="testimonial-name">${t.name}</div>
                    <div class="testimonial-role">${t.role}</div>
                </div>
            </div>
            <div class="testimonial-rating">${renderStars(t.rating)}</div>
        `;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    function renderDots() {
        dotsContainer.innerHTML = testimonialsData.map((_, i) => `
            <div class="carousel-dot ${i === 0 ? 'active' : ''}" onclick="goToTestimonial(${i})"></div>
        `).join('');
    }
    
    window.goToTestimonial = function(index) {
        currentIndex = index;
        renderTestimonial(index);
    };
    
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialsData.length) % testimonialsData.length;
        renderTestimonial(currentIndex);
    });
    
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        renderTestimonial(currentIndex);
    });
    
    // Auto-rotate
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialsData.length;
        renderTestimonial(currentIndex);
    }, 5000);
    
    renderDots();
    renderTestimonial(0);
}

// ============================================
// Contact Form
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', formData);
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        form.reset();
    });
}

// ============================================
// Smooth Scroll & Download CV
// ============================================
function initSmoothScroll() {
    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Download CV button
    const downloadCV = document.getElementById('downloadCV');
    
    downloadCV.addEventListener('click', () => {
        // Create a sample CV download
        alert('CV download started! (This would download a PDF in production)');
        // In production: window.open('/path-to-cv.pdf', '_blank');
    });
    
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// Keyboard Shortcuts & Easter Egg
// ============================================
document.addEventListener('keydown', (e) => {
    // Command palette (Ctrl + K)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        alert('Command Palette: This would open a search/command interface');
    }
    
    // Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    window.konamiIndex = window.konamiIndex || 0;
    
    if (e.key === konamiCode[window.konamiIndex]) {
        window.konamiIndex++;
        if (window.konamiIndex === konamiCode.length) {
            window.konamiIndex = 0;
            activateEasterEgg();
        }
    } else {
        window.konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s linear infinite';
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
    
    // Add rainbow animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    alert('🎉 Easter Egg Activated! You found the Konami Code!');
}

// ============================================
// Performance Optimization
// ============================================
// Lazy load images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
});

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
window.addEventListener('scroll', debounce(() => {
    // Any scroll-based calculations
}, 10));

console.log('%c🚀 Premium Developer Portfolio %cLoaded Successfully!',
    'color: #00f0ff; font-size: 20px; font-weight: bold;',
    'color: #b500ff; font-size: 14px;');
console.log('%c💡 Tip: Try the Konami Code! (↑↑↓↓←→←→BA)',
    'color: #ffd700; font-size: 12px;');
