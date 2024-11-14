export function derivationEpv() {
    console.log("à voir ce qu'on va faire ici......")
    const mustBeHideForEPV = document.querySelector(".second-part")
    mustBeHideForEPV.style.visibility = 'hidden'
}

export function restoreNotEpv() {
    const mustBeHideForEPV = document.querySelector(".second-part")
    mustBeHideForEPV.style.visibility = 'visible'
}