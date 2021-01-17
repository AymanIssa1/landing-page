/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const fragment = document.createDocumentFragment();
const sections = document.querySelectorAll('section')
const navBarList = document.getElementById('navbar__list')

const activeStateClass = "your-active-class"


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/


function createNavItem(id, name) { 
    return `<a class ="menu__link" data-id="${id}">${name}</a>`; 
}

function isInViewport(elem) {
	var distance = elem.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
(function (){
    sections.forEach(section => {
        const menuItem = document.createElement('li');
        const id = section.getAttribute('id');
        const name = section.getAttribute('data-nav');
        
        menuItem.innerHTML = createNavItem(id, name);
        fragment.appendChild(menuItem);
    })

    navBarList.appendChild(fragment);
})();

// Add class 'active' to section when near top of viewport
function setActive(){

    let menuItems = document.querySelectorAll('.menu__link');

    for (let index=0; index < sections.length; index++){
        if(isInViewport(sections[index])) {
            sections[index].classList.add(activeStateClass);
            menuItems[index].classList.add(activeStateClass);
        } else {
            sections[index].classList.remove(activeStateClass);
            menuItems[index].classList.remove(activeStateClass);
        }
    }
}

// Scroll to anchor ID using scrollTO event
function scrollToElement(event){
    const id = event.target.getAttribute('data-id');
    const section = document.getElementById(id);
    section.scrollIntoView({behavior: "smooth"});
    
}

function setSectionsScrollEvent(){
    navBarList.addEventListener('click', function(event){
        scrollToElement(event)
    })
}

/**
 * End Main Functions
 * Begin Events
 * 
*/


// Build menu 

// Scroll to section on link click
setSectionsScrollEvent()

// Set sections as active
document.addEventListener('scroll', function(){
    setActive();
});
