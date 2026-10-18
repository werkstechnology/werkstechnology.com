// E-posta adresi kaynak kodda düz metin durmasın diye sayfa yüklenince birleştirilir.
(function () {
  var domain = "werkstechnology" + "." + "com";
  document.querySelectorAll("[data-mail]").forEach(function (el) {
    var address = el.getAttribute("data-mail") + "@" + domain;
    el.setAttribute("href", "mailto:" + address);
    if (el.hasAttribute("data-mail-show")) el.textContent = address;
  });
})();
