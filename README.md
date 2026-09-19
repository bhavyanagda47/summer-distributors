# Summer Distributors Limited — website

Static site for **GitHub Pages**. Five pages, no shop, no prices.

Cream / indigo / taupe. Outfit headings, Literata body. WhatsApp button on every page (bottom right). One **Request a quote** in the header — not on each category.

---

## Files (what you actually edit)

```
summer-site/
├── index.html                 Home
├── what-we-carry.html         Categories
├── how-we-work.html           Ask → quote → confirm → deliver
├── about.html
├── contact.html               Form + map (this is also “location”)
├── 404.html
├── README.md                  This file
├── CNAME                      Uncomment / add when you have a domain
└── assets/
    ├── css/style.css          Colours, type, layout
    ├── js/config.js           ★ THE FILE YOU EDIT WEEKLY
    ├── js/site.js             Header, footer, WhatsApp, form — leave unless you know JS
    └── images/                Logo, photos, favicon
```

**You almost never touch the HTML.** Names, phone, WhatsApp, email, address, map pin, and the six category titles live in `assets/js/config.js`.

---

## 1. Look at it on your computer

You do not need GitHub yet.

1. Download this folder.
2. Double-click `index.html`.
3. Click **What we carry**, **How we work**, **About**, **Contact** — those are separate pages, not one long scroll.
4. The green circle is WhatsApp. Until you put a number in `config.js` it takes you to Contact.

If the logo or photos are missing, you opened a single file that was saved without the `assets` folder. Keep the folder together.

---

## 2. The one file that changes the live site

Open `assets/js/config.js` in any text editor (VS Code, Notepad, TextEdit).

```js
phone: "+254 7xx xxx xxx",     // shown on Contact
whatsapp: "2547xxxxxxxx",      // digits only, no +  — powers the green button
email: "quotes@yourdomain",
addressLines: ["Your road", "Meru"],
mapQuery: "Your road, Meru, Kenya",   // Google pin
```

Categories:

```js
{ id: "cat-1", name: "Cooking oils", blurb: "20L and 1L.", photo: "" },
```

When you have a photo, put it in `assets/images/` and set:

```js
photo: "assets/images/oils.jpg"
```

Save. Refresh the browser. That is the whole publishing model: **edit → save → (later) commit → push**.

Empty strings stay as grey “add this in config.js” notes. Nothing fake goes live.

---

## 3. Replace the stand-in photos

| File | Where it shows | Replace with |
|---|---|---|
| `photo-loading-lorry.jpg` | Home band, How we work step 4 | Your crew loading |
| `photo-goods-outside.jpg` | How we work step 3 | Packed pallet |
| `photo-warehouse.jpg` | What we carry | Aisle |
| `photo-office.jpg` | About | Office |
| `photo-depot-exterior.jpg` | About + Contact | **Your** building |
| `photo-map-meru.jpg` | Home coverage | Keep, or drop if you prefer |
| `logo.png` | Header | Your lockup (indigo rectangle) |

Keep the **same file names** and you do not touch HTML. Phone photos are fine; export around 1600px wide.

Do not ship the stand-ins forever — carton text and the “OFISI” wall are invented.

---

## 4. Put it on GitHub (first time)

You need a free GitHub account: [github.com/signup](https://github.com/signup)

### Create the repo

1. GitHub → **New repository**.
2. Name: `summer-distributors` (or `summer-distributors.github.io` if you want `https://YOURUSER.github.io` with no extra path).
3. Public.
4. **Do not** add a README (we already have one).
5. Create.

### Upload the files (no command line)

1. On the empty repo page: **uploading an existing file**.
2. Drag **everything inside** `summer-site/` (the html files, `assets`, this README) — not a zip of a nested extra folder.
3. Commit.

### Turn on Pages

1. Repo → **Settings** → **Pages**.
2. Source: **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`.
4. Save.

After a minute the site is at:

`https://YOURUSER.github.io/summer-distributors/`

(If the repo is `YOURUSER.github.io`, it is `https://YOURUSER.github.io/`.)

### If pictures 404

You uploaded `summer-site/index.html` inside an extra folder. Pages must see `index.html` at the repo root.

---

## 5. Going live with a real domain (later)

1. Buy the domain (year at a time, as you wanted).
2. In the repo, create a file named `CNAME` containing one line: `www.yourdomain.co.ke`
3. At your registrar, point `www` (and `@` if they allow) to GitHub Pages. GitHub’s current IPs and the `CNAME` record they want: [docs.github.com — custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
4. Settings → Pages → Custom domain → the same name → Save. Tick HTTPS when it offers.

Leave `CNAME` out until the domain is paid for.

---

## 6. Making a change after launch

Every update is the same three steps:

1. Edit `config.js` or swap an image (same filename).
2. GitHub repo → the file → pencil icon → paste → **Commit**.
   Or use GitHub Desktop if you prefer.
3. Wait ~30 seconds. Refresh the live site (hard refresh: Ctrl+Shift+R).

That is how a category name, a WhatsApp number, or a new warehouse photo goes live.

---

## 7. What the green button and the form do

- **Green WhatsApp (all pages):** uses `whatsapp` from config. If empty, it goes to Contact so the button is never dead.
- **Header Request a quote:** always Contact.
- **Contact form:** builds a message from the fields. Then:
  1. If `v2.formEndpoint` is set (Formspree etc.) — POST there.
  2. Else if `whatsapp` is set — opens WhatsApp with the list filled in.
  3. Else if `email` is set — opens a mail draft.
  4. Else — tells you to fill config.

No backend, no M-Pesa, no cart.

---

## 8. v2 switches (in config.js)

```js
v2: {
  showDeliveryMethod: false,  // set true + fill deliveryMethod
  deliveryMethod: "",
  showBrands: false,
  brands: [],
  showLeading: false,         // “leading distributor” on About
  formEndpoint: ""            // Formspree URL
}
```

HTML comments marked `V2:` are extra blocks (category pages, brand strip). Uncomment when you actually have the content — not before.

---

## 9. Kiswahili

English is the working copy. Three Swahili lines only, from config:

- Quote button: `Omba bei`
- Home: `kiswahili.homeLine`
- Footer: `Bei kwa ombi`

Have someone who uses it every day read those before you call it done.

---

## 10. Colours and type (if you must)

`assets/css/style.css` — `--indigo: #312682` matches the logo. Do not switch it back to dusty slate. Fonts load from Google; if a shop has no data they get a system serif/sans.
