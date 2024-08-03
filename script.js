const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    showMenu('nav-toggle', 'nav-menu');
});

const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    //active link
    navLink.forEach(n => n.classList.remove('active'))
    this.classList.add('active')

    //remove menu
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset:true
})

sr.reveal('.home_title', {})
sr.reveal('.button', {delay:100})
sr.reveal('.home_img', {delay:300})
sr.reveal('.home_social-icon', {interval:100})

sr.reveal('.about_img', {})
sr.reveal('.about_subtitle', {delay:100})
sr.reveal('.about_text', {delay:300})

sr.reveal('.skills_subtitle', {})
sr.reveal('.skills_text', {delay:100})
sr.reveal('.skills_data', {interval:100})
sr.reveal('.skills_img', {delay:300})

sr.reveal('.work_img', {interval:100})

sr.reveal('.contact_form', {interval:100})


