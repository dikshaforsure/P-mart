export const journeyOptions = {
  local: {
    id: 'local',
    label: 'In Dubai',
    hint: 'meet in person',
    title: 'Meet your puppy in person',
    description: 'Visit our Downtown Dubai showroom and spend time with the puppies available locally. Browse their profiles first, then arrange a visit before you decide.',
    postcardLabel: 'Downtown Dubai',
    steps: [
      { number: '1', title: 'Explore our puppies', description: 'Browse the available puppies. Each profile includes photos, breed details, age and the information currently available for that puppy.' },
      { number: '2', title: 'Choose a puppy', description: 'Open a profile to learn more or ask the TeddyPups team any questions before arranging a visit.' },
      { number: '3', title: 'Meet before you decide', description: 'Spend time bonding with a locally available puppy at the Downtown Dubai showroom before making your decision.' },
      { number: '4', title: 'Pick-up or delivery', description: 'Local puppies are available for collection. Delivery within Dubai can also be discussed with the team.' },
    ],
  },
  imported: {
    id: 'imported',
    label: 'Imported',
    hint: 'order upon request',
    title: 'Order upon request',
    description: 'For a breed you do not currently see in the local listings, ask about the Order Upon Request service and the options available from overseas breeders.',
    postcardLabel: 'Europe · Korea',
    steps: [
      { number: '1', title: 'Tell us what you are looking for', description: 'Share your preferred breed or the kind of puppy you have in mind. The team can explain the Order Upon Request options.' },
      { number: '2', title: 'Personal consultation', description: 'Discuss your preferences with the team and review the details available for the puppy being considered.' },
      { number: '3', title: 'Photos, details and travel', description: 'The FAQ explains that photos, videos and health details are shared before travel, while the team coordinates checks, travel arrangements and documentation.' },
      { number: '4', title: 'Welcome home', description: 'The TeddyPups team can help with the transition and answer questions about settling in, nutrition and general care.' },
    ],
  },
};

export const puppyPromiseItems = [
  {
    title: 'Details before you decide',
    description: 'Photos, videos and health details are shared before an imported puppy travels.',
    mark: '01',
  },
  {
    title: 'A considered process',
    description: 'The team explains the available options and helps you understand the next steps.',
    mark: '02',
  },
  {
    title: 'Support after arrival',
    description: 'The team offers guidance on settling in, nutrition and general care.',
    mark: '03',
  },
];

export const deliveryOptions = [
  {
    title: 'Meet in Downtown Dubai',
    description: 'Arrange a visit to meet locally available puppies in the showroom.',
    mark: '01',
  },
  {
    title: 'Same-day collection',
    description: 'The existing FAQ states that locally available puppies can go home the same day.',
    mark: '02',
  },
  {
    title: 'Delivery within Dubai',
    description: 'Ask the team about arranging delivery to your home within Dubai.',
    mark: '03',
  },
  {
    title: 'International delivery',
    description: 'The reference describes international cargo partners for delivery to homes around the world. Confirm arrangements for your destination with the team.',
    mark: '04',
  },
];

export const whyChooseItems = [
  {
    title: 'Health information',
    description: 'The FAQ describes verified veterinary health certificates and health details shared with families.',
    mark: '✳',
  },
  {
    title: 'Help along the way',
    description: 'The FAQ states that the team is available 24/7 to answer questions and offer guidance.',
    mark: '♡',
  },
  {
    title: 'A clear journey',
    description: 'Whether you meet locally or ask about an imported puppy, the team can explain the steps and details.',
    mark: '↗',
  },
];
