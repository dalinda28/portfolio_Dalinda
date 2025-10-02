
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

/* Portfolio Item Details Popup */
document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("view-project-btn")){
        e.preventDefault();
        portfolioItemDetails(e.target.parentElement);
        togglePortfolioPopup();
    }
})

function togglePortfolioPopup(){
    const popup = document.querySelector(".portfolio-popup");
    const isOpen = popup.classList.contains("open");
    
    if (isOpen) {
        popup.classList.remove("open");
        document.body.classList.remove("hide-scrolling");
        document.querySelector(".main").classList.remove("fade-out");
        popup.setAttribute("aria-hidden", "true");
    } else {
        popup.classList.add("open");
        document.body.classList.add("hide-scrolling");
        document.querySelector(".main").classList.add("fade-out");
        popup.setAttribute("aria-hidden", "false");
        
        // Focus sur le bouton de fermeture pour l'accessibilité
        const closeBtn = popup.querySelector(".pp-close");
        if (closeBtn) {
            closeBtn.focus();
        }
    }
}
document.querySelector(".pp-close").addEventListener("click", togglePortfolioPopup);

document.addEventListener("click", (e) =>{
    if(e.target.classList.contains("pp-inner")){
        togglePortfolioPopup();
    }
})

// Gestion des touches clavier pour l'accessibilité
document.addEventListener("keydown", (e) => {
    const popup = document.querySelector(".portfolio-popup");
    if (popup && popup.classList.contains("open")) {
        if (e.key === "Escape") {
            togglePortfolioPopup();
        }
        
        // Trap du focus dans le modal
        if (e.key === "Tab") {
            const focusableElements = popup.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        }
    }
})
function portfolioItemDetails(portfolioItem){
    // Récupérer les éléments de la modale
    const popupTitle = document.querySelector(".pp-header h3");
    const popupImage = document.querySelector(".pp-project-image");
    const popupDescription = document.querySelector(".pp-project-description");
    const popupCreated = document.querySelector(".pp-created");
    const popupTechnologies = document.querySelector(".pp-technologies");
    const popupRole = document.querySelector(".pp-role");
    const popupFeatures = document.querySelector(".pp-features");
    const popupGithub = document.querySelector(".pp-github");
    const popupGithubLink = document.querySelector(".pp-github-link");

    // Récupérer les données du projet
    const projectTitle = portfolioItem.querySelector(".portfolio-item-title").innerHTML;
    const projectImage = portfolioItem.querySelector(".portfolio-item-thumbnail img").src;
    const projectImageAlt = portfolioItem.querySelector(".portfolio-item-thumbnail img").alt;
    
    // Récupérer les détails du projet
    const projectDetails = portfolioItem.querySelector(".portfolio-item-details");
    const projectDescription = projectDetails.querySelector(".description p").innerHTML;
    const projectInfo = projectDetails.querySelectorAll(".general-info li");

    // Remplir la modale
    popupTitle.innerHTML = projectTitle;
    popupImage.src = projectImage;
    popupImage.alt = projectImageAlt;
    popupDescription.innerHTML = projectDescription;
    
    // Masquer le lien GitHub par défaut
    popupGithub.style.display = "none";

    // Remplir les informations du projet
    projectInfo.forEach((info, index) => {
        const text = info.textContent.trim();
        const span = info.querySelector("span");
        
        if (span) {
            const spanText = span.textContent.trim();
            
            if (text.includes("Créé")) {
                popupCreated.innerHTML = spanText;
            } else if (text.includes("Technologies utilisées")) {
                popupTechnologies.innerHTML = spanText;
            } else if (text.includes("Rôle")) {
                popupRole.innerHTML = spanText;
            } else if (text.includes("Fonctionnalités")) {
                popupFeatures.innerHTML = spanText;
            } else if (text.includes("Lien Github")) {
                const link = info.querySelector("a");
                if (link) {
                    popupGithubLink.href = link.href;
                    popupGithubLink.textContent = link.textContent;
                    popupGithub.style.display = "block";
                }
            }
        }
    });
}
/* Paw button */
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

// On attend que tout le DOM soit chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', async () => {
    const resultSpan = document.querySelector('#result'); // Récupère l'élément pour afficher les likes
    const confettiAmount = 50; // Nombre de confettis à afficher

    // Récupérer le nombre de likes depuis le backend au chargement de la page
    const response = await fetch('http://localhost:3000/api/likes');
    const data = await response.json();
    let likeCount = data.likeCount;

    // Assurer que la valeur est bien un nombre
    if (isNaN(likeCount)) {
        likeCount = 102; // Valeur par défaut si ce n'est pas un nombre
    }

    resultSpan.textContent = likeCount;

    // Ajouter l'événement au clic sur les boutons "like"
    document.querySelectorAll('.paw-button').forEach(elem => {
        elem.addEventListener('click', async e => {
            e.preventDefault(); // Empêche le comportement par défaut (ici le lien)
            
            // Récupérer le nombre actuel de likes
            let number = parseInt(resultSpan.textContent); // Convertir en nombre entier

            // Vérifier si le bouton a déjà l'animation
            if (!elem.classList.contains('animation')) {
                elem.classList.add('animation');

                // Ajouter des confettis (si nécessaire)
                for (let i = 0; i < confettiAmount; i++) {
                    createConfetti(elem); // Fonction pour afficher des confettis
                }

                // Ajouter une animation et envoyer la nouvelle valeur de like au backend
                setTimeout(() => {
                    elem.classList.add('confetti');
                    setTimeout(async () => {
                        elem.classList.add('liked');
                        resultSpan.textContent = number + 1; // Met à jour l'affichage local du nombre de likes

                        // Envoi de la mise à jour des likes au backend
                        await fetch('http://localhost:3000/api/likes', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ likeCount: number + 1 }) // Envoi de la nouvelle valeur
                        });
                    }, 400);
                }, 260);
            } else {
                // Si le bouton est déjà cliqué, on le désactive
                elem.classList.remove('animation', 'liked', 'confetti');
                resultSpan.textContent = number - 1; // Met à jour l'affichage local du nombre de likes

                // Envoi de la diminution des likes au backend
                await fetch('http://localhost:3000/api/likes', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ likeCount: number - 1 }) // Envoi de la nouvelle valeur
                });
            }
        });
    });
});
