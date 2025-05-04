
export interface BusinessOwner {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
  contact?: {
    email?: string;
    phone?: string;
  }
}

export interface Review {
  id: number;
  userName: string;
  userImage: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  imageUrl?: string;
}

export interface GalleryImage {
  id: number;
  imageUrl: string;
  caption: string;
}

export interface BusinessHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface BusinessContact {
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  phone: string;
  website?: string;
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  }
}

export interface Business {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory?: string;
  description: string;
  longDescription: string;
  tagline?: string;
  establishedYear: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  location: string;
  imageUrl: string;
  coverImage: string;
  logo: string;
  contact: BusinessContact;
  hours: BusinessHours;
  owner: BusinessOwner;
  services: Service[];
  gallery: GalleryImage[];
  reviews: Review[];
  attributes?: {
    [key: string]: string | boolean | number;
  }
}

export const businessData: Business[] = [
  {
    id: 1,
    name: 'TechSphere Solutions',
    slug: 'techsphere-solutions',
    category: 'Web Development & IT',
    subcategory: 'Software Development',
    description: 'Professional web development, app development, and IT consulting services for businesses of all sizes.',
    longDescription: 'TechSphere Solutions is a leading IT service provider in Raipur, offering comprehensive web and mobile application development, cloud solutions, and IT consulting. With a team of experienced developers and consultants, we help businesses leverage technology to grow and succeed in the digital landscape. Our custom solutions are tailored to meet the specific needs of each client, ensuring maximum efficiency and ROI.',
    tagline: 'Innovative IT Solutions for Modern Businesses',
    establishedYear: 2015,
    rating: 4.8,
    reviewCount: 47,
    verified: true,
    featured: true,
    location: 'Civil Lines, Raipur',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
    coverImage: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
    logo: 'https://images.unsplash.com/photo-1617994452722-4045401c3cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHx0ZWNoJTIwbG9nb3xlbnwwfDB8fHwxNjkwMzc1NjgzfDA&ixlib=rb-4.0.3&q=80&w=1080',
    contact: {
      address: '123 Tech Park',
      city: 'Raipur',
      state: 'Chhattisgarh',
      zip: '492001',
      email: 'info@techsphere.com',
      phone: '+91 771 4224404',
      website: 'https://www.techsphere.com',
      social: {
        facebook: 'https://facebook.com/techsphere',
        instagram: 'https://instagram.com/techsphere',
        linkedin: 'https://linkedin.com/company/techsphere',
        twitter: 'https://twitter.com/techsphere'
      }
    },
    hours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: '10:00 - 15:00',
      sunday: 'Closed'
    },
    owner: {
      id: 1,
      name: 'Rajesh Kumar',
      position: 'CEO & Founder',
      bio: 'Rajesh founded TechSphere in 2015 with a vision to provide world-class IT services to businesses in Raipur. With over 15 years of experience in the tech industry, he has led the company to become a trusted name in web development and IT consulting.',
      imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
      contact: {
        email: 'rajesh@techsphere.com'
      }
    },
    services: [
      {
        id: 1,
        name: 'Web Development',
        description: 'Custom websites and web applications built using modern technologies and frameworks.',
        imageUrl: 'https://images.unsplash.com/photo-1546146830-2cca9512c68e'
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Native and cross-platform mobile applications for iOS and Android devices.',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c'
      },
      {
        id: 3,
        name: 'Cloud Solutions',
        description: 'Cloud migration, optimization, and management services for businesses of all sizes.',
        imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8'
      },
      {
        id: 4,
        name: 'IT Consulting',
        description: 'Strategic IT consulting to help businesses make informed technology decisions.',
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40'
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        caption: 'Our development team working on a client project'
      },
      {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692',
        caption: 'Collaborative coding session'
      },
      {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
        caption: 'Client consultation meeting'
      },
      {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d',
        caption: 'Team brainstorming for a new project'
      },
      {
        id: 5,
        imageUrl: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
        caption: 'Our modern office space'
      },
      {
        id: 6,
        imageUrl: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6',
        caption: 'Technical planning session'
      }
    ],
    reviews: [
      {
        id: 1,
        userName: 'Amit Sharma',
        userImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
        rating: 5,
        date: '2023-04-15',
        comment: 'TechSphere developed our company website and we are extremely satisfied with the results. The team was professional, responsive, and delivered everything on time. Highly recommended!'
      },
      {
        id: 2,
        userName: 'Priya Patel',
        userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        rating: 4,
        date: '2023-03-22',
        comment: 'We hired TechSphere for our e-commerce platform development. The website looks great and functions well. There were some minor delays but overall a good experience.'
      },
      {
        id: 3,
        userName: 'Sanjay Gupta',
        userImage: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857',
        rating: 5,
        date: '2023-02-10',
        comment: 'Outstanding service from the TechSphere team! They completely revamped our outdated website and implemented new features that have significantly improved user engagement. Their support after launch has been exceptional as well.'
      }
    ],
    attributes: {
      employeeCount: 25,
      projectsCompleted: 120,
      yearsInBusiness: 8,
      certification: 'ISO 9001:2015'
    }
  },
  {
    id: 2,
    name: 'FinEdge Accounting',
    slug: 'finedge-accounting',
    category: 'Accounting Services',
    subcategory: 'Financial Consulting',
    description: 'Comprehensive accounting, taxation, and financial consultation services for businesses and individuals.',
    longDescription: 'FinEdge Accounting is a premier accounting firm in Raipur that provides comprehensive financial services to businesses and individuals. Our team of certified accountants and financial experts offers a wide range of services including bookkeeping, tax planning and preparation, financial statement analysis, business consultation, and more. We believe in building long-term relationships with our clients by delivering accurate, reliable, and timely financial solutions.',
    tagline: 'Financial Clarity for Growth and Success',
    establishedYear: 2010,
    rating: 4.6,
    reviewCount: 32,
    verified: true,
    featured: true,
    location: 'Shyam Nagar, Raipur',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21ed6c',
    logo: 'https://images.unsplash.com/photo-1554224155-3a58922a22c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHxmaW5hbmNlJTIwbG9nb3xlbnwwfDB8fHwxNjkwMzc1NzExfDA&ixlib=rb-4.0.3&q=80&w=1080',
    contact: {
      address: '456 Finance Tower',
      city: 'Raipur',
      state: 'Chhattisgarh',
      zip: '492001',
      email: 'info@finedge.com',
      phone: '+91 771 2222555',
      website: 'https://www.finedge.com',
      social: {
        facebook: 'https://facebook.com/finedge',
        linkedin: 'https://linkedin.com/company/finedge',
        twitter: 'https://twitter.com/finedge'
      }
    },
    hours: {
      monday: '09:00 - 17:30',
      tuesday: '09:00 - 17:30',
      wednesday: '09:00 - 17:30',
      thursday: '09:00 - 17:30',
      friday: '09:00 - 17:30',
      saturday: '10:00 - 14:00',
      sunday: 'Closed'
    },
    owner: {
      id: 2,
      name: 'Anita Desai',
      position: 'Managing Director',
      bio: 'Anita brings over 20 years of accounting experience to FinEdge. As a Chartered Accountant with expertise in taxation and financial planning, she has helped numerous businesses optimize their financial operations and achieve sustainable growth.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
      contact: {
        email: 'anita@finedge.com',
        phone: '+91 98765 43210'
      }
    },
    services: [
      {
        id: 1,
        name: 'Bookkeeping & Accounting',
        description: 'Comprehensive bookkeeping and accounting services for businesses of all sizes.',
        imageUrl: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818'
      },
      {
        id: 2,
        name: 'Tax Planning & Preparation',
        description: 'Strategic tax planning and timely preparation of all tax documents.',
        imageUrl: 'https://images.unsplash.com/photo-1566452348683-35b70442b8b1'
      },
      {
        id: 3,
        name: 'Financial Consulting',
        description: 'Expert financial advice to help businesses make informed decisions.',
        imageUrl: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc'
      },
      {
        id: 4,
        name: 'Audit & Assurance',
        description: 'Comprehensive audit services to ensure financial statement accuracy and compliance.',
        imageUrl: 'https://images.unsplash.com/photo-1543286386-2e659306cd6c'
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1554224155-1696413565d3',
        caption: 'Our team of accounting professionals'
      },
      {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284',
        caption: 'Client consultation session'
      },
      {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1569683795645-b62e50fbf103',
        caption: 'Financial planning meeting'
      },
      {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
        caption: 'Tax strategy discussion'
      }
    ],
    reviews: [
      {
        id: 1,
        userName: 'Vikram Singh',
        userImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
        rating: 5,
        date: '2023-05-02',
        comment: 'FinEdge has been handling our company accounts for over 5 years now. Their service is exceptional and they have saved us significant amounts through smart tax planning.'
      },
      {
        id: 2,
        userName: 'Meera Joshi',
        userImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f',
        rating: 4,
        date: '2023-04-18',
        comment: 'Very professional team with deep knowledge of accounting and tax regulations. They helped me sort out some complex tax issues efficiently.'
      }
    ],
    attributes: {
      employeeCount: 15,
      clientsServed: 200,
      yearsInBusiness: 13,
      certification: 'ICAI Registered'
    }
  },
  {
    id: 3,
    name: 'Digital Boost Marketing',
    slug: 'digital-boost-marketing',
    category: 'Digital Marketing',
    description: 'Result-oriented digital marketing, SEO, social media management, and online advertising services.',
    longDescription: 'Digital Boost Marketing is a full-service digital marketing agency dedicated to helping businesses grow their online presence. We specialize in search engine optimization (SEO), social media marketing, content creation, pay-per-click advertising, and comprehensive digital marketing strategies. Our data-driven approach ensures measurable results and maximum ROI for our clients. Whether you\'re a small local business or a large enterprise, our team has the expertise to boost your digital presence and drive meaningful engagement with your target audience.',
    rating: 4.7,
    reviewCount: 39,
    verified: false,
    featured: false,
    establishedYear: 2018,
    location: 'Samta Colony, Raipur',
    imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48',
    coverImage: 'https://images.unsplash.com/photo-1533750516457-a7f992034fec',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwbG9nb3xlbnwwfDB8fHwxNjkwMzc1NzI3fDA&ixlib=rb-4.0.3&q=80&w=1080',
    contact: {
      address: '789 Digital Plaza',
      city: 'Raipur',
      state: 'Chhattisgarh',
      zip: '492007',
      email: 'hello@digitalboost.com',
      phone: '+91 771 3335555',
      website: 'https://www.digitalboost.com',
      social: {
        facebook: 'https://facebook.com/digitalboost',
        instagram: 'https://instagram.com/digitalboost',
        linkedin: 'https://linkedin.com/company/digitalboost',
        twitter: 'https://twitter.com/digitalboost'
      }
    },
    hours: {
      monday: '09:30 - 18:30',
      tuesday: '09:30 - 18:30',
      wednesday: '09:30 - 18:30',
      thursday: '09:30 - 18:30',
      friday: '09:30 - 18:30',
      saturday: '10:00 - 16:00',
      sunday: 'Closed'
    },
    owner: {
      id: 3,
      name: 'Varun Mehta',
      position: 'Founder & Marketing Director',
      bio: 'Varun founded Digital Boost Marketing after working with leading digital agencies in Mumbai and Delhi. His expertise in SEO and digital advertising has helped over 100 businesses improve their online visibility and customer acquisition strategies.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
      contact: {
        email: 'varun@digitalboost.com'
      }
    },
    services: [
      {
        id: 1,
        name: 'Search Engine Optimization (SEO)',
        description: 'Improve your website ranking on search engines and drive organic traffic.',
        imageUrl: 'https://images.unsplash.com/photo-1571270599358-e8e8014b4deb'
      },
      {
        id: 2,
        name: 'Social Media Marketing',
        description: 'Engage with your audience and build brand awareness through strategic social media campaigns.',
        imageUrl: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf'
      },
      {
        id: 3,
        name: 'Content Marketing',
        description: 'Create valuable, relevant content that attracts and engages your target audience.',
        imageUrl: 'https://images.unsplash.com/photo-1494599948593-3dafe8338d71'
      },
      {
        id: 4,
        name: 'Pay-Per-Click Advertising',
        description: 'Drive immediate traffic and conversions with targeted PPC campaigns on Google and social media.',
        imageUrl: 'https://images.unsplash.com/photo-1553484771-689277e6fa16'
      }
    ],
    gallery: [
      {
        id: 1,
        imageUrl: 'https://images.unsplash.com/photo-1455894127589-22f75500213a',
        caption: 'Team brainstorming session'
      },
      {
        id: 2,
        imageUrl: 'https://images.unsplash.com/photo-1552581234-26160f608093',
        caption: 'Social media campaign planning'
      },
      {
        id: 3,
        imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0',
        caption: 'Client strategy presentation'
      },
      {
        id: 4,
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998',
        caption: 'Content creation process'
      }
    ],
    reviews: [
      {
        id: 1,
        userName: 'Rohit Kapoor',
        userImage: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5',
        rating: 5,
        date: '2023-03-28',
        comment: 'Digital Boost transformed our online presence. Their SEO work helped us rank on the first page for our key terms, and the social media strategy they developed has significantly increased our engagement.'
      },
      {
        id: 2,
        userName: 'Sunita Reddy',
        userImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
        rating: 4,
        date: '2023-02-15',
        comment: 'We\'ve been working with them for six months and have seen a noticeable increase in website traffic and leads. Their team is responsive and provides regular updates on campaign performance.'
      },
      {
        id: 3,
        userName: 'Karan Malhotra',
        userImage: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f',
        rating: 5,
        date: '2023-01-10',
        comment: 'Excellent service and results! The Digital Boost team really understands digital marketing and how to generate real business results. Our PPC campaigns are performing better than ever.'
      }
    ],
    attributes: {
      employeeCount: 12,
      clientsServed: 85,
      yearsInBusiness: 5,
      specialization: 'Local Business Marketing'
    }
  }
];
