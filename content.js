window.FINSIGHT_CONTENT = {
  pageTitle: 'finSight - Accessible Banking',

  nav: {
    logoAlt: 'finSight',
  },

  hero: {
    headlinePrefix: 'Banking built for your',
    cyclingWords: ['Independence', 'Confidence', 'Autonomy'],
    subtitle: 'Audio-first mobile banking, built for BLV users.',
  },

  challenge: {
    phone: {
      bankName: 'YourBank',
      time: '9:41',
      balanceLabel: 'Total Balance',
      balance: '$2,450.00',
      actions: ['Send', 'Deposit', 'Pay'],
      recentLabel: 'Recent',
      transactions: [
        { name: 'Netflix', amount: '-$15.99' },
        { name: 'Starbucks', amount: '-$6.50' },
      ],
      depositTitle: '<- Deposit Check',
      screenReaderOutputHtml: 'Unlabeled button.<br>Unlabeled button.<br>Image.',
      cameraHint: 'Position front of check in frame',
      problemDepositAction: 'Deposit',
      imageTooDarkError: 'Image too dark - Try again',
      checkNotInFrameError: 'Check not in frame',
      checkCaptured: 'Check captured',
      processingTitle: 'Processing',
      processingLabel: 'Analyzing check...',
      processingSub: 'This may take a moment',
      successTitle: 'Deposit Submitted',
      successAmount: '$150.00',
      successLabel: 'Check deposit received',
      successSub: 'Available in 1-2 business days',
      successRef: 'Ref #2847561',
    },
    heading: 'Can you do this with your eyes closed?',
    body: 'Imagine navigating this flow without being able to see the screen. For millions of blind Americans, this is the daily reality of using financial apps that were never designed with them in mind.',
  },

  stats: {
    label: 'The Reality',
    items: [
      {
        value: 84,
        suffix: '%',
        label: 'rely on workarounds just to do basic banking',
      },
      {
        value: 68,
        suffix: '%',
        label: 'say check deposit is their most frustrating banking task',
        bars: [
          { label: 'Check deposit', width: '88%' },
          { label: 'Transfers', width: '55%' },
          { label: 'Balance check', width: '35%' },
        ],
      },
      {
        value: 29,
        suffix: '%',
        label: 'actually attempt mobile check deposit regularly',
        captions: ['68% frustrated', '29% attempt'],
        note: '"68% frustrated. Only 29% even try."',
      },
    ],
  },

  screenReaders: {
    toolsLabel: 'Existing accessibility tools: VoiceOver, TalkBack, Be My Eyes',
    tools: ['VoiceOver', 'TalkBack', 'Be My Eyes'],
    headingHtml: "Screen readers<br>aren't enough?",
    answer: 'Yes, but no.',
    body: 'Screen readers can announce what is on the screen, but they cannot replace missing product guidance. For visual tasks like check deposit, users need real-time direction, clear error recovery, and confirmation that does not depend on sight.',
    subbody: 'That gap came through in both user interviews and industry conversations.',
  },

  quotes: {
    label: 'What we heard from users and banking teams',
    heading: '',
    rows: [
      {
        label: 'BLV users',
        icon: 'user',
        items: [
          {
            name: 'Anonymous User A',
            quote: 'I usually have to ask someone sighted to confirm if the check is even inside the camera frame.',
          },
          {
            name: 'Anonymous User B',
            quote: 'The app says there is an error, but it does not tell me what changed or what I should do next.',
          },
          {
            name: 'Anonymous User C',
            quote: 'I want to do my banking privately. Needing help for a deposit makes a simple task feel exposed.',
          },
          {
            name: 'Anonymous User D',
            quote: 'When feedback is visual only, I am just guessing and repeating the same step over and over.',
          },
        ],
      },
      {
        label: 'Industry experts',
        icon: 'building',
        items: [
          {
            name: 'Accessibility Lead, XX Bank',
            quote: 'Compliance gets teams to the baseline, but complex financial flows need guidance that is built into the experience.',
          },
          {
            name: 'Digital Banking Manager, Redwood Credit Union',
            quote: 'Members need confidence at every step, especially when the task involves money movement or document capture.',
          },
          {
            name: 'Product Strategist, YY Financial',
            quote: 'The biggest gap is not whether a button has a label. It is whether the customer knows what is happening next.',
          },
          {
            name: 'Innovation Lead, Community Banking',
            quote: 'Voice-first guidance can reduce support burden while giving customers more independence in high-stakes tasks.',
          },
        ],
      },
    ],
  },

  meet: {
    heading: 'Meet FinSight.',
    subtitle: 'Voice-first banking, built for BLV users.',
    app: {
      frames: [
        { src: 'assets/finsight-video-frames/screen-01.jpg', alt: 'FinSight welcome screen' },
        { src: 'assets/finsight-video-frames/screen-02-home.jpg', alt: 'FinSight home screen with voice banking tasks' },
        { src: 'assets/finsight-video-frames/screen-02.jpg', alt: 'FinSight deposit check overview' },
        { src: 'assets/finsight-video-frames/screen-03.jpg', alt: 'FinSight account selection screen' },
        { src: 'assets/finsight-video-frames/screen-04.jpg', alt: 'FinSight daily deposit limit screen' },
        { src: 'assets/finsight-video-frames/screen-05.jpg', alt: 'FinSight check capture rotation guidance' },
        { src: 'assets/finsight-video-frames/screen-06.jpg', alt: 'FinSight check capture positioning guidance' },
        { src: 'assets/finsight-video-frames/screen-07.jpg', alt: 'FinSight captured check details screen' },
        { src: 'assets/finsight-video-frames/screen-08.jpg', alt: 'FinSight deposit confirmation screen' },
        { src: 'assets/finsight-video-frames/screen-09.jpg', alt: 'FinSight received check confirmation screen' },
        { src: 'assets/finsight-video-frames/screen-01.jpg', alt: 'FinSight welcome screen' },
        { src: 'assets/finsight-video-frames/screen-10.jpg', alt: 'FinSight settings screen' },
      ],
    },
  },

  bridge: {
    text: 'What we can do to give better audio guidance',
  },

  guidelines: {
    headingHtml: 'Design<br>Guidelines',
    navLabel: 'Guidelines navigation',
    items: [
      {
        title: 'Action-first button labels',
        body: 'Every interactive element should announce what it does before what it is. Screen readers read labels verbatim - make every word purposeful.',
        image: 'assets/insight-1.svg',
      },
      {
        title: 'Announce state changes immediately',
        body: "When UI state changes (loading, error, success), announce it right away via ARIA live regions. Blind users cannot see visual feedback - don't leave them guessing.",
        image: 'assets/insight-2.svg',
      },
      {
        title: 'Audio confirmation for every transaction',
        body: 'Every financial action needs a clear spoken confirmation. Never rely on color changes or subtle animations as the sole signal.',
      },
      {
        title: 'Group related context together',
        body: 'Screen reader users navigate linearly. Scatter information and the mental model breaks. Keep related content - label, value, action - in a single, logical group.',
      },
      {
        title: 'Warn before time limits expire',
        body: 'If a session or action has a time limit, announce the warning early and give users a keyboard- or swipe-accessible way to extend it.',
      },
      {
        title: 'Single-swipe navigation paths',
        body: 'Design flows so every action is reachable with a single swipe or tab. Avoid nested menus that require multiple gestures to traverse.',
      },
      {
        title: 'Vocalize all progress indicators',
        body: 'Spinners and progress bars are invisible to screen readers. Always pair loading states with a text announcement: "Processing your deposit, please wait."',
      },
      {
        title: 'Pair haptic and audio feedback',
        body: 'Combine haptic feedback with audio cues for critical moments - confirmations, errors, and warnings. Multiple sensory channels reinforce clarity.',
      },
    ],
  },

  prototype: {
    heading: 'The Prototype',
    subtitle: 'Explore how finSight reimagines the banking experience for blind users.',
    placeholder: '[ Prototype embed or video goes here ]',
  },

  team: {
    heading: 'Meet the Team',
    members: [
      { image: 'assets/teammembers/j.jpeg', imageAlt: 'Team member portrait', name: 'Jessie Deng', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/jwdeng/' },
      { image: 'assets/teammembers/m.jpeg', imageAlt: 'Team member portrait', name: 'Michelle Lin', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/michellelin4111/' },
      { image: 'assets/teammembers/sa.jpeg', imageAlt: 'Team member portrait', name: 'Sarah Algashgari', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/sarah-algashgari-699961195/' },
      { image: 'assets/teammembers/d.jpg', imageAlt: 'Team member portrait', name: 'Devi Sivakumar', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/devi-sivakumar/' },
      { image: 'assets/teammembers/se.jpeg', imageAlt: 'Team member portrait', name: 'Sejin Kim', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/jin-sejin-kim/' },
    ],
    processHeading: 'Our Process',
    photoCount: 14,
    photoAltPrefix: 'Team photo',
  },

  voiceGuide: {
    pageTitle: 'FinSight Voice Guide',
    eyebrow: 'Voice Guided Mode',
    title: 'FinSight Voice Guide',
    intro: 'A calm, audio-first version of the FinSight story. Press play to hear the site narrated with context, visual description, and section-by-section guidance.',
    unavailable: 'Speech playback is not available in this browser, but the full transcript is still available below.',
    controlsLabel: 'Voice guide controls',
    sectionsLabel: 'Voice guide sections',
    transcriptLabel: 'Current transcript',
    actions: {
      play: 'Play',
      pause: 'Pause',
      previous: 'Previous',
      next: 'Next',
      replay: 'Replay',
      exit: 'Standard site',
    },
    settings: {
      speedLabel: 'Speed',
      verbosityLabel: 'Verbosity',
      speeds: [
        { label: 'Slow', value: 0.5 },
        { label: 'Normal', value: 1 },
        { label: 'Fast', value: 1.5 },
      ],
      verbosity: [
        { label: 'Low', value: 'low' },
        { label: 'Medium', value: 'medium' },
        { label: 'High', value: 'high' },
      ],
    },
    sections: [
      {
        kicker: 'Opening',
        title: 'Banking Built for Independence',
        duration: '0:55',
        summary: 'The site opens with the promise of audio-first banking for blind and low-vision users.',
        narration: 'Welcome to FinSight. The standard website opens with a simple promise: banking built for independence, confidence, and autonomy. Visually, the page is clean and spacious, with the FinSight logo above a large headline. The message is intentionally direct. This project is not only about making a banking app readable by assistive technology. It is about making financial tasks feel private, guided, and possible without relying on sighted help.',
        narrationHigh: 'Welcome to FinSight. The standard website opens with a simple promise: banking built for independence, confidence, and autonomy. The visual design is intentionally open and quiet: a white background, the FinSight logo at the top, and a large headline that changes between independence, confidence, and autonomy. Underneath, the subtitle describes the product as audio-first mobile banking for blind and low-vision users. The main point is that accessibility here is not treated as a checklist. It is framed as a feeling of privacy, orientation, and control during financial tasks.'
      },
      {
        kicker: 'Problem',
        title: 'Can You Do This With Your Eyes Closed?',
        duration: '1:15',
        summary: 'A phone mockup shows how ordinary banking flows can become uncertain without visual context.',
        narration: 'The next section asks: can you do this with your eyes closed? On the page, a phone mockup cycles through a familiar mobile banking flow. First, there is a balance screen with buttons for sending money, depositing a check, and paying a bill. Then the experience becomes less certain. The screen reader output says things like unlabeled button and image. The deposit flow moves into camera capture, where errors appear visually: the image is too dark, or the check is not in frame. For a blind or low-vision user, the problem is not just that the app has buttons. The problem is that the app does not explain what is happening, what changed, or how to recover.',
        narrationHigh: 'The next section asks a sharp question: can you do this with your eyes closed? The page shows a phone mockup on one side and explanatory text on the other. Inside the phone, the banking flow begins normally, with a balance, recent transactions, and action buttons for sending money, depositing a check, and paying a bill. Then the flow exposes the breakdown. The screen reader-style output becomes vague: unlabeled button, unlabeled button, image. The user moves into check capture, where the most important feedback is visual. One screen says the image is too dark. Another says the check is not in frame. A final screen says the check was captured. The section is showing that the user is not missing effort. The product is missing guidance.'
      },
      {
        kicker: 'Reality',
        title: 'The Numbers Behind the Friction',
        duration: '1:05',
        summary: 'The statistics show how often blind users rely on workarounds for basic banking.',
        narration: 'The reality section presents three statistics. Eighty four percent of users rely on workarounds just to do basic banking. Sixty eight percent say check deposit is their most frustrating banking task. Only twenty nine percent actually attempt mobile check deposit regularly. Visually, the page uses large blue numbers, simple charts, and a small comparison graphic. The important story is the gap between need and confidence. Many users want the independence of mobile banking, but the experience asks them to guess during moments where guessing is not acceptable.',
        narrationHigh: 'The reality section presents three statistics in large blue type. First: eighty four percent rely on workarounds just to do basic banking. The visual underneath uses a row of simple human figures, most highlighted in blue, to show how common this is. Second: sixty eight percent say check deposit is their most frustrating banking task. A small bar chart compares check deposit, transfers, and balance checks. Third: only twenty nine percent actually attempt mobile check deposit regularly. The paired arc graphic emphasizes the drop from frustration to action. The story is not just that check deposit is hard. It is that uncertainty changes behavior.'
      },
      {
        kicker: 'Accessibility Gap',
        title: 'Why Screen Readers Are Not Enough',
        duration: '1:05',
        summary: 'Screen readers announce interface elements, but they do not replace product guidance.',
        narration: 'A later section says: screen readers are not enough. The answer on the page is: yes, but no. Screen readers are essential, but they mostly report what is on the screen. They cannot always explain the purpose of a flow, interpret visual camera feedback, or guide recovery after an error. For a task like mobile check deposit, the user needs more than labels. They need real-time direction, clear confirmation, and a sense of what to do next. This is the core accessibility gap FinSight is responding to.',
        narrationHigh: 'A later section says: screen readers are not enough. The layout places accessibility tool icons on one side and the answer on the other: yes, but no. The nuance matters. Screen readers are essential infrastructure. They can announce headings, controls, labels, and state changes when those are implemented correctly. But for complex financial tasks, announcing interface elements is not the same as guiding the user through the task. A screen reader might tell someone that an image or button exists. It may not tell them whether the check is centered, whether the lighting is acceptable, or what exact adjustment will fix the problem. FinSight focuses on that missing layer.'
      },
      {
        kicker: 'Research',
        title: 'What Users and Banking Teams Said',
        duration: '1:20',
        summary: 'Quotes from users and experts describe the emotional and operational cost of inaccessible flows.',
        narration: 'The quotes section is presented visually as two horizontal rows. One row represents blind and low-vision users. Another represents banking and accessibility experts. The user quotes describe having to ask a sighted person to check whether a document is inside the camera frame, receiving errors without knowing what changed, and losing privacy during simple financial tasks. The expert quotes make a related point from the product side: compliance can create a baseline, but complex banking flows need guidance built into the experience. Together, these voices show that accessibility is not only technical. It is emotional, private, and operational.',
        narrationHigh: 'The quotes section uses two moving rows of cards. The first row represents blind and low-vision users. Their comments describe the practical and emotional cost of inaccessible flows: needing a sighted person to confirm whether a check is in frame, seeing an error without knowing what changed, and wanting to bank privately without exposing a routine task to someone else. The second row represents banking and accessibility experts. Their comments point to the product challenge: compliance can establish a baseline, but it does not automatically create confidence. The section broadens the project from one feature problem to a larger service design problem.'
      },
      {
        kicker: 'Solution',
        title: 'Meet FinSight',
        duration: '1:10',
        summary: 'The prototype reframes banking as a voice-first guided experience.',
        narration: 'The site then introduces FinSight as a voice-first banking prototype. Visually, the page centers a phone with rings around it, suggesting audio, attention, and guidance. The app screens show a deposit flow designed around spoken prompts: choosing an account, checking deposit limits, positioning the check, confirming captured details, and receiving confirmation. The experience is not simply reading buttons aloud. It behaves more like a banking assistant that knows the task, watches for uncertainty, and helps the user complete each step with confidence.',
        narrationHigh: 'The site then introduces FinSight. Visually, this is one of the most product-focused sections: a phone sits in the center with animated rings around it, suggesting sound, attention, and guidance. Inside the phone, the screens move through a check deposit journey. The user starts at a welcome or home screen, chooses deposit check, selects an account, reviews a daily deposit limit, receives positioning guidance, captures the check, reviews details, and reaches confirmation. This is where the project shifts from critique to proposal. FinSight is not presented as a louder screen reader. It is presented as a voice-first banking flow that understands the user’s task.'
      },
      {
        kicker: 'Guidelines',
        title: 'Design Principles for Better Audio Guidance',
        duration: '1:30',
        summary: 'The guidelines translate research into practical accessibility patterns.',
        narration: 'The design guidelines section turns the project into a practical framework. It recommends action-first button labels, immediate announcements for state changes, audio confirmation for every transaction, and grouping related context together. It also calls out time-limit warnings, single-swipe navigation paths, spoken progress indicators, and paired haptic and audio feedback. In the visual site, these guidelines appear as large cards with a sticky navigation list. In voice-guided mode, the point is simpler: accessible banking requires design decisions across the entire flow, not just a final pass for labels.',
        narrationHigh: 'The design guidelines section turns the research into a practical framework. The visual site shows a sticky list of guideline names on the left and large content cards on the right. The guidelines recommend action-first button labels, so controls announce what they do before what they are. They call for immediate announcements when state changes, especially loading, errors, and success. They require audio confirmation for every transaction and grouping related context together so users do not have to build the mental model from scattered fragments. The later guidelines cover time-limit warnings, single-swipe navigation paths, spoken progress indicators, and paired haptic and audio feedback. The overall lesson is that accessibility has to be designed into the flow from the start.'
      },
      {
        kicker: 'Prototype',
        title: 'The Prototype as a Proof of Concept',
        duration: '0:55',
        summary: 'The prototype demonstrates how guidance could reduce uncertainty during high-stakes tasks.',
        narration: 'The prototype section invites visitors to explore how FinSight reimagines banking for blind users. Even without touching the app, the story is clear. A better banking flow should tell the user what is happening, describe what the system sees, make errors recoverable, and confirm important outcomes in plain language. For check deposit, that means the user should know whether the check is visible, whether the image is acceptable, what amount was detected, and when the deposit has been submitted.',
        narrationHigh: 'The prototype section is a placeholder for exploring the FinSight app experience. It acts as a proof of concept for the larger argument. In a high-stakes flow like check deposit, the user needs guidance before, during, and after capture. Before capture, the app should explain what will happen and what information is needed. During capture, it should describe what the camera sees and how to adjust the check. After capture, it should confirm the detected amount, account, availability timeline, and submission status. The prototype shows that audio guidance can be a product behavior, not just an accessibility add-on.'
      },
      {
        kicker: 'Closing',
        title: 'Accessibility as Independence',
        duration: '0:50',
        summary: 'The voice guide closes by returning to the project’s central promise: private, confident banking.',
        narration: 'FinSight is ultimately about independence. The project argues that blind and low-vision users should not have to trade privacy for access, or confidence for convenience. Voice-first guidance can make financial tasks feel more understandable, more recoverable, and more human. This guided version of the website is meant to echo that idea: accessibility is not only about what a system announces. It is about whether the person using it feels oriented, respected, and in control.',
        narrationHigh: 'FinSight is ultimately about independence. The project argues that blind and low-vision users should not have to trade privacy for access or confidence for convenience. That idea applies to the product, and it also applies to this voice-guided version of the website. The goal is not to imitate a screen reader. It is to model a more human form of guidance: explaining the visual context, naming the purpose of each section, and helping the visitor understand why the work matters. Accessibility is not only about what a system announces. It is about whether the person using it feels oriented, respected, and in control.'
      }
    ]
  },
};
