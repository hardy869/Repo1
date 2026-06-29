/* =============================================================================
   content.js  —  THE SINGLE SOURCE OF TRUTH
   -----------------------------------------------------------------------------
   Everything personal lives here: names, dates, the password, every line of
   text, and every photo/video path. Edit this file to change the website.
   You should almost never need to touch the HTML or other JS.

   HOW TO ADD A PHOTO:
     1. Save your image into  assets/img/  using the exact filename shown
        below (e.g. IMAGE_PLACEHOLDER_06.jpg).
     2. Refresh the page. It appears automatically. Until then, a labelled
        placeholder is shown so the site always looks complete.
   ========================================================================== */

window.CONTENT = {

  /* ---- Core identity ---------------------------------------------------- */
  meta: {
    moon: "Himanshu",          // you  (Chand / the Moon)
    star: "Rudrakshi",         // her  (Taara / the Star)
    moonNick: "Chand",
    starNick: "Taara",
    domain: "Himanshurudrakshi.world",
    anniversary: "2025-10-09", // YYYY-MM-DD  (relationship became official)
  },

  /* ---- Secret access gate ---------------------------------------------- */
  access: {
    // She types this to enter. Case-insensitive; spaces/dashes ignored.
    password: "09-10-2025",
    title: "Only my Taara may enter.",
    hint: "The day the Moon and the Star became official  ·  DD-MM-YYYY",
    placeholder: "DD-MM-YYYY",
    wrong: "Not quite, my love. Try again. ✨",
    button: "Enter our universe",
  },

  /* ---- Music ------------------------------------------------------------ */
  // Per-screen background music. Each track loops and CROSSFADES into the next.
  // Screens that share a track keep playing it without restarting.
  music: {
    volume: 0.55,
    // The actual audio files. Drop them in assets/audio/ with these names.
    files: {
      theme: "assets/audio/theme.mp3",     // the This Is Us theme
      piano: "assets/audio/piano.mp3",     // soft piano for the story (swap for jazz.mp3 if you prefer)
      bubu:  "assets/audio/bubu.mp3",      // upbeat reel music for Bubu & Dudu
      hold:  "assets/audio/holdmusic.mp3", // quirky corporate hold music for the HR portal
    },
    // Default track for any screen not listed below (the story-reading screens).
    default: "piano",
    // Which track plays on which screen. Set a value to null for silence.
    byScreen: {
      access: null,                 // silent until she unlocks
      welcome: "theme",             // This Is Us on arrival
      "bubu-dudu": "bubu",          // upbeat reel vibe
      "hr-transition": "hold",
      resume: "hold",
      verification: "hold",
      "stress-test": "hold",
      "culture-fit": "hold",
      references: "hold",
      compensation: "hold",
      "offer-letter": "hold",
      "final-proposal": "theme",    // the theme swells for the moment
    },
  },

  /* ======================================================================
     PART I — THE LOVE STORY  🌙
     ====================================================================== */

  welcome: {
    eyebrow: "for Taara",
    lines: [
      "Hi Taara.",
      "I built you a little universe.",
      "There's no rush in space —",
      "take your time. 🌙",
    ],
    signature: "— your Chand",
    button: "Begin our story",
  },

  beforeUs: {
    title: "Before us",
    body: [
      "There was a café once.",
      "It's gone now — torn down, as if it only ever existed to do one thing: introduce me to you.",
      "A friend sat us at a small table that doesn't exist anymore.",
      "I didn't know it yet, but my whole life started in that room.",
    ],
    image: "IMAGE_PLACEHOLDER_02",
    imageDesc: "The café where we met (now demolished)",
    // EXAMPLE of "reveal" mode — the café photo is hidden until she taps it.
    media: {
      mode: "reveal",
      items: [
        { image: "IMAGE_PLACEHOLDER_02", desc: "The café where we met (now demolished)", caption: "Tap to see where it all began ✨" },
      ],
    },
    button: "Continue",
  },

  whenIKnew: {
    title: "When I knew",
    lines: [
      "I didn't fall for your smile first.",
      "I fell the day I understood who you really were —",
      "a woman who knew exactly what she was worth.",
      "And it scared me. Something that rare. That certain.",
      "So I did the only thing that made sense.",
      "I called my mom that same day,",
      "and told her I had found her.",
    ],
    image: "IMAGE_PLACEHOLDER_04",
    imageDesc: "A photo of her that captures 'she knows her worth'",
    button: "Continue",
  },

  littleThings: {
    title: "Little things I'll never forget",
    subtitle: "Tap each star. ✨",
    cards: [
      {
        title: "Flowers, every time",
        text: "I never show up empty-handed. Some part of me needs to watch your face the second you see them.",
        image: "IMAGE_PLACEHOLDER_05",
        imageDesc: "Flowers you've given her",
      },
      {
        title: "The dudu & bubu pillows",
        text: "Our very first gift. So that even on the nights we were apart, you had a little us to hold.",
        image: "IMAGE_PLACEHOLDER_06",
        imageDesc: "The dudu-bubu pillow set",
      },
      {
        title: "The bag in May",
        text: "Your birthday. I still think about how your eyes went soft. I'd buy you a thousand more.",
        image: "IMAGE_PLACEHOLDER_07",
        imageDesc: "The birthday bag (May)",
      },
      {
        title: "You, laughing",
        text: "The one sound I'd choose over any song. I've quietly memorized it.",
        image: "IMAGE_PLACEHOLDER_08",
        imageDesc: "A candid of her laughing",
      },
      {
        title: "Just being there",
        text: "You told me you feel most loved when I'm simply present. So I'll keep choosing to be there — for all of it.",
        image: "IMAGE_PLACEHOLDER_09",
        imageDesc: "A quiet moment of the two of you together",
      },
    ],
    button: "Continue",
  },

  storm: {
    title: "The storm",
    subtitle: "Not everything was moonlight.",
    timeline: [
      {
        date: "Just days in",
        title: "I left for another city",
        text: "Days after I told you I loved you, work pulled me away. You weren't sure about the distance. Neither was I. We tried anyway.",
      },
      {
        date: "Then",
        title: "You got sick",
        text: "I took you to the doctor and watched you be brave through it. I would have traded places in a heartbeat.",
      },
      {
        date: "March & April",
        title: "My shoulder surgery",
        text: "Months we couldn't meet. You stayed — on calls, in texts, in every small way the distance allowed.",
      },
      {
        date: "June",
        title: "The night we almost broke",
        text: "A fight. A silence. A gap in words that nearly cost us everything. And then — we learned how to find each other again.",
      },
    ],
    resolution: "Every storm we walked through only showed me one thing: I never want to face another one without you.",
    button: "Continue",
  },

  bubuDudu: {
    title: "Bubu & Dudu",
    body: [
      "Somewhere between the hard days, we became two little pandas.",
      "You're Bubu. I'm Dudu.",
      "We send each other reels at midnight and speak a language only we understand.",
      "This is the part of us that never takes anything too seriously —",
      "and I want to keep being this silly with you for the rest of my life.",
    ],
    // A single PNG with BOTH characters (transparent background recommended).
    // Drop your file at  assets/img/bubu-dudu.png  and it appears as the centerpiece.
    hero: { image: "bubu-dudu", desc: "Dudu & Bubu (your shared PNG)" },

    // mode "wall" → a looping reel wall. Videos autoplay muted on loop; images sit among them.
    media: {
      mode: "wall",
      items: [
        { video: "VIDEO_PLACEHOLDER_04", desc: "A favourite dudu-bubu reel" },
        { image: "IMAGE_PLACEHOLDER_13", desc: "Dudu-bubu panda still" },
        { video: "VIDEO_PLACEHOLDER_05", desc: "Another reel you two love" },
        { image: "IMAGE_PLACEHOLDER_14", desc: "A reel screenshot / the pillows" },
        { video: "VIDEO_PLACEHOLDER_06", desc: "One more reel for the loop" },
      ],
    },
    // EXAMPLE of "flip" mode — front shows a photo, tap to flip to the text on the back.
    flips: [
      { image: "IMAGE_PLACEHOLDER_26", back: "Bubu 🐼" },
      { image: "IMAGE_PLACEHOLDER_27", back: "Dudu 🐼" },
      { image: "IMAGE_PLACEHOLDER_28", back: "midnight reels 💌" },
    ],
    button: "Continue",
  },

  future: {
    title: "Where we're going",
    subtitle: "The life I want to build with you.",
    dreams: [
      { title: "Chandigarh", text: "A city to finally call ours.", image: "IMAGE_PLACEHOLDER_15", imageDesc: "Chandigarh" },
      { title: "A home", text: "Too many cushions, and your favourite corner." },
      { title: "Two kids", text: "With your eyes. Hopefully your patience." },
      { title: "A pack of dogs", text: "As many as you'll let me." },
      { title: "The whole world", text: "Good food, new cities, one stamp at a time." },
      { title: "Growing old", text: "Slowly. Together. With family always close." },
    ],
    // A photo gallery beneath the dreams. mode "gallery" → tap any photo to enlarge.
    media: {
      mode: "gallery",
      items: [
        { image: "IMAGE_PLACEHOLDER_15", desc: "Chandigarh", caption: "Chandigarh" },
        { image: "IMAGE_PLACEHOLDER_16", desc: "A future dream", caption: "Our home" },
        { image: "IMAGE_PLACEHOLDER_17", desc: "A future dream", caption: "On the road" },
      ],
    },
    button: "So… there's just one formality left.",
  },

  /* ======================================================================
     PART II — THE HR EVALUATION PORTAL  💼
     ====================================================================== */

  hrTransition: {
    boot: [
      "> initializing TAARA Talent Acquisition System™ …",
      "> secure connection established",
      "> candidate detected: HIMANSHU ARORA",
      "> position: HUSBAND  (permanent · lifetime contract)",
      "> hiring manager: RUDRAKSHI",
      "> status: EVALUATION REQUIRED",
      "> loading assessment …",
    ],
  },

  resume: {
    heading: "Candidate Résumé",
    name: "Himanshu Arora",
    role: "Candidate — Husband (Lifetime Role)",
    photo: "IMAGE_PLACEHOLDER_18",
    photoDesc: "A clean headshot of you",
    objective: "To be permanently and exclusively employed by Rudrakshi, with absolutely no intention of ever seeking other opportunities.",
    experience: [
      { role: "Chief Dudu Officer", company: "Bubu & Dudu (Pvt.) Ltd.", period: "Oct 2025 – present",
        bullets: ["Maintained 100% midnight reel-delivery uptime", "Sole authorised provider of comfort and forehead kisses"] },
      { role: "Professional Flower Deliverer", company: "Every Single Meeting", period: "Ongoing",
        bullets: ["Never once arrived empty-handed", "Specialises in the half-second before she smiles"] },
      { role: "On-call Care Unit", company: "Doctor visits & sick days", period: "As needed",
        bullets: ["Drove her to the doctor without being asked", "Available 24/7 — zero leave taken"] },
    ],
    skills: ["Loyalty", "Thoughtful gifting", "Showing up", "Long-distance endurance", "Conflict repair", "Elite panda impressions"],
    certifications: ["Mom-Approved (Day 1)", "Survived long distance", "Post-surgery resilience"],
    button: "Proceed to verification",
  },

  verification: {
    heading: "Background Verification",
    subtitle: "Cross-referencing the candidate's claims…",
    items: [
      { claim: "Brings flowers every time", result: "CONFIRMED" },
      { claim: "Called his mother the same day he knew", result: "TRUE" },
      { claim: "Showed up when she was sick", result: "VERIFIED" },
      { claim: "Stayed through the distance", result: "CONFIRMED" },
      { claim: "Loves her at her full worth", result: "BEYOND DOUBT" },
    ],
    button: "Proceed to stress test",
  },

  stressTest: {
    heading: "Stress Test",
    subtitle: "Simulating adverse conditions…",
    scenarios: [
      { scenario: "Long distance (two different cities)", result: "PASSED" },
      { scenario: "Her illness — emergency care required", result: "PASSED" },
      { scenario: "His shoulder surgery (Mar–Apr)", result: "PASSED" },
      { scenario: "The June fight — communication breakdown", result: "PASSED WITH DISTINCTION" },
    ],
    summary: "Resilience rating: 100%.",
    button: "Proceed to culture fit",
  },

  cultureFit: {
    heading: "Culture Fit",
    subtitle: "Compatibility analysis complete.",
    metrics: [
      { metric: "Dudu–Bubu fluency", score: 100 },
      { metric: "Shared dreams (Chandigarh · kids · dogs)", score: 100 },
      { metric: "Food-exploration compatibility", score: 100 },
      { metric: "Moon ↔ Star synergy", score: 100 },
    ],
    verdict: "Compatibility: 100%. Statistically improbable. Immediate hire recommended.",
    button: "Proceed to reference checks",
  },

  references: {
    heading: "Reference Checks",
    subtitle: "Contacting the candidate's references…",
    list: [
      {
        tag: "Reference #1",
        name: "The candidate's mother",
        note: "Status: strongly recommends. Has approved since day one.",
        video: "VIDEO_PLACEHOLDER_02",
        videoDesc: "Short video from your mom (or sister) vouching for you",
        photo: "IMAGE_PLACEHOLDER_20",
      },
    ],
    button: "Proceed to compensation",
  },

  compensation: {
    heading: "Compensation Discussion",
    note: "This role cannot be paid in money.",
    perks: [
      { perk: "Forehead kisses", detail: "Unlimited · vesting daily" },
      { perk: "Flowers", detail: "Recurring · no end date" },
      { perk: "My presence", detail: "Fully guaranteed" },
      { perk: "Paid Taara Time (PTT)", detail: "All of it. Always." },
      { perk: "Care coverage", detail: "Every doctor visit, every bad day" },
      { perk: "Retirement plan", detail: "Growing old together in Chandigarh" },
    ],
    button: "Review the offer",
  },

  offer: {
    heading: "Offer Letter",
    greeting: "Dear Rudrakshi,",
    body: [
      "We are delighted to extend a formal offer for the position of Wife, to be filled exclusively by you.",
      "You would report to no one. In fact — you'd be the boss.",
      "The candidate, Himanshu Arora, has passed every assessment: references, stress tests, culture fit, all of it.",
      "But here is the truth the system was hiding all along.",
      "The evaluation was never really his to pass.",
      "It was always going to be your choice.",
    ],
    signature: "With everything I am,",
    signedBy: "Your Chand 🌙",
    button: "Continue",
  },

  /* ======================================================================
     THE MOMENT  💍
     ====================================================================== */

  finalProposal: {
    lines: [
      "The system is closed now.",
      "No more tests. No more jokes.",
      "It's just me.",
      "The Moon — asking his Star,",
      "across every mile and every storm we survived…",
    ],
    finalLine: "Now look at me.",
    afterHint: "(turn around 🌙)",
    button: "♡",
  },

  /* ======================================================================
     POST-PROPOSAL KEEPSAKE HOME  🏠
     ====================================================================== */

  keepsake: {
    title: "Himanshu & Rudrakshi",
    message: "Our universe. Replay any part of it, anytime.",
    // mode "shuffle" → an auto-rotating album that crossfades between photos.
    media: {
      mode: "shuffle",
      items: [
        { image: "IMAGE_PLACEHOLDER_22", desc: "Your engagement photo (add after she says yes)", caption: "The yes 💍" },
        { image: "IMAGE_PLACEHOLDER_23", desc: "A favourite photo of you two", caption: "Us" },
        { image: "IMAGE_PLACEHOLDER_24", desc: "Another favourite memory", caption: "Adventures" },
        { image: "IMAGE_PLACEHOLDER_25", desc: "One more for the album", caption: "Always" },
      ],
    },
    counterLabel: "Together since",
  },
};
