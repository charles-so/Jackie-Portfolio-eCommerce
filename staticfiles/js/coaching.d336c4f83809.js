document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("bookNow").addEventListener("click", function () {
        var cal_url = '{{ CAL_URL }}';
        window.open(cal_url, "_blank");
    });
});