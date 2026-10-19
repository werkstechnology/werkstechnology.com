// Çerez izni ve Google Analytics.
// Analytics, ziyaretçi "Kabul et" demeden hiç yüklenmez. Tercih tarayıcıda saklanır,
// alt bilgideki "Çerez tercihleri" bağlantısıyla değiştirilebilir.
(function () {
  var GA_ID = "G-RK3D17FH5H"; // Ölçüm kimliği
  var KEY = "werks-cerez-tercihi"; // "kabul" | "ret"
  var root = document.documentElement.getAttribute("data-root") || "";

  function getChoice() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function setChoice(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  var loaded = false;
  function loadAnalytics() {
    if (loaded || !/^G-[A-Z0-9]+$/.test(GA_ID) || GA_ID === "G-XXXXXXXXXX") return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  // Ret sonrası daha önce bırakılmış Analytics çerezlerini temizler.
  function clearAnalyticsCookies() {
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name.indexOf("_ga") === 0) {
        var host = location.hostname.replace(/^www\./, "");
        ["", "; domain=." + host, "; domain=" + location.hostname].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }

  var banner;
  function buildBanner() {
    banner = document.createElement("div");
    banner.className = "consent";
    banner.setAttribute("role", "dialog");
    banner.setAttribute("aria-live", "polite");
    banner.setAttribute("aria-label", "Çerez tercihi");
    banner.innerHTML =
      '<p>Sitenin nasıl kullanıldığını anlamak için, izin verirseniz Google Analytics çerezleri kullanıyoruz. ' +
      'Reddederseniz site aynı şekilde çalışır. <a href="' + root + 'cerez-politikasi/">Çerez politikası</a></p>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn" data-consent="kabul">Kabul et</button>' +
      '<button type="button" class="btn btn--ghost" data-consent="ret">Reddet</button>' +
      "</div>";
    banner.addEventListener("click", function (e) {
      var v = e.target.getAttribute && e.target.getAttribute("data-consent");
      if (!v) return;
      setChoice(v);
      if (v === "kabul") loadAnalytics(); else clearAnalyticsCookies();
      hideBanner();
    });
    document.body.appendChild(banner);
  }
  function showBanner() {
    if (!banner) buildBanner();
    banner.hidden = false;
  }
  function hideBanner() {
    if (banner) banner.hidden = true;
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest("[data-consent-open]");
    if (t) { e.preventDefault(); showBanner(); }
  });

  var choice = getChoice();
  if (choice === "kabul") loadAnalytics();
  else if (choice !== "ret") showBanner();
})();
