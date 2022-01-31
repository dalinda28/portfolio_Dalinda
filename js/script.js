window.addEventListener("load", () => {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    /* Page loader */
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none"
    }, 600);
})
/* Toggle navbar */
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click" , () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling")
})

function hideSection(){
    document.querySelector("section.active").classList.toggle("fade-out");
}

function toggleNavbar(){
    document.querySelector("header").classList.toggle("active");
}


/* Active section */
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("link-item") && e.target.hash !== ""){
        navToggler.classList.add("hide");
        if(e.target.classList.contains("nav-item")){
            toggleNavbar();
        }
        else{
            hideSection();
            document.body.classList.add("hide-scrolling")

        }
        setTimeout(() => {
            document.querySelector("section.active").classList.remove("active", "fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0,0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
        }, 500);
    }
});
/* About tabs */

const tabsContainer = document.querySelector('.about-tabs'),
aboutSection = document.querySelector('.about-section');

tabsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("tab-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});

/* Portfolio Item Details Popup */
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
        togglePortfolioPopup();
        document.querySelector(".portofolio-popup").scrollTo(0,0);
        portfolioItemDetails(e.target.parentElement);
    }
})

function togglePortfolioPopup(){
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
})
function portfolioItemDetails(portfolioItem){
    document.querySelector(".pp-thumbnail img").src = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML = portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(".portfolio-item-details").innerHTML;

}

/* Paw button  */
let confettiAmount = 60,
    confettiColors = [
        '#7d32f5',
        '#f6e434',
        '#63fdf1',
        '#e672da',
        '#295dfe',
        '#6e57ff'
    ],
    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    createConfetti = to => {
        let elem = document.createElement('i'),
            set = Math.random() < 0.5 ? -1 : 1;
        elem.style.setProperty('--x', random(-260, 260) + 'px');
        elem.style.setProperty('--y', random(-160, 160) + 'px');
        elem.style.setProperty('--r', random(0, 360) + 'deg');
        elem.style.setProperty('--s', random(.6, 1));
        elem.style.setProperty('--b', confettiColors[random(0, 5)]);
        to.appendChild(elem);
    };

document.querySelectorAll('.paw-button').forEach(elem => {
    elem.addEventListener('click', e => {
        let number = elem.children[1].textContent;
        if(!elem.classList.contains('animation')) {
            elem.classList.add('animation');
            for(let i = 0; i < confettiAmount; i++) {
                createConfetti(elem);
            }
            setTimeout(() => {
                elem.classList.add('confetti');
                setTimeout(() => {
                    elem.classList.add('liked');
                    elem.children[1].textContent = parseInt(number) + 1;
                }, 400);
                setTimeout(() => {
                    elem.querySelectorAll('i').forEach(i => i.remove());
                }, 600);
            }, 260);
        } else {
            elem.classList.remove('animation', 'liked', 'confetti');
            elem.children[1].textContent = parseInt(number) - 1;
        }
        e.preventDefault();
    });
});