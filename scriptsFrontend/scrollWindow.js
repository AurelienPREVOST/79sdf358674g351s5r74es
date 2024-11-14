export function scrollWindow() {
    const thirdPart = document.querySelector(".third-part")
    thirdPart.classList.remove("hidden")
    window.scroll(null , window.innerHeight);
}