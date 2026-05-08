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
      bankName: 'Chase',
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
      cameraHint: 'Position front of check in frame',
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
        value: 78,
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
    statBoxes: [
      {
        number: '73%',
        text: 'of real accessibility barriers are invisible to standard compliance audits',
      },
      {
        number: '85%',
        text: "of BLV users can't tell if their check is positioned correctly in the camera frame",
      },
      {
        number: 'Only 29%',
        text: 'attempt mobile check deposit regularly - not by choice, but because repeated failures made it unreliable',
      },
    ],
    quote: '"It didn\'t give you any directions as to where to position the check in the frame. You just kind of... hope."',
    quoteAttr: '- BLV user interview participant',
  },

  meet: {
    heading: 'Meet FinSight.',
    subtitle: 'Voice-first banking, built for BLV users.',
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
      { initials: 'TM', name: 'Team Member 1', role: 'Role / Focus Area', linkedinText: 'LinkedIn ->', linkedinUrl: '#' },
      { initials: 'TM', name: 'Team Member 2', role: 'Role / Focus Area', linkedinText: 'LinkedIn ->', linkedinUrl: '#' },
      { initials: 'TM', name: 'Team Member 3', role: 'Role / Focus Area', linkedinText: 'LinkedIn ->', linkedinUrl: '#' },
      { initials: 'TM', name: 'Team Member 4', role: 'Role / Focus Area', linkedinText: 'LinkedIn ->', linkedinUrl: '#' },
      { initials: 'TM', name: 'Team Member 5', role: 'Role / Focus Area', linkedinText: 'LinkedIn ->', linkedinUrl: '#' },
    ],
    processHeading: 'Our Process',
    photoCount: 14,
    photoAltPrefix: 'Team photo',
  },
};
