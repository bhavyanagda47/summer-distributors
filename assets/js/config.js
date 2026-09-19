/* ============================================================
   EDIT THIS FILE to change names, contacts, categories.
   Empty strings stay hidden on the site (placeholders).
   Fill a value, save, commit, push — that page updates.
   ============================================================ */

window.SDL = {
  legalName: "Summer Distributors Limited",
  shortName: "Summer Distributors",
  tagline: "Household Items and Foodstuffs",

  /* --- fill these when you have them --- */
  phone: "",                 // e.g. "+254 7xx xxx xxx"
  whatsapp: "",              // digits only, e.g. "2547xxxxxxxx"  (no +)
  email: "",                 // e.g. "quotes@..."
  addressLines: [
    // "Maua Road",
    // "Meru"
  ],
  mapQuery: "Meru, Kenya",   // change to the street when you have it
  mapZoom: 13,

  hoursDepot: "Monday–Saturday",
  hoursWhatsapp: "Any day",
  baseTown: "Meru",
  counties: [
    "Meru County",
    "Tharaka Nithi County",
    "Laikipia County",
    "Isiolo County"
  ],
  yearsApprox: 25,
  quoteSla: "next business day",
  payment: ["M-Pesa", "cash", "credit"],

  /* Product lines — rename these. Optional photo: "assets/images/cat-1.jpg" */
  categories: [
    { id: "cat-1", name: "Category 1", blurb: "Replace this line with a short description.", photo: "" },
    { id: "cat-2", name: "Category 2", blurb: "Replace this line with a short description.", photo: "" },
    { id: "cat-3", name: "Category 3", blurb: "Replace this line with a short description.", photo: "" },
    { id: "cat-4", name: "Category 4", blurb: "Replace this line with a short description.", photo: "" },
    { id: "cat-5", name: "Category 5", blurb: "Replace this line with a short description.", photo: "" },
    { id: "cat-6", name: "Category 6", blurb: "Replace this line with a short description.", photo: "" }
  ],

  kiswahili: {
    quoteButton: "Omba bei",
    homeLine: "Tunahudumia biashara katika kaunti za Meru, Tharaka Nithi, Laikipia na Isiolo.",
    pricesOnRequest: "Bei kwa ombi",
    contactUs: "Wasiliana nasi"
  },

  /* V2 flags — set true when you are ready. */
  v2: {
    showDeliveryMethod: false,   // fill deliveryMethod first
    deliveryMethod: "",          // e.g. "Our vans on scheduled runs."
    showBrands: false,
    brands: [],                  // e.g. ["Brand A", "Brand B"]
    showLeading: false,          // adds “leading distributor” on About
    formEndpoint: ""             // e.g. Formspree https://formspree.io/f/xxxx
  }
};
