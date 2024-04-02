document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("bookNow").addEventListener("click", function () {
        var cal_url = this.getAttribute('data-cal-url');
        window.open(cal_url, "_blank");
    });
});