/*
 * Collapsible Navigation Menu
 * Use deferred loading
 */

let desktopNavMenu;
let mobileNavMenu;

window.onload = function() {
    desktopNavMenu = document.getElementById("desktop_nav_menu");
    mobileNavMenu = document.getElementById("mobile_nav_menu");
    SetNavMenu()
};

window.onresize = function() {
    SetNavMenu()
}

function SetNavMenu() {
    if (window.innerWidth <= 800){
        desktopNavMenu.style.display = "none";
        mobileNavMenu.style.display = "block";
    }else {
        desktopNavMenu.style.display = "block";
        mobileNavMenu.style.display = "none";
    }
}