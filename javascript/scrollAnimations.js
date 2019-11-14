
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);

    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
}


$(document).ready(function () {

    $("[anim]").each(function () {
        const element = $(this);
        if (element.hasClass("hide-anim") === false) {
            element.addClass("hide-anim");
        }
    });

    $(window).scroll(animate);

    animate();

    function animate() {
        document.querySelectorAll("[anim]").forEach(function (element) {
            const animateOn = element.getAttribute("animateOn");
            if (animateOn) {
                if (isElementInViewport(document.querySelector(animateOn))) {
                    addAnim();
                }
            }
            else if (isElementInViewport(element)) {
                addAnim();
            }

            function addAnim() {
                const anim = element.getAttribute("anim");
                if (anim && element.classList.contains(anim) === false) {
                    element.classList.add(...anim.split(" "));
                    element.classList.remove("hide-anim");
                }
            }

        });
    }
});




