console.log("SCRIPT LOADED");

/*=========================================
    FACILITIES SCROLL REVEAL
=========================================*/

const facilityCards = document.querySelectorAll(".facility-card");

const revealCards = () => {

    facilityCards.forEach((card, index) => {

        const cardTop = card.getBoundingClientRect().top;

        const triggerPoint = window.innerHeight - 120;

        if (cardTop < triggerPoint) {

            setTimeout(() => {

                card.classList.add("show");

            }, index * 120);

        }

    });

};

window.addEventListener("scroll", revealCards);

window.addEventListener("load", revealCards);


/*=========================================
        MEMBERSHIP TOGGLE
=========================================*/

const toggleButtons = document.querySelectorAll(".toggle-btn");

const standardMembership = document.getElementById("standard-membership");

const doubleMembership = document.getElementById("double-membership");

const membershipToggle = document.querySelector(".membership-toggle");

if (
    toggleButtons.length &&
    standardMembership &&
    doubleMembership
) {

    toggleButtons.forEach(button => {

        button.addEventListener("click", () => {

            // Active Button
            toggleButtons.forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            // Show Standard
            if (button.dataset.plan === "standard") {

                standardMembership.classList.add("active");
                doubleMembership.classList.remove("active");
                membershipToggle.classList.remove("double-active");
            }

            // Show Double
            else {

                doubleMembership.classList.add("active");
                standardMembership.classList.remove("active");
                membershipToggle.classList.add("double-active");
            }

        });

    });

}

/*=========================================
        PREMIUM GALLERY LIGHTBOX
=========================================*/

const lightbox = document.getElementById("galleryLightbox");
const lightboxImg = document.querySelector(".lightbox-image");

const currentImage = document.getElementById("currentImage");
const totalImages = document.getElementById("totalImages");

const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let visibleImages = [];
let currentIndex = 0;

function refreshVisibleImages(){

    visibleImages = [...document.querySelectorAll(".gallery-item")]

        .filter(item => window.getComputedStyle(item).display !== "none")

        .map(item => item.querySelector("img"));

}

function openLightbox(index){

    refreshVisibleImages();

    currentIndex = index;

    lightboxImg.src = visibleImages[currentIndex].src;

    currentImage.textContent = currentIndex + 1;
    totalImages.textContent = visibleImages.length;

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

    showImage();

}

document.querySelectorAll(".gallery-item").forEach(item=>{

    item.addEventListener("click",()=>{

        refreshVisibleImages();

        const img = item.querySelector("img");

        const index = visibleImages.indexOf(img);

        if(index>-1){

            openLightbox(index);

        }

    });

});

function showImage(){

    lightboxImg.src = visibleImages[currentIndex].src;

    currentImage.textContent = currentIndex + 1;
    totalImages.textContent = visibleImages.length;

}

nextBtn.onclick=()=>{

    currentIndex++;

    if(currentIndex>=visibleImages.length){

        currentIndex=0;

    }

    showImage();

};

prevBtn.onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=visibleImages.length-1;

    }

    showImage();

};

function closeLightbox(){

    lightbox.classList.remove("active");

    document.body.style.overflow="";

}

closeBtn.onclick=closeLightbox;

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape") closeLightbox();

    if(e.key==="ArrowRight") nextBtn.click();

    if(e.key==="ArrowLeft") prevBtn.click();

});

/*=========================================
        GALLERY FILTER
=========================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryCards = document.querySelectorAll(".gallery-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.dataset.filter;

        galleryCards.forEach(card => {

            if (filterValue === "all" || card.classList.contains(filterValue)) {

                card.style.display = "block";

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "scale(1)";
                }, 20);

            } else {

                card.style.opacity = "0";
                card.style.transform = "scale(.9)";

                setTimeout(() => {
                    card.style.display = "none";
                }, 250);

            }

        });

    });

});

/*=========================================
        SCROLL PROGRESS BAR
=========================================*/

const progressBar = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {

    const scrollTop = window.pageYOffset;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress = (scrollTop / documentHeight) * 100;

    progressBar.style.width = progress + "%";

});

/*=========================================
        PREMIUM NAVBAR
=========================================*/

const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    /* Navbar Shrink */

    header.classList.toggle("scrolled", window.scrollY > 80);

    /* Active Navigation */

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 140;
        const sectionHeight = section.offsetHeight;

        if(window.scrollY >= sectionTop){

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link=>{

        link.classList.remove("active");

        if(link.getAttribute("href")==="#" + currentSection){

            link.classList.add("active");

        }

    });

});

/*=========================================
        MOBILE MENU
=========================================*/

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click",()=>{

    hamburger.classList.toggle("active");

    mobileMenu.classList.toggle("active");

    document.body.classList.toggle("menu-open");

});

document.querySelectorAll(".nav-link").forEach(link=>{

    link.addEventListener("click",()=>{

        hamburger.classList.remove("active");

        mobileMenu.classList.remove("active");

        document.body.classList.remove("menu-open");

    });

});

/*=========================================
        SCROLL REVEAL
=========================================*/

const reveals = document.querySelectorAll(

".reveal,.reveal-left,.reveal-right"

);

function revealElements(){

    const windowHeight = window.innerHeight;

    reveals.forEach(element=>{

        const top = element.getBoundingClientRect().top;

        if(top < windowHeight-120){

            element.classList.add("revealed");

        }

    });

}

window.addEventListener("scroll",revealElements);

window.addEventListener("load",revealElements);

/*=========================================
        SCROLL TO TOP
=========================================*/

const scrollBtn = document.querySelector(".scroll-top");

