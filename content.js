window.FINSIGHT_CONTENT = {
  pageTitle: 'finSight - Accessible Banking',

  nav: {
    logoAlt: 'FinSight logo',
  },

  hero: {
    headlinePrefix: 'Banking built for your',
    cyclingWords: ['Independence', 'Confidence', 'Autonomy'],
    subtitle: 'Voice-first mobile banking, built for BLV users.',
  },

  challenge: {
    phone: {
      bankName: 'YourBank',
      time: '9:41',
      balanceLabel: 'Total Balance',
      balance: '$2,450.00',
      actions: ['Send', 'Deposit', 'Pay'],
      actionLabels: ['Send money', 'Deposit a check', 'Pay a bill'],
      recentLabel: 'Recent',
      transactions: [
        { name: 'Netflix', amount: '-$15.99' },
        { name: 'Starbucks', amount: '-$6.50' },
      ],
      depositTitle: '<- Deposit Check',
      screenReaderOutputHtml: 'Unlabeled button.<br>Unlabeled button.<br>Image.',
      cameraHint: 'Position front of check in frame',
      problemDepositAction: 'Deposit',
      problemDepositActionLabel: 'Deposit a check',
      imageTooDarkError: 'Image too dark - Try again',
      checkNotInFrameError: 'Check not in frame',
      checkCaptured: 'Check captured',
      mockupLabel: 'Animated mobile banking mockup showing a typical check deposit journey that becomes inaccessible without clear labels, spoken guidance, and recoverable error messages. The animation moves from a balance screen to vague screen reader output, unlabeled deposit fields, camera capture, visual-only errors, and a final captured check confirmation.',
      balanceScreenLabel: 'Banking app balance screen for YourBank showing a total balance of $2,450, quick actions for sending money, depositing a check, and paying a bill, plus recent transactions for Netflix and Starbucks.',
      unlabeledScreenLabel: 'Accessibility failure example: the simulated screen reader output announces “Unlabeled button, Unlabeled button, Image,” while a Deposit button appears visually without enough context for a blind or low-vision user.',
      formScreenLabel: 'Deposit check form example with several blank visual fields, demonstrating how a user may be asked to complete a financial task without meaningful field labels.',
      cameraScreenLabel: 'Check capture camera screen with corner guides and a moving scan line, asking the user to position the front of the check in frame.',
      darkErrorScreenLabel: 'Check capture error state showing a check outline and the message “Image too dark - Try again,” demonstrating visual feedback that needs a spoken recovery instruction.',
      frameErrorScreenLabel: 'Check capture error state showing the check outline shifted out of alignment and the message “Check not in frame,” demonstrating a positioning problem that should be explained through audio guidance.',
      successScreenLabel: 'Check capture success state showing the check inside the capture area with the confirmation message “Check captured.”',
      processingTitle: 'Processing',
      processingLabel: 'Analyzing check...',
      processingSub: 'This may take a moment',
      successTitle: 'Deposit Submitted',
      successAmount: '$150.00',
      successLabel: 'Check deposit received',
      successSub: 'Available in 1-2 business days',
      successRef: 'Ref #2847561',
    },
    heading: 'Mobile check deposit should work for everyone.',
    body: 'Most banking apps claim to be accessible. What they call accessibility, BLV users call a workaround.',
  },

  stats: {
    label: 'The Reality',
    items: [
      {
        value: 7,
        suffix: 'M+',
        label: 'Americans live with uncorrectable vision loss',
        source: 'Source: Flaxman A, et al. Prevalence of Vision Loss or Blindness in the US. JAMA Ophthalmology, 2021. Via Prevent Blindness. preventblindness.org',
        accessibleLabel: 'More than 7 million Americans live with uncorrectable vision loss.',
      },
      {
        value: 68,
        suffix: '%',
        label: 'of BLV users find mobile check deposits frustrating',
        source: 'Source: FinSight User Survey, UC Berkeley Capstone, Spring 2026. n=41.',
        style: 'isotype',
        arcCaption: '68% highlighted',
        accessibleLabel: '68 percent of blind and low-vision users find mobile check deposits frustrating.',
      },
      {
        value: 54,
        suffix: '%',
        label: 'of BLV users rely on workarounds for mobile banking',
        source: 'Source: FinSight User Survey, UC Berkeley Capstone, Spring 2026. n=41.',
        style: 'isotype',
        arcCaption: '54% highlighted',
        accessibleLabel: '54 percent of blind and low-vision users describe mobile banking as workable only because they learned workarounds.',
      },
    ],
  },

  screenReaders: {
    toolsLabel: 'Existing accessibility tools: VoiceOver, TalkBack, Be My Eyes',
    tools: ['VoiceOver', 'TalkBack', 'Be My Eyes'],
    headingHtml: "Are screen readers<br>enough?",
    answer: 'Yes, but no.',
    body: 'Screen readers help — but they can\'t guide you through pointing a camera, recovering from an error, or confirming a deposit went through. For visual tasks, independence requires more than reading the screen.',
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
            name: 'Anonymous V',
            label: 'BLV Expert User / Design Consultant',
            icon: 'user',
            quote: "There is no uniform standard and design across cash apps - they are each doing their own thing. Some require checks to be positioned directly on a grid, which makes it harder for BLV users.",
          },
          {
            name: 'Anonymous X',
            label: 'BLV user, Android, Bank of America',
            icon: 'user',
            quote: "There are a lot of headings and a lot of links once you are inside the app - get a credit card, take a loan, different offers. The screen reader reads them line by line, so it takes a while to reach recent activities.",
          },
          {
            name: 'Anonymous Y',
            label: 'BLV/low-vision user, Android, desktop preferred',
            icon: 'user',
            quote: 'There are moments where the screen reader would freeze if there was too much information - too many tables and grids.',
          },
          {
            name: 'Anonymous Z',
            label: 'BLV user, Android, Bank of America',
            icon: 'user',
            quote: "When the screen reader freezes or the app is confusing, I take a screenshot and ask an AI to describe what is on the screen. It tells me what is there but does not fix the problem.",
          },
          {
            name: 'Anonymous W',
            label: 'BLV user, Android, Bank of America',
            icon: 'user',
            quote: "The menu at the top is inconvenient - the screen reader reads it first before I can get to anything useful. I would prefer most recent activity to be at the top.",
          },
          {
            name: 'Anonymous U',
            label: 'BLV Expert User / Design Consultant',
            icon: 'user',
            quote: 'Once you acquire a BLV customer, it is very hard for them to move on to another app - the cost of relearning everything is very, very high. Stickiness is extremely strong in this community.',
          }
        ],
      },
      {
        label: 'Industry experts',
        icon: 'building',
        items: [
          {
            name: 'Industry Expert B',
            label: 'VP of Digital Services, Credit Union',
            icon: 'building',
            quote: 'Accessibility does not equal operability.',
          },
          {
            name: 'Industry Expert A',
            label: 'Digital Banking PM',
            icon: 'building',
            quote: 'The rest of the services you showed me - balance checks, transfers - already have solutions in existing banking systems. Your unique contribution is making check capture work independently for BLV users.',
          },
          {
            name: 'Industry Expert E',
            label: 'Assistive Technology Consultant',
            icon: 'building',
            quote: 'A key advantage of AI is reducing the learning curve for BLV users - especially the need to memorize shortcuts and gestures. Desktop is harder to master than mobile, and BLV users increasingly prefer mobile navigation.',
          },
          {
            name: 'Industry Expert C',
            label: 'Digital Banking PM',
            icon: 'building',
            quote: "Passing ADA compliance is not the biggest problem for you. What you are doing - making the scanning process seamless - and the security considerations behind that are what financial institutions will not be as familiar with. That is where you should focus your attention.",
          },
        ],
      },
    ],
    organizationsLabel: 'Organizations represented in research conversations',
    organizationsNote: 'Logos show companies represented in conversations, not attribution for any individual quote.',
    organizations: [
      { name: 'HSBC', logo: 'assets/industryexpertslogo/hsbc.png' },
      { name: 'Be My Eyes', logo: 'assets/industryexpertslogo/bemyeyes.png' },
      { name: 'Lighthouse', logo: 'assets/industryexpertslogo/lighthouse.png' },
      { name: 'Redwood Credit Union', logo: 'assets/industryexpertslogo/redwoodcreditunion.png' },
    ],
  },

  meet: {
    heading: 'Meet FinSight.',
    subtitle: 'Voice-first banking, built for BLV users.',
    app: {
      mockupLabel: 'Animated FinSight app preview showing a voice-first check deposit flow. The phone screens move through welcome and home screens, deposit check setup, account selection, deposit limit review, check positioning guidance, captured check details, deposit confirmation, received check confirmation, and settings.',
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
    text: 'FinSight was shaped by recurring barriers identified through research, interviews, and usability testing, which informed our design guidelines.',
  },

  guidelines: {
    headingHtml: 'Design Guidelines',
    navLabel: 'Guidelines navigation',
    items: [
      {
        title: 'Voice guidance rather than dependence on screen readers',
        body: 'When banking apps update or leave elements unlabeled, screen readers break, and BLV users are left without a way forward. Designing around voice from the start means the experience never depends on an interface interpreting itself correctly.',
        image: 'assets/insights/insight-1.svg',
      },
      {
        title: 'Easily accessible menu with one voice command',
        body: 'In major banking apps, reaching a task like check deposit requires navigating through layers of menus, up to 10 steps with a screen reader. Surfacing every task through a single voice command removes that overhead entirely.',
        image: 'assets/insights/insight-2.svg',
      },
      {
        title: 'Clear communication and notice of privacy',
        body: 'Banking apps disclose data practices once, buried in onboarding agreements. Surfacing a plain-language notice at the exact moment data is being processed means users always know what is used and what is never stored, before it happens.',
        image: 'assets/insights/insight-3.svg',
      },
      {
        title: 'Broken down step-by-step interactions',
        body: 'Banking apps present all requirements on a single screen. Sighted users skim it. BLV users must listen to all of it. Delivering one action at a time means users always know where they are and what comes next, without having to hold everything in memory at once.',
        video: 'assets/insights/insight-4.mp4',
      },
      {
        title: 'Real-time guidance for capturing a check',
        body: 'Positioning a camera accurately without visual feedback is a guessing game. Providing continuous audio guidance during capture means users know exactly what to adjust and when the check is ready, without needing to ask for help.',
        image: 'assets/insights/insight-5.svg',
      },
      {
        title: 'Clear confirmation before submitting',
        body: 'Banking apps execute transactions the moment a button is tapped. For BLV users, that leaves no room to catch a mistake. Reading the amount aloud and pausing for an explicit confirm or cancel puts the decision back in the user\'s hands.',
        image: 'assets/insights/insight-6.svg',
      },
      {
        title: 'Read-aloud post-transaction confirmation',
        body: 'After a transaction, most apps show a confirmation screen that BLV users have to navigate field by field. Reading every detail aloud, digit by digit, means users can verify the outcome without touching the screen.',
        image: 'assets/insights/insight-7.svg',
      },
      {
        title: 'Adjustable verbosity and speed',
        body: 'No two users want to hear information the same way. Letting users set their preferred guidance style and voice speed from within the app means the experience fits them from the start, rather than requiring workarounds.',
        image: 'assets/insights/insight-8.svg',
      },
    ],
  },

  prototype: {
    heading: 'The Prototype',
    subtitle: 'Explore how FinSight reimagines the check deposit experience for BLV users.',
    placeholder: '[ Prototype embed or video goes here ]',
  },

  acknowledgments: {
    heading: 'Acknowledgments',
    intro: 'This project would not have been possible without the guidance and generosity of many people.',
    blocks: [
      {
        name: 'Lucy Greco',
        text: 'Lucy Greco was the original inspiration for FinSight. Early conversations with Lucy about her experience navigating mobile banking as a blind user crystallized the problem this project set out to solve and shaped the research questions that followed.',
      },
      {
        name: 'Marti Hearst',
        text: 'Marti Hearst served as our primary faculty advisor throughout the project. Her guidance on research design, framing, and the standards of rigorous academic work grounded the team at every stage.',
      },
      {
        name: 'John Chuang',
        text: 'John Chuang provided early direction on the project’s research orientation and helped the team establish a foundation for the work that followed.',
      },
      {
        name: 'Jennifer Sturdy',
        text: 'Jennifer Sturdy, Research Director of the Institute for Business and Social Impact at the Haas School of Business, supported the team through the IRB process and helped secure funding through the Haas X-Lab. Her institutional support made the scope of this research possible.',
      },
      {
        name: 'Steve Fadden',
        text: 'Steve Fadden contributed meaningfully to the early research process, helping the team sharpen its approach before fieldwork began.',
      },
    ],
    finalParagraph: 'Finally, we are grateful to every BLV adult who participated in an interview, completed the survey, or sat with us through a usability session. This project exists because people were willing to share their time, their frustrations, and their expertise.',
  },

  team: {
    heading: 'Meet the Team',
    members: [
      { image: 'assets/teammembers/j.jpeg', imageAlt: 'Portrait of Jessie Deng', name: 'Jessie Deng', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/jwdeng/' },
      { image: 'assets/teammembers/m.jpeg', imageAlt: 'Portrait of Michelle Lin', name: 'Michelle Lin', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/michellelin4111/' },
      { image: 'assets/teammembers/sa.jpeg', imageAlt: 'Portrait of Sarah Algashgari', name: 'Sarah Algashgari', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/sarah-algashgari-699961195/' },
      { image: 'assets/teammembers/d.jpeg', imageAlt: 'Portrait of Devi Sivakumar', name: 'Devi Sivakumar', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/devi-sivakumar/' },
      { image: 'assets/teammembers/se.jpeg', imageAlt: 'Portrait of Sejin Kim', name: 'Sejin Kim', linkedinText: 'LinkedIn', linkedinUrl: 'https://www.linkedin.com/in/jin-sejin-kim/' },
    ],
    processHeading: 'Our Process',
    photoCount: 16,
    photosMarqueeLabel: 'Decorative carousel of team process photos moving in a continuous loop. The images show the FinSight team working together, documenting research, and presenting project materials.',
  },

  voiceGuide: {
    pageTitle: 'FinSight Voice Guide',
    eyebrow: 'Voice Guide Mode',
    title: 'FinSight Voice Guide',
    intro: 'Press play to hear the site narrated with context, visual description, and section-by-section guidance.',
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
      stop: 'Stop',
      exit: 'Exit Voice Guide Mode',
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
        duration: '0:50',
        summary: 'FinSight opens as a voice-first banking prototype centered on independence, confidence, and autonomy for BLV users.',
        narration: 'Welcome to FinSight. The homepage introduces a voice-first mobile banking prototype built for blind and low-vision users. Its opening message centers on independence, confidence, and autonomy, framing accessibility as a product experience rather than a feature checklist. The section sets up the project as an effort to make financial tasks feel more private, guided, and self-directed.',
        narrationHigh: 'Welcome to FinSight. The page opens with a clean, spacious hero section featuring the FinSight logo and a large headline that rotates through the words independence, confidence, and autonomy. Beneath it, the subtitle reads: voice-first mobile banking, built for BLV users. The visual design is quiet and uncluttered, giving the opening statement room to lead. In voice guide mode, the key idea is that FinSight is a banking prototype designed to support blind and low-vision users with more guidance, more privacy, and less dependence on sighted help.'
      },
      {
        kicker: 'Problem',
        title: 'Mobile Check Deposit Should Work for Everyone',
        duration: '1:05',
        summary: 'This section shows a simulated mobile deposit flow and why visual-only feedback makes check deposit difficult for BLV users.',
        narration: 'The challenge section introduces the core problem FinSight is addressing. It presents a simulated mobile check deposit flow and explains that the app is intended to guide users step by step entirely by voice. The contrast is important: check deposit is often treated as a routine task, but many existing flows rely on visual confirmation, camera framing, and error states that are hard to interpret without sight. The section argues that independent deposit requires more than access to buttons. It requires guidance throughout the task.',
        narrationHigh: 'This section is anchored by the heading: mobile check deposit should work for everyone. On the page, a phone mockup shows a simulated deposit journey while the surrounding text explains the challenge. The message is direct: FinSight is a voice-first mobile banking app for blind and low-vision users, designed to guide check deposit step by step with no visual feedback required and no one else needed. For listeners, the main point is that check deposit becomes difficult when the most important cues, like framing, lighting, capture status, and error recovery, are communicated visually instead of through guidance.'
      },
      {
        kicker: 'Reality',
        title: 'The Reality',
        duration: '1:10',
        summary: 'The reality section pairs a large population stat with two survey findings about frustration and workarounds in mobile banking.',
        narration: 'The reality section presents three statistics that ground the project in both public data and FinSight research. One highlights that more than seven million Americans live with uncorrectable vision loss. Two more findings from the FinSight user survey show that sixty eight percent of BLV users find mobile check deposits frustrating, and fifty four percent rely on workarounds for mobile banking. Together, the section shows that the problem is both widespread and routine. It is not an edge case limited to a few users or a rare task.',
        narrationHigh: 'The reality section uses a strong visual hierarchy to make the numbers memorable. The first statistic appears as a very large figure: seven million plus Americans live with uncorrectable vision loss. Below that, the next two findings are shown with isotype-style person icons rather than plain text alone. One states that sixty eight percent of BLV users find mobile check deposits frustrating. The other states that fifty four percent rely on workarounds for mobile banking. The layout makes the scale of the issue easy to scan, while the voice guide emphasizes what those numbers mean: frustration and workaround behavior are common, not exceptional.'
      },
      {
        kicker: 'Accessibility Gap',
        title: 'Screen Readers Are Not Enough',
        duration: '1:00',
        summary: 'This section explains that screen readers help, but image-based tasks still need guidance, recovery, and confirmation.',
        narration: 'The screen readers section makes a careful distinction. Screen readers are valuable and necessary, but they do not solve every part of a visual banking task. For image-based flows like check deposit, users still need help with camera positioning, understanding what went wrong, and knowing when a task is truly complete. The section frames FinSight as a response to that missing layer of support. It is about guidance through the task, not only access to the interface.',
        narrationHigh: 'This section is titled: screen readers are not enough, with the supporting statement: screen readers help, but. The body text explains that they cannot guide someone through pointing a camera, recovering from an error, or confirming that a deposit went through. Visually, the section balances supportive copy with a clean layout rather than treating screen readers as the problem. The voice guide carries that same nuance forward: screen readers remain essential, but for image-based tasks, users also need guidance, recovery, and confirmation.'
      },
      {
        kicker: 'Research',
        title: 'What Users and Banking Teams Said',
        duration: '1:15',
        summary: 'Two quote rows share recurring evidence from BLV users and industry experts about inaccessible banking flows and the need for independent check capture.',
        narration: 'The quotes section is organized into two groups: BLV users and industry experts. Together, the quotes describe recurring friction in mobile banking, including inaccessible flows, screen reader limitations, confusing errors, and the need for workarounds. They also point to a consistent product opportunity: check capture should be possible independently, without giving up privacy or confidence. The section helps explain why FinSight focuses so closely on one high-stakes task.',
        narrationHigh: 'This section is labeled: what we heard from users and banking teams. On the page, the evidence appears in two horizontal rows of quote cards, one for BLV users and one for industry experts. The BLV user quotes describe screen reader friction, inaccessible flows, needing help from another person, and the loss of privacy that comes with routine banking tasks. The expert quotes reinforce that independent check capture remains a meaningful challenge for product teams. The voice guide summarizes these patterns as recurring evidence, not isolated anecdotes.'
      },
      {
        kicker: 'Solution',
        title: 'Meet FinSight',
        duration: '1:10',
        summary: 'Meet FinSight presents the prototype as a voice-first guided deposit flow for BLV users.',
        narration: 'The Meet FinSight section introduces the proposed experience. It reframes check deposit as a voice-first flow with spoken prompts, clear task sequencing, positioning support, confirmation, and settings for how guidance is delivered. Instead of expecting users to interpret a visually driven capture process, the prototype is designed to narrate what matters when it matters. The result is a deposit flow intended to feel more understandable and more independent.',
        narrationHigh: 'This section features the heading Meet FinSight and the subtitle voice-first banking, built for BLV users. Visually, a phone sits at the center of the page with rings around it, while the app screens move through a deposit journey. The prototype shows spoken prompts, account selection, limit review, check positioning support, captured details, confirmation, and settings. In voice guide mode, the section is meant to convey that FinSight treats check deposit as a guided interaction with sequencing, context, and confirmation built into the flow.'
      },
      {
        kicker: 'Transition',
        title: 'From Research to Guidelines',
        duration: '0:45',
        summary: 'This bridge explains that the design guidelines are drawn directly from recurring patterns in research, interviews, and usability testing.',
        narration: 'Before the guideline cards begin, the site includes a short transition sentence. It explains that FinSight was shaped by recurring barriers identified through research, interviews, and usability testing. This bridge connects the evidence gathered earlier on the site to the design decisions that follow. It positions the guidelines as practical responses to observed problems.',
        narrationHigh: 'Between the product introduction and the guideline cards, the site places a centered bridge sentence beneath the Design Guidelines heading. The sentence explains that FinSight was shaped by recurring barriers identified through research, interviews, and usability testing, which informed the design guidelines. The layout is simple and centered, giving the transition room to connect research evidence with design action. In voice guide mode, this moment signals that the next section translates findings into principles.'
      },
      {
        kicker: 'Guidelines',
        title: 'Design Guidelines',
        duration: '1:55',
        summary: 'The guideline section turns research into eight practical principles for a voice-first check deposit experience.',
        narration: 'The Design Guidelines section outlines eight principles behind the FinSight prototype. They are: voice guidance rather than dependence on screen readers, easily accessible menu with one voice command, clear communication and notice of privacy, broken down step-by-step interactions, real-time guidance for capturing a check, clear confirmation before submitting, read-aloud post-transaction confirmation, and adjustable verbosity and speed. In plain language, the guidelines argue that users need direct voice support, simple access to tasks, privacy clarity, manageable steps, capture assistance, confirmation before submission, confirmation after submission, and control over how much information they hear. Together, these principles show how research findings become concrete interaction decisions.',
        narrationHigh: 'The Design Guidelines section is presented as a structured set of cards with navigation alongside them. The eight guideline titles are read in order: voice guidance rather than dependence on screen readers; easily accessible menu with one voice command; clear communication and notice of privacy; broken down step-by-step interactions; real-time guidance for capturing a check; clear confirmation before submitting; read-aloud post-transaction confirmation; and adjustable verbosity and speed. Each one translates a specific barrier into a practical design response. The plain-language meaning is consistent across the set: help users reach tasks quickly, explain privacy clearly, reduce cognitive load, guide camera capture in real time, confirm important actions before and after submission, and let users control how much spoken guidance they receive.'
      },
      {
        kicker: 'Prototype',
        title: 'The Prototype',
        duration: '0:50',
        summary: 'This section is where visitors can explore or watch the FinSight prototype for the check deposit experience.',
        narration: 'The prototype section invites visitors to explore how FinSight reimagines check deposit for BLV users. It serves as the main place to watch or review the proposed experience in action. In the context of the site, this section acts as a demonstration of the ideas introduced earlier: guidance, sequencing, capture support, and confirmation. It connects the design principles to a concrete product flow.',
        narrationHigh: 'This section is titled The Prototype, with the subtitle: explore how FinSight reimagines the check deposit experience for BLV users. The layout centers an embedded demo area where visitors can watch or interact with the prototype experience. For listeners, the key meaning is that this is the proof point of the site: the place where the FinSight deposit flow can be explored as a working concept. It shows how the project’s ideas about voice-first guidance translate into an actual product demonstration.'
      },
      {
        kicker: 'Acknowledgments',
        title: 'Acknowledgments',
        duration: '0:55',
        summary: 'The acknowledgments section credits advisors, institutional support, and the BLV participants who shaped the project.',
        narration: 'The acknowledgments section recognizes the people and support behind FinSight. It names Lucy Greco, Marti Hearst, John Chuang, Jennifer Sturdy, and Steve Fadden, alongside the BLV adults who participated in interviews, surveys, and usability sessions. The section makes clear that the project was shaped by advising, early research guidance, institutional support, and lived experience shared by participants. It situates FinSight as collaborative work rather than a solo concept.',
        narrationHigh: 'This section is titled Acknowledgments and serves as a formal credit section for the project. It recognizes Lucy Greco, Marti Hearst, John Chuang, Jennifer Sturdy, and Steve Fadden, and it also acknowledges the BLV adults who contributed through interviews, surveys, and usability sessions. Visually, the section is structured as a clean set of acknowledgment blocks followed by a closing note. In voice guide mode, the purpose is to make clear that FinSight was shaped by advisors, institutional support, research guidance, and the time and expertise shared by BLV participants.'
      },
      {
        kicker: 'Team',
        title: 'Meet the Team',
        duration: '0:45',
        summary: 'The final section introduces the FinSight team and shows process photos from the project.',
        narration: 'The site closes by introducing the FinSight team. This section identifies the people behind the project and pairs that introduction with process photos from the team’s work. It reinforces that FinSight is the result of research, design, testing, and collaboration over time. The closing tone is personal but still connected to the project’s larger purpose.',
        narrationHigh: 'The final section is titled Meet the Team. On the page, it combines team member profiles with a horizontal collection of process photos that show the group working together, documenting research, and presenting project materials. The layout shifts from product explanation to the people and process behind the work. In voice guide mode, this section closes the site by introducing the FinSight team and acknowledging the collaborative work that shaped the project.'
      }
    ]
  },
};
