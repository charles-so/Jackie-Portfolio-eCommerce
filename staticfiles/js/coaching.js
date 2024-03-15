document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("bookNow").addEventListener("click", function () {
        window.open("{{ settings.CAL_URL }}", "_blank");
    });
});