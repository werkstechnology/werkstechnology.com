// E-posta adresi kaynak kodda düz metin durmasın diye sayfa yüklenince birleştirilir.
(function () {
  var domain = "werkstechnology" + "." + "com";
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var address = el.getAttribute("data-mail") + "@" + domain;
    el.setAttribute("href", "mailto:" + address);
    if (el.hasAttribute("data-mail-show")) el.textContent = address;
  });
})();

// Akış çizgisi: kaydırdıkça dolar, bölümler sırayla yerine oturur.
(function () {
  var flow = document.querySelector(".flow");
  if (!flow || !("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("fx");

  var bar = document.createElement("span");
  bar.className = "flow-progress";
  bar.setAttribute("aria-hidden", "true");
  flow.appendChild(bar);

  var nodes = Array.prototype.slice.call(flow.querySelectorAll(".node"));

  // Ekranın alt üçte birine giren bölüm aktif olur ve öyle kalır.
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("is-active");
        io.unobserve(e.target);
      }
    });
  }, { rootMargin: "0px 0px -30% 0px" });
  nodes.forEach(function (n) { io.observe(n); });

  var ticking = false;
  function update() {
    ticking = false;
    var r = flow.getBoundingClientRect();
    var max = r.height - 50;
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var h = atBottom ? max : Math.max(0, Math.min(max, window.innerHeight * 0.7 - r.top - 14));
    bar.style.height = h + "px";

    var done = h >= max - 1;
    flow.classList.toggle("is-done", done);
    bar.style.opacity = done ? "0" : "1";
    if (atBottom) nodes.forEach(function (n) { n.classList.add("is-active"); });
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
