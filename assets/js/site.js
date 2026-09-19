/* Shared chrome: header, footer, WhatsApp float, categories, contact fill. */
(function () {
  const C = window.SDL || {};
  const page = document.body.getAttribute("data-page") || "";

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function waHref() {
    const n = (C.whatsapp || "").replace(/\D/g, "");
    if (!n) return "contact.html";
    const text = encodeURIComponent("Hello, I would like a quote from Summer Distributors Limited.");
    return "https://wa.me/" + n + "?text=" + text;
  }

  function waLabel() {
    return C.whatsapp ? "Chat on WhatsApp" : "WhatsApp — add number in config.js";
  }

  function header() {
    const current = (href) => (page === href ? ' aria-current="page"' : "");
    return `
<header class="site-header" id="site-header">
  <div class="inner">
    <a class="brand" href="index.html">
      <img src="assets/images/logo.png" alt="SDL" />
      <span class="wordmark">${C.legalName || "Summer Distributors Limited"}<small>Meru</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-nav">Menu</button>
    <nav class="primary" id="primary-nav">
      <a href="what-we-carry.html"${current("carry")}>What we carry</a>
      <a href="how-we-work.html"${current("how")}>How we work</a>
      <a href="about.html"${current("about")}>About</a>
      <a href="contact.html"${current("contact")}>Contact</a>
    </nav>
    <a class="btn btn-primary btn-stack btn-quote" href="contact.html">
      Request a quote
      <span class="sw">${C.kiswahili.quoteButton}</span>
    </a>
  </div>
</header>`;
  }

  function footer() {
    const counties = (C.counties || []).join(" · ");
    const wa = C.whatsapp
      ? `<a href="${waHref()}">WhatsApp</a>`
      : `WhatsApp`;
    const em = C.email
      ? `<a href="mailto:${C.email}">${C.email}</a>`
      : ``;
    return `
<footer class="site-footer">
  <div class="inner">
    <div>
      <strong>${C.legalName}</strong><br />
      ${C.baseTown} · ${counties}
    </div>
    <div>
      <span class="sw">${C.kiswahili.pricesOnRequest}</span> · Quote on request<br />
      ${wa}${em ? " · " + em : ""}
    </div>
  </div>
</footer>`;
  }

  function floatWa() {
    return `
<a class="float-wa" href="${waHref()}" target="${C.whatsapp ? "_blank" : "_self"}" rel="noopener" aria-label="${waLabel()}" title="${waLabel()}">
  <span class="sr">WhatsApp</span>
  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 3.5A11 11 0 0 0 2.4 16.7L1 23l6.5-1.4A11 11 0 0 0 12 23a11 11 0 0 0 8.5-19.5zM12 21a9 9 0 0 1-4.6-1.3l-.3-.2-3.9.8.8-3.8-.2-.3A9 9 0 1 1 12 21zm5-6.7c-.3-.1-1.6-.8-1.9-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8 8 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5.1-.3c0-.1 0-.3-.1-.4s-.6-1.4-.8-1.9-.4-.4-.6-.4h-.5c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.8 3.5 1.4.6 1.9.7 2.6.6.4-.1 1.6-.7 1.8-1.3s.2-1.2.2-1.3 0-.2-.2-.3z"/></svg>
</a>`;
  }

  /* Inject chrome */
  document.body.insertAdjacentHTML("afterbegin", header());
  document.body.insertAdjacentHTML("beforeend", footer() + floatWa());

  const head = document.getElementById("site-header");
  const tog = head.querySelector(".menu-toggle");
  tog.addEventListener("click", () => {
    const open = head.classList.toggle("is-open");
    tog.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* Fill [data-sdl="key"] text nodes */
  document.querySelectorAll("[data-sdl]").forEach((node) => {
    const key = node.getAttribute("data-sdl");
    const val = C[key];
    if (val == null || val === "") {
      if (node.hasAttribute("data-empty")) node.textContent = node.getAttribute("data-empty");
      return;
    }
    if (Array.isArray(val)) node.textContent = val.join(", ");
    else node.textContent = String(val);
  });

  /* Counties sentence */
  document.querySelectorAll("[data-counties]").forEach((n) => {
    const list = C.counties || [];
    n.textContent = list.slice(0, -1).join(", ") + (list.length > 1 ? " and " : "") + (list.slice(-1)[0] || "");
  });

  document.querySelectorAll("[data-kiswahili]").forEach((n) => {
    const k = n.getAttribute("data-kiswahili");
    if (C.kiswahili && C.kiswahili[k]) n.textContent = C.kiswahili[k];
  });

  /* Categories */
  function catCard(cat) {
    const photo = cat.photo
      ? `<img class="thumb" src="${cat.photo}" alt="${cat.name}" />`
      : `<div class="ph">${cat.name}<br>your photo</div>`;
    return `<article class="card">${photo}<h3 class="cat-name">${cat.name}</h3><p>${cat.blurb || ""}</p></article>`;
  }
  document.querySelectorAll("[data-categories]").forEach((root) => {
    const limit = parseInt(root.getAttribute("data-limit") || "99", 10);
    const cats = (C.categories || []).slice(0, limit);
    root.innerHTML = cats.map(catCard).join("");
  });

  /* Contact details */
  const details = document.getElementById("contact-details");
  if (details) {
    const rows = [];
    rows.push(`<p><strong>WhatsApp</strong><br>${C.whatsapp ? `<a href="${waHref()}">${C.whatsapp}</a> — ${C.hoursWhatsapp}` : `<span class="empty">Add whatsapp in assets/js/config.js</span>`}</p>`);
    rows.push(`<p><strong>Phone</strong><br>${C.phone ? `<a href="tel:${C.phone.replace(/\s/g, "")}">${C.phone}</a>` : `<span class="empty">Add phone in config.js</span>`}</p>`);
    rows.push(`<p><strong>Email</strong><br>${C.email ? `<a href="mailto:${C.email}">${C.email}</a>` : `<span class="empty">Add email in config.js</span>`}</p>`);
    const addr = (C.addressLines || []).filter(Boolean);
    rows.push(`<p><strong>Depot</strong><br>${addr.length ? addr.join("<br>") : `<span class="empty">${C.baseTown} — add street in config.js</span>`}<br>Hours: ${C.hoursDepot}</p>`);
    rows.push(`<p><strong>We supply</strong><br><span data-counties></span></p>`);
    details.innerHTML = rows.join("");
    details.querySelectorAll("[data-counties]").forEach((n) => {
      const list = C.counties || [];
      n.textContent = list.slice(0, -1).join(", ") + " and " + list.slice(-1)[0];
    });
  }

  /* Map */
  const map = document.getElementById("map-embed");
  if (map) {
    const q = encodeURIComponent(C.mapQuery || "Meru, Kenya");
    const z = C.mapZoom || 13;
    map.src = `https://maps.google.com/maps?q=${q}&z=${z}&output=embed`;
  }

  /* Quote form */
  const form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const body = [
        "Quote request — Summer Distributors Limited",
        "",
        "Name: " + (data.name || ""),
        "Shop: " + (data.shop || ""),
        "Town / county: " + (data.town || ""),
        "Phone: " + (data.phone || ""),
        "",
        "What they need:",
        data.need || ""
      ].join("\n");

      if (C.v2 && C.v2.formEndpoint) {
        fetch(C.v2.formEndpoint, {
          method: "POST",
          headers: { Accept: "application/json", "Content-Type": "application/json" },
          body: JSON.stringify(data)
        }).then(() => {
          form.reset();
          alert("Sent. We reply by the next business day.");
        }).catch(() => alert("Could not send. Use WhatsApp instead."));
        return;
      }

      const n = (C.whatsapp || "").replace(/\D/g, "");
      if (n) {
        window.location.href = "https://wa.me/" + n + "?text=" + encodeURIComponent(body);
        return;
      }
      if (C.email) {
        window.location.href = "mailto:" + C.email + "?subject=" + encodeURIComponent("Quote request") + "&body=" + encodeURIComponent(body);
        return;
      }
      alert("Add a WhatsApp number or email in assets/js/config.js so this form has somewhere to go. For now the fields stay on the page.");
    });
  }

  /* V2 delivery */
  if (C.v2 && C.v2.showDeliveryMethod && C.v2.deliveryMethod) {
    document.querySelectorAll("[data-v2-delivery]").forEach((n) => {
      n.hidden = false;
      n.textContent = C.v2.deliveryMethod;
    });
  }
})();
