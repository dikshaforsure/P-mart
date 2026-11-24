export const siteSettings = {
  brand: 'TeddyPups',
  region: 'U.A.E.',
  phoneDisplay: '+971 50 000 0000',
  phoneTel: '+971500000000',
  city: 'Downtown Dubai, United Arab Emirates',
  whatsappNumber: '971500000000',
};

export const availablePuppies = [
  { id: 'max', slug: 'maltipoo-max-male', name: 'Max', breed: 'Maltipoo', sex: 'boy', age: '3 months', hasVideo: true, status: 'Available' },
  { id: 'korean-teacup-maltipoo', slug: 'korean-teacup-maltipoo-female', name: 'Korean Teacup Maltipoo', breed: 'Korean Teacup Maltipoo', sex: 'girl', age: '2 months', hasVideo: true, status: 'Available' },
  { id: 'korean-teacup-poodle', slug: 'korean-teacup-poodle-female', name: 'Korean Teacup Poodle', breed: 'Korean Teacup Poodle', sex: 'girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'maltipoo-cavapoo', slug: 'maltipoo-cavapoo-male', name: 'Maltipoo & Cavapoo', breed: 'Maltipoo & Cavapoo', sex: 'boy', age: '3 months Maltipoo & 2 months Cavapoo', hasVideo: true, status: 'Available' },
  { id: 'toy-poodle', slug: 'toy-poodle-male-female', name: 'Toy Poodle', breed: 'Toy Poodle', sex: 'boy & girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'maltipoo-girl-3m', slug: 'maltipoo-female-2', name: 'Maltipoo', breed: 'Maltipoo', sex: 'girl', age: '3 months', hasVideo: true, status: 'Available' },
  { id: 'pomeranian-girl', slug: 'pomeranian-female-3-months', name: 'Pomeranian', breed: 'Pomeranian', sex: 'girl', age: '3 months', hasVideo: false, status: 'Available' },
  { id: 'copper', slug: 'cavapoo-copper-male', name: 'Copper', breed: 'Cavapoo', sex: 'boy', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'shih-tzu-girl', slug: 'shih-tzu-female', name: 'Shih Tzu', breed: 'Shih Tzu', sex: 'girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'shih-tzu-boy', slug: 'shih-tzu-male', name: 'Shih Tzu', breed: 'Shih Tzu', sex: 'boy', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'maltipoo-girl-25', slug: 'maltipoo-female-2-5-months', name: 'Maltipoo', breed: 'Maltipoo', sex: 'girl', age: '2.5 months', hasVideo: false, status: 'Available' },
  { id: 'maltipoo-girl-2', slug: 'maltipoo-female-2-months', name: 'Maltipoo', breed: 'Maltipoo', sex: 'girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'korean-pomeranian-1', slug: 'korean-teacup-pomeranian-female-1', name: 'Korean Teacup Pomeranian', breed: 'Korean Teacup Pomeranian', sex: 'girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'korean-pomeranian-2', slug: 'korean-teacup-pomeranian-female-2', name: 'Korean Teacup Pomeranian', breed: 'Korean Teacup Pomeranian', sex: 'girl', age: '2 months', hasVideo: false, status: 'Available' },
  { id: 'korean-pomeranian-boy', slug: 'korean-teacup-pomeranian-male', name: 'Korean Teacup Pomeranian', breed: 'Korean Teacup Pomeranian', sex: 'boy', age: '2 months', hasVideo: false, status: 'Available' },
];

export const waysToMeet = [
  {
    id: 'dubai',
    eyebrow: 'In our showroom',
    title: 'Puppies in Dubai',
    description: 'See them, love them, take them home. Come meet our locally available puppies before you decide.',
    action: 'Meet local puppies',
    href: '/puppies',
    image: null,
  },
  {
    id: 'imported',
    eyebrow: '',
    title: 'Imported for you',
    description: "Exclusive Korean teacup puppies, delivered. Order from the world's most reputable breeders and let us handle the import.",
    action: 'See imported puppies',
    href: '/puppies',
    image: null,
  },
];

export const journeySteps = [
  { number: '01', title: 'Choose your breed', description: "Select your preferred breed or tell us what you're looking for. We'll guide you based on availability and your lifestyle." },
  { number: '02', title: 'Get photos & details', description: 'Our team will share real photos, health details, and all necessary information directly on WhatsApp.' },
  { number: '03', title: 'Secure & safe delivery', description: 'Once confirmed, we handle everything professionally and ensure your puppy reaches you safely and stress-free.' },
];

export const trustFeatures = [
  { number: '01', title: 'Vet-checked & healthy', description: 'Every puppy comes vaccinated, dewormed, and with a verified health certificate.', mark: '✳' },
  { number: '02', title: 'Korea to Dubai, safely', description: 'Trusted breeders, safe travel, and premium care from start to finish.', mark: '↗' },
  { number: '03', title: 'Support 24/7', description: 'Always here to help, from choosing your puppy to post-delivery support.', mark: '♡' },
  { number: '04', title: 'Trusted by families worldwide', description: 'Puppies delivered to loving homes all around the world.', mark: '⌂' },
];

export const familyPreview = {
  heading: 'Happy families & puppies',
  description: 'We are truly honored to see our puppies become cherished members of loving families. These heartwarming moments have been shared by our valued clients who welcomed a Teddy Pup into their homes and hearts.',
  quote: 'TeddyPups truly made our dream a reality. They supported us at every step of the import journey. Our Maltipoo arrived healthy, cheerful, and absolutely perfect. Having 24/7 support throughout the process gave us complete peace of mind.',
  author: 'Sarah M., Dubai, UAE',
  moments: [
    { id: 'lulu', caption: 'Lulu 🧸 with her new mummy ❤️', image: null },
    { id: 'maltipoo-baby', caption: 'Adorable Maltipoo baby 🧸❤️', image: null },
    { id: 'new-teddy-puppy', caption: 'My new teddy puppy 🥰🧸', image: null },
    { id: 'new-puppies', caption: 'Our new puppies 🧸🥰🤗', image: null },
    { id: 'new-puppy', caption: 'New puppy 🧸😍', image: null },
    { id: 'gang-of-3', caption: 'Gang of 3 😍🧸', image: null },
    { id: 'so-happy', caption: 'So happy 😍😍', image: null },
    { id: 'new-pup', caption: 'New pup 🤗💫', image: null },
  ],
};

export const faqPreview = [
  { question: 'Are your puppies vaccinated and health-checked?', answer: 'Yes. All our puppies come with a verified health certificate from licensed vets. Every puppy is vaccinated, dewormed, and thoroughly checked before joining your family.' },
  { question: 'Can I meet a puppy before I decide?', answer: 'Yes. Come meet our locally available puppies in our Downtown Dubai showroom and spend time bonding before making your decision.' },
  { question: 'Can I take my puppy home the same day?', answer: 'Local puppies are available immediately, so you can take your puppy home the same day.' },
];
