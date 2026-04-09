export type ReferralRecord = {
  id: number;
  priorityTier: string;
  customerName: string;
  phone: string;
  installDate: string;
  area: string;
  lastContactDate: string;
  lastContactType: string;
  stage: string;
  outcome: string;
  referralName: string;
  referralPhone: string;
  introType: string;
  prospectStatus: string;
  appointmentDate: string;
  rewardStatus: string;
  nextFollowUpDate: string;
  nextStepOwner: string;
  notes: string;
};

export const referralStages = [
  'Not Contacted',
  'Contacted, Waiting',
  'Follow-Up Day 2',
  'Follow-Up Day 5',
  'Follow-Up Day 10',
  'Referral Received',
  'Prospect Contacted',
  'Appointment Booked',
  'Closed Won',
  'Closed Lost',
  'Dead',
] as const;

export const initialReferralRecords: ReferralRecord[] = [
  {
    id: 1,
    priorityTier: 'Tier 1',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
  {
    id: 2,
    priorityTier: 'Tier 1',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
  {
    id: 3,
    priorityTier: 'Tier 1',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
  {
    id: 4,
    priorityTier: 'Tier 2',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
  {
    id: 5,
    priorityTier: 'Tier 2',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
  {
    id: 6,
    priorityTier: 'Tier 3',
    customerName: '',
    phone: '',
    installDate: '',
    area: '',
    lastContactDate: '',
    lastContactType: '',
    stage: 'Not Contacted',
    outcome: '',
    referralName: '',
    referralPhone: '',
    introType: '',
    prospectStatus: '',
    appointmentDate: '',
    rewardStatus: '',
    nextFollowUpDate: '',
    nextStepOwner: '',
    notes: '',
  },
];

export const referralPlaybook = {
  purpose: 'Turn past installs into warm intros and booked appointments with a simple same-day follow-up system.',
  bestListOrder: [
    'Tier 1: installs from last 6 months',
    'Tier 2: happy customers, responsive customers, anyone who praised the process',
    'Tier 3: all remaining installs',
  ],
  contactCadence: ['Day 0: initial text or call', 'Day 2: quick bump', 'Day 5: soft reminder', 'Day 10: final touch'],
  scripts: {
    warmText: 'Hey [Name]! This is Chase, I installed your solar system [last year / X months ago]. Hope everything has been running great. Quick question, do you know anyone who owns their home and has been thinking about going solar? I am still with Sunrun and we have some strong incentives right now. If you refer someone and they go solar, I take care of you. Let me know if anyone comes to mind.',
    directText: 'Hey [Name], Chase here, your solar guy from [last year / Sunrun]. I am reaching back out because I am helping more homeowners in your area go solar. Do you have any neighbors, family, or friends who own their home and might want to see what they would save? If they go solar, I will make sure you are taken care of for the referral.',
    prospectIntro: 'Hey [Prospect Name], this is Chase. [Customer Name] thought you might be interested in seeing what solar could look like. I installed their system and they wanted me to reach out. Would you be open to a quick conversation to see what you might save? No pressure at all.',
  },
  dailyRhythm: [
    'Setup: filter Tier 1 + follow-ups due today',
    'Outbound: send 8 to 10 texts or make calls',
    'Response handling: reply same day and push for group intros',
    'Cleanup: update tracker, next follow-up date, and KPIs',
  ],
  baselineTargets: [
    '10 customer touches per day',
    '50 customer touches per week',
    '20%+ response rate',
    '10%+ referral rate from reached customers',
    '2 to 4 booked appointments per week',
  ],
};