window.addEventListener("scroll",()=>{

    if(window.scrollY>500){

        scrollBtn.classList.add("show");

    }

    else{

        scrollBtn.classList.remove("show");

    }

});

scrollBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

/*=========================================
        PREMIUM PRELOADER
=========================================*/

window.addEventListener("load", () => {

    const preloader = document.getElementById("preloader");

    if (!preloader) return;

    // Prevent page scrolling while loader is visible
    document.body.style.overflow = "hidden";

    setTimeout(() => {

        preloader.classList.add("hide");

        document.body.style.overflow = "";

    }, 800);

});

/*=========================================
   REGISTRATION MODAL
=========================================*/

const registerModal = document.getElementById("registerModal");

const joinButtons = document.querySelectorAll(".join-now-btn");

const closeRegister = document.getElementById("closeRegister");


console.log(registerModal);
console.log(closeRegister);
console.log(joinButtons.length);

/*=========================================
   SUCCESS POPUP
=========================================*/

const successPopup = document.getElementById("successPopup");

const proceedWhatsapp = document.getElementById("proceedWhatsapp");

const successUserName = document.getElementById("successUserName");

const registrationIdText =
document.getElementById("registrationIdText");

// Open Modal
joinButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        e.preventDefault();

        registerModal.style.display = "flex";

        document.body.style.overflow = "hidden";

    });

});


// Close Button
closeRegister.addEventListener("click", function () {

    registerModal.style.display = "none";

    document.body.style.overflow = "auto";

});


// Click Outside
registerModal.addEventListener("click", function (e) {

    if (e.target === registerModal) {

        registerModal.style.display = "none";

        document.body.style.overflow = "auto";

    }

});


// ESC Key
document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {

        registerModal.style.display = "none";

        document.body.style.overflow = "auto";

    }

});

/*=========================================
    REGISTRATION MODULE
=========================================*/

const registerForm = document.getElementById("registerForm");

let registrationData = {};

registerForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const age = document.getElementById("age").value.trim();
    const gender = document.getElementById("gender").value;
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();
    const address = document.getElementById("address").value.trim();
    const goal = document.getElementById("goal").value;
    const plan = document.getElementById("plan").value;
    const batch = document.getElementById("batch").value;
    const payment = document.getElementById("payment").value;
    const source = document.getElementById("source").value;
    const medical = document.getElementById("medical").value.trim();

    if (!/^[6-9]\d{9}$/.test(mobile)) {

        alert("Please enter a valid 10-digit mobile number.");

        return;

    }

    // Generate Registration ID
const now = new Date();

const registrationId =
`LGF-${
now.getFullYear()
}${String(now.getMonth()+1).padStart(2,"0")}${
String(now.getDate()).padStart(2,"0")
}-${
String(now.getHours()).padStart(2,"0")
}${
String(now.getMinutes()).padStart(2,"0")
}${
String(now.getSeconds()).padStart(2,"0")
}`;

    registrationData = {

        registrationId,
        fullName,
        mobile,
        age,
        gender,
        height,
        weight,
        address,
        goal,
        plan,
        batch,
        payment,
        source,
        medical

    };

    const submitBtn = registerForm.querySelector(".register-submit");

    submitBtn.disabled = true;

    submitBtn.innerHTML =
    `<i class="fa-solid fa-spinner fa-spin"></i> Preparing Registration...`;

    setTimeout(() => {

        successUserName.innerHTML =
        `🎉 Thank you, ${registrationData.fullName}!`;

        registrationIdText.textContent =
        registrationData.registrationId;

        registerModal.style.display = "none";

        successPopup.style.display = "flex";

        submitBtn.disabled = false;

        submitBtn.innerHTML =
        `<i class="fa-solid fa-paper-plane"></i> Register Now`;

    }, 800);

});

/*=========================================
    PROCEED TO WHATSAPP
=========================================*/

proceedWhatsapp.addEventListener("click", function () {

   const now = new Date();

const registrationDate =
now.toLocaleDateString("en-IN");

const registrationTime =
now.toLocaleTimeString("en-IN");

const message =

`══════════════════════════════

🏋️ L.G FITNESS CLUB
NEW MEMBERSHIP REGISTRATION

══════════════════════════════

🆔 Registration ID
${registrationData.registrationId}

══════════════════════════════

👤 MEMBER DETAILS

Name :
${registrationData.fullName}

Mobile :
${registrationData.mobile}

Age :
${registrationData.age}

Gender :
${registrationData.gender}

══════════════════════════════

🏋️ FITNESS DETAILS

Goal :
${registrationData.goal}

Membership :
${registrationData.plan}

Preferred Batch :
${registrationData.batch}

══════════════════════════════

📏 BODY DETAILS

Height :
${registrationData.height || "Not Provided"} cm

Weight :
${registrationData.weight || "Not Provided"} kg

══════════════════════════════

🏠 ADDRESS

${registrationData.address}

══════════════════════════════

💳 PAYMENT

${registrationData.payment}

📢 SOURCE

${registrationData.source}

🩺 MEDICAL CONDITION

${registrationData.medical || "None"}

══════════════════════════════

📅 Registration Date
${registrationDate}

🕒 Registration Time
${registrationTime}

🌐 Submitted via
L.G Fitness Club Official Website

══════════════════════════════`;

    const whatsappURL =
        `https://wa.me/917018453262?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank");

    successPopup.style.display = "none";

    registerForm.reset();

    registrationData = {};

    document.body.style.overflow = "auto";
const closeSuccess =
document.getElementById("closeSuccess");
});

closeSuccess.addEventListener("click", function () {

    successPopup.style.display = "none";

    registerModal.style.display = "flex";

});