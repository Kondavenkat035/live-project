document.addEventListener("DOMContentLoaded", function () {
    console.log("Etawah Shops Market – JS Loaded");

    // ===============================
    // LOTTIE HERO ANIMATION
    // ===============================
    const LOTTIE_URL = "https://lottie.host/8026cc33-8a3d-4c38-8ff6-7b4476007b5a/Yw4zV8K3rC.json";
    const lottieContainer = document.getElementById("lottie-hero");
    if (window.lottie && lottieContainer) {
        lottie.loadAnimation({
            container: lottieContainer,
            renderer: "svg",
            loop: true,
            autoplay: true,
            path: LOTTIE_URL,
        });
    } else {
        console.warn("Lottie not loaded or container missing.");
        if (lottieContainer) {
            lottieContainer.innerHTML = `<img src="https://placehold.co/500x400/4f46e5/ffffff?text=Shop+Animation" class="img-fluid" alt="Hero Illustration">`;
        }
    }

    // ===============================
    // AOS – Animate On Scroll
    // ===============================
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 700,
            once: true,
            easing: 'ease-out-cubic'
        });
    }

    // ===============================
    // HERO NUMBER COUNTER
    // ===============================
    const heroNums = document.querySelectorAll(".hero-num");
    heroNums.forEach(el => {
        const target = parseInt(el.dataset.amount) || 0;
        if (target <= 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let count = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            el.textContent = target.toLocaleString("en-IN") + "+";
                            clearInterval(timer);
                            observer.unobserve(el);
                        } else {
                            el.textContent = Math.ceil(count).toLocaleString("en-IN");
                        }
                    }, 16);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        observer.observe(el);
    });

    // ===============================
    // PRICING TOGGLE
    // ===============================
    const monthBtn = document.getElementById("billing-month");
    const yearBtn = document.getElementById("billing-year");
    const priceBusiness = document.querySelector(".price-business");

    if (monthBtn && yearBtn && priceBusiness) {
        monthBtn.addEventListener("click", () => {
            priceBusiness.innerHTML = '₹499<span class="fs-6 fw-normal">/mo</span>';
            monthBtn.classList.add("active");
            yearBtn.classList.remove("active");
        });

        yearBtn.addEventListener("click", () => {
            priceBusiness.innerHTML = '₹409<span class="fs-6 fw-normal">/mo</span> <span class="text-success fs-6">(billed yearly)</span>';
            yearBtn.classList.add("active");
            monthBtn.classList.remove("active");
        });
    }

    // ===============================
    // Smooth Scroll for Anchor Links
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});