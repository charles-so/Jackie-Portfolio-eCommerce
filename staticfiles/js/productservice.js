document.addEventListener('DOMContentLoaded', function () {

  const image = document.querySelector('#productservice .product-container .img-container img');
  const buyMe = document.querySelector('.img-container .buy-me');

  image.addEventListener('mouseover', function () {
    buyMe.classList.add('active');
  });

  image.addEventListener('mouseout', function () {
    buyMe.classList.remove('active');
  });

  // Get Stripe publishable key
  fetch("/config/")
    .then((result) => { return result.json(); })
    .then((data) => {
      const stripe = Stripe(data.publicKey);

      document.querySelector("#product-1").addEventListener("click", () => {
        fetch("/create-checkout-session/")
          .then((result) => { return result.json(); })
          .then((data) => {
            console.log(data);
            return stripe.redirectToCheckout({ sessionId: data.sessionId })
          })
          .then((res) => {
            console.log(res);
          });
      });
    });

  // Cal
  (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); return; } p(cal, ar); }; })(window, "https://jktradings.charleso.site/embed/embed.js", "init");
  Cal("init", { origin: "https://jktradings.charleso.site" });

  Cal("inline", {
    elementOrSelector: "#my-cal-inline",
    calLink: "jacky/15min",
    layout: "month_view"
  });

  Cal("ui", { "theme": "light", "styles": { "branding": { "brandColor": "#000000" } }, "hideEventTypeDetails": false, "layout": "month_view" });
});