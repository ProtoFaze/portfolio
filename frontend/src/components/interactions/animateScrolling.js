export const animateScrolling = (event) => {
    event.preventDefault();
    const target = event.target.getAttribute("href").substring(1); //find target via href, trim off #
    const element = document.getElementById(target);
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"
    })
};