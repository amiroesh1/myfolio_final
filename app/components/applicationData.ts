export type APScore = {
  subject: string;
  score: number;
};

export type Extracurricular = {
  title: string;
  description: string;
  years: string;
  rank?: number;
};

export type CollegeDecision = {
  school: string;
  result: 'Admitted' | 'Waitlisted' | 'Denied' | 'Deferred';
  decisionType: 'Early Decision' | 'Early Action' | 'Regular Decision';
  attending?: boolean;
};

export type ApplicationProfile = {
  id: string;
  fullName: string;
  title: string;
  intendedMajor: string;
  schoolType: 'Public' | 'Private' | 'International';
  gender: string;
  ethnicity: string;
  location: string;
  incomeBracket?: string;
  hooks?: string;
  gpa: number;
  gpaType: 'weighted' | 'unweighted';
  satScore?: number;
  satMath?: number;
  satReading?: number;
  actScore?: number;
  apScores?: APScore[];
  ibScores?: APScore[];
  dualEnrollment?: Array<{ course: string; grade: string; institution: string }>;
  seniorYearCourses?: string[];
  extracurriculars: Extracurricular[];
  awards: string[];
  collegeDecisions: CollegeDecision[];
  recommendationLetter: {
    author: string;
    role: string;
    content: string;
  };
};

export const APPLICATION_PROFILES: ApplicationProfile[] = [
  {
    id: 'daniel-kim-mit',
    fullName: 'Daniel Kim',
    title: 'CS Major Admitted to MIT & Multiple Ivies',
    intendedMajor: 'Computer Science & Artificial Intelligence',
    schoolType: 'Private',
    gender: 'Male',
    ethnicity: 'Korean-American',
    location: 'Seattle, WA, USA',
    incomeBracket: '$80000',
    hooks: 'None',
    gpa: 3.97,
    gpaType: 'unweighted',
    satScore: 1570,
    satMath: 800,
    satReading: 770,
    apScores: [
      { subject: 'Calculus BC', score: 5 },
      { subject: 'Computer Science A', score: 5 },
      { subject: 'Statistics', score: 5 },
      { subject: 'Physics C Mechanics', score: 5 },
    ],
    dualEnrollment: [
      { course: 'Intro to Machine Learning', grade: 'A', institution: 'Community College' },
    ],
    seniorYearCourses: [
      'Linear Algebra (at local college)',
      'Differential Equations',
      'AP Physics C',
      'AP English 4',
      'AP Gov',
      'AP Micro',
      'AP Biology',
      'AP Environmental Science',
      'AP Statistics',
    ],
    extracurriculars: [
      {
        title: 'Founder & CEO — TransitVision AI',
        description:
          'Built end-to-end pipeline: data ingestion from city open transit APIs, cleaning, LSTM+Transformer ensemble for bus-arrival prediction, mobile web front-end. Impact: 3.4k monthly active users; reduced average reported wait time frustration by user-reported 18% in pilot neighborhoods. Role: product lead, principal ML engineer, managed 4-person team.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Robotics Team — Programming Captain (FIRST FRC)',
        description:
          'Designed autonomous vision stack (OpenCV + YOLO), integrated path planning for 3-DoF arm. Team placed 3rd at State Championship.',
        years: '3 years',
        rank: 2,
      },
      {
        title: 'Open-source contributions',
        description: '5 merged PRs to TensorFlow Lite optimizations for mobile inference.',
        years: '2 years',
        rank: 3,
      },
      {
        title: 'Math & Algorithms Club — President',
        description: 'Organized weekly algorithm practice; coached regional ICPC junior team.',
        years: '3 years',
      },
      {
        title: 'Research Internship (Summer) — University Lab (Transportation & ML)',
        description: 'Co-authored poster on demand forecasting for microtransit.',
        years: 'Summer',
      },
    ],
    awards: [
      'USACO Gold Division (2024)',
      'State Transportation Innovation Challenge — 1st Place (2024)',
      'WA State Science Fair — Grand Prize, Computer Science category (2023)',
      'Google Code-in Finalist (2023)',
      'AMC12: 142; AIME qualifier (2023)',
    ],
    collegeDecisions: [
      { school: 'Massachusetts Institute of Technology (MIT)', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Stanford University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Carnegie Mellon University (SCS)', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'UC Berkeley (EECS)', result: 'Waitlisted', decisionType: 'Regular Decision' },
      { school: 'Harvard University', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Mr. Jason Whitman',
      role: 'Computer Science Teacher & Research Mentor',
      content:
        `To the Admissions Committee,\n\nI am thrilled to recommend Daniel Kim for admission to your Computer Science program. I have known Daniel for three years as his Computer Science teacher and as his research mentor in the Transportation & Machine Learning Lab at the University of Washington. In both the classroom and in the lab, Daniel demonstrates a rare combination of intellectual depth, practical engineering skill, and humility.\n\nAcademically, Daniel is at the very top of his cohort. He mastered discrete algorithms and complexity in my Advanced Algorithms course and applied those skills directly to his TransitVision AI project. Notably, he developed a hybrid model that combined time-series LSTMs with Transformer-based feature encoders to model multimodal transit data — and then optimized inference latency to run on low-end mobile devices. The result was an application that was both academically rigorous and immediately useful to the public.\n\nWhat sets Daniel apart is his product sense and leadership. He led a team of four students, coordinated with city transit officials to validate data, and navigated privacy concerns responsibly. During the prototyping phase he rewrote the inference pipeline three times to balance accuracy and latency; that kind of engineering judgment is rare in a high-school student.\n\nHe also communicates clearly: he wrote a whitepaper describing his methodology and presented it at our regional science fair, where he won the Grand Prize. Daniel treats feedback like fuel — he iteratively improves and brings others along. His teammates and younger students consistently cite him as a mentor and source of inspiration.\n\nIn short, Daniel will thrive in a program that values both theoretical rigor and practical impact. I strongly endorse his application and believe he will be an exceptional contributor to your community.\n\nSincerely,\n\nMr. Jason Whitman\nComputer Science Teacher & Research Mentor`,
    },
  },
  {
    id: 'sofia-ramirez-harvard',
    fullName: 'Sofia Ramirez',
    title: 'Economics Major Admitted to Harvard & Top Ivies',
    intendedMajor: 'Economics & Public Policy',
    schoolType: 'Public',
    gender: 'Female',
    ethnicity: 'Hispanic (Mexican-American)',
    location: 'Austin, TX, USA',
    incomeBracket: '$60000',
    hooks: 'First-Generation',
    gpa: 4.0,
    gpaType: 'unweighted',
    satScore: 1510,
    apScores: [
      { subject: 'Microeconomics', score: 5 },
      { subject: 'Macroeconomics', score: 5 },
      { subject: 'US Government', score: 5 },
      { subject: 'Statistics', score: 5 },
    ],
    dualEnrollment: [
      { course: 'Econometrics I', grade: 'A', institution: 'UT Austin' },
    ],
    extracurriculars: [
      {
        title: 'Founder — Girls in Economics Initiative',
        description:
          'Created free curriculum and afterschool clubs in 8 middle schools; taught 150+ girls basics of micro/macro and financial literacy. Partnered with local non-profits.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Intern — Texas State Capitol (Policy Office)',
        description:
          'Assisted in drafting briefs on equitable funding for public schools; liaised with stakeholders.',
        years: '1 year',
        rank: 2,
      },
      {
        title: 'Research Assistant (Remote) — UT Austin Economics Dept',
        description: 'Processed labor market microdata, contributed to a working paper on minimum wage effects.',
        years: '1 year',
        rank: 3,
      },
      {
        title: 'Debate Team — Co-Captain',
        description: 'Led training on evidence synthesis and delivered policy briefs in tournaments.',
        years: '4 years',
      },
    ],
    awards: [
      'Coca-Cola Scholar Semifinalist (2024)',
      'National Economics Challenge — State Champion (2023)',
      'AP Scholar with Distinction (2023)',
      'Community Impact Award — Austin Nonprofit Coalition (2024)',
      'Presidential Volunteer Service Award — Gold Level (2023)',
    ],
    collegeDecisions: [
      { school: 'Harvard University', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Princeton University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Stanford University', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Duke University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'University of Texas at Austin', result: 'Admitted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Dr. Laura Chen',
      role: 'AP Economics Teacher & Policy Supervisor',
      content:
        `Dear Admission Committee,\n\nI am proud to write on behalf of Sofia Ramirez, a student whose intellectual curiosity and commitment to social impact make her an outstanding candidate for your program in Economics and Public Policy. I taught Sofia in AP Microeconomics and supervised the Girls in Economics Initiative she founded. In both settings she has been exemplary.\n\nSofia's classroom performance is stellar, but equally important is her ability to translate abstraction into civic action. She conceived and executed a program to teach economic principles and financial literacy to middle-school girls in underserved areas, recruiting volunteers, designing lesson plans, and measuring outcomes. She did not stop at outreach — she collected pre/post surveys and used simple econometric techniques to evaluate learning gains, producing evidence that informed program improvements.\n\nIn our policy internship partnership, Sofia's analytical skills shone; she drafted policy memos that were clear, data-driven, and persuasive. She understands the human stakes behind numbers and can move between theoretical and applied thinking fluidly. Her peers cite her as an exemplar of civic leadership.\n\nI recommend Sofia without reservation. She is precisely the kind of student who will use what she learns not just to succeed academically, but to improve institutions and communities.\n\nWarmly,\n\nDr. Laura Chen\nAP Economics Teacher & Policy Supervisor`,
    },
  },
  {
    id: 'aleksandr-petrov-georgiatech',
    fullName: 'Aleksandr (Alex) Petrov',
    title: 'Mechanical Engineering Admitted to Georgia Tech',
    intendedMajor: 'Mechanical Engineering',
    schoolType: 'Public',
    gender: 'Male',
    ethnicity: 'Eastern European (Russian/Slavic)',
    location: 'Toronto, ON, Canada',
    gpa: 92,
    gpaType: 'unweighted',
    satScore: 1470,
    ibScores: [
      { subject: 'Physics HL', score: 7 },
      { subject: 'Math HL', score: 7 },
    ],
    extracurriculars: [
      {
        title: 'Solar Car Team — Mechanical Lead',
        description:
          'Led suspension and aerodynamics subteam; redesigned chassis to reduce drag coefficient by 6%; supervised prototype testing.',
        years: '3 years',
        rank: 1,
      },
      {
        title: 'YouTube Channel — AutoCAD & CAD Tutorials',
        description: '12k subscribers; produced 50+ video tutorials focused on practical CAD workflows with downloadable models.',
        years: '2 years',
        rank: 2,
      },
      {
        title: 'Internship — BMW Toronto (Prototyping)',
        description: 'CAD prototyping, materials selection for functional parts.',
        years: 'Summer',
        rank: 3,
      },
      {
        title: 'FIRST Robotics — Mechanical Design Lead',
        description: 'Designed a modular gripper and tested material fatigue.',
        years: '3 years',
      },
    ],
    awards: [
      'Canada Wide Science Fair — Silver Medal (Engineering)',
      'Ontario Engineering Society Student Award — Merit (2023)',
      'Top 10% — Canadian Senior Math Competition (CSMC)',
      'Ontario Provincial Engineering Scholarship (merit-based)',
    ],
    collegeDecisions: [
      { school: 'Georgia Institute of Technology', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'University of Toronto', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Purdue University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'McGill University', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Mr. Omar Saeed',
      role: 'Robotics Coach & Makerspace Lead',
      content:
        `Dear Members of the Admissions Committee,\n\nI write to recommend Aleksandr Petrov for admission to your Mechanical Engineering program. I have coached Alex for three seasons on our FIRST Robotics team and supervised his Ubuntu team projects in the local makerspace. His design instincts, work ethic, and capacity for iterative engineering are exceptional.\n\nAlex combines theoretical understanding with hands-on craftsmanship. On the solar car project he led the redesign of the suspension mount, producing a lighter assembly that retained structural rigidity and reduced unsprung mass. He is meticulous with CAD tolerances and has a strong sense of manufacturability — skills that many undergraduates take years to develop.\n\nHe is also generous as a mentor: he runs weekend CAD labs for younger students and produced the online tutorials that have become a community resource. Alex's enthusiasm is contagious; he lifts team morale in crunch periods while keeping a clear focus on safety and documentation.\n\nI am confident Alex will excel in a rigorous engineering program and become a leader in design and applied research.\n\nSincerely,\n\nMr. Omar Saeed\nRobotics Coach & Makerspace Lead`,
    },
  },
  {
    id: 'priya-malhotra-berkeley',
    fullName: 'Priya Malhotra',
    title: 'Business & Entrepreneurship Admitted to UC Berkeley Haas',
    intendedMajor: 'Business / Entrepreneurship',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Indian (South Asian)',
    location: 'Singapore',
    gpa: 3.88,
    gpaType: 'unweighted',
    satScore: 1540,
    ibScores: [
      { subject: 'HL Economics', score: 7 },
      { subject: 'HL Business', score: 7 },
      { subject: 'HL Math AA', score: 6 },
    ],
    extracurriculars: [
      {
        title: 'Founder & CEO — EcoCart Marketplace',
        description:
          'Student-run sustainable e-commerce platform selling upcycled goods; revenue $12k; partnered with 6 NGOs for product sourcing and reinvested profits to micro-grants for student entrepreneurs.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Intern — Grab Singapore (Business Analytics)',
        description: 'Built dashboards and A/B testing plans for user engagement features.',
        years: 'Summer',
        rank: 2,
      },
      {
        title: 'TEDx Youth Organizer',
        description: 'Led logistics, programming, and speaker curation for 500+ attendees.',
        years: '1 year',
        rank: 3,
      },
      {
        title: 'Model UN — Delegate & Treasurer',
        description: 'Handled budgeting and sponsorship outreach.',
        years: '3 years',
      },
    ],
    awards: [
      'Young Entrepreneur Award (Singapore) — Winner (2024)',
      'International Business Olympiad — Silver Medal (2023)',
      'National DECA Competition — Top 10 (regional)',
      'School IB Business Scholarship (full tuition contribution for community service)',
    ],
    collegeDecisions: [
      { school: 'UC Berkeley (Haas)', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'NYU Stern', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'University of Michigan (Ross)', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'London School of Economics', result: 'Waitlisted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Mr. Daniel Koh',
      role: 'Business Analytics Lead, Grab Singapore',
      content:
        `To the Admissions Committee,\n\nIt is a pleasure to recommend Priya Malhotra for your undergraduate program in Business. I supervised Priya during her internship at Grab Singapore and have overseen EcoCart's partnership with our university's social entrepreneurship incubator. Priya is a natural builder: she combines commercial acumen with a strong ethical compass.\n\nDuring her internship, Priya designed data-backed proposals to improve seller onboarding which increased small vendor retention by 12% in the pilot. With EcoCart, she demonstrated strategic thinking — establishing NGO partnerships, running user research, iterating on pricing, and managing finances. She taught herself key analytics tools and became the de facto lead for performance metrics.\n\nShe is resilient, detail-oriented, and empathetic. She balances profit with purpose, and I believe she will bring this lens to your program, contributing to classroom discussion and to entrepreneurial initiatives on campus.\n\nVery sincerely,\n\nMr. Daniel Koh\nBusiness Analytics Lead, Grab Singapore`,
    },
  },
  {
    id: 'liam-oconnor-oxford',
    fullName: "Liam O'Connor",
    title: 'Data Science / Statistics Admitted to University of Oxford',
    intendedMajor: 'Data Science / Statistics',
    schoolType: 'Public',
    gender: 'Male',
    ethnicity: 'Irish',
    location: 'Dublin, Ireland',
    gpa: 95,
    gpaType: 'unweighted',
    extracurriculars: [
      {
        title: 'Founder — Machine Learning Club (School)',
        description:
          '25 members, weekly workshops on ML fundamentals and applied projects; organized hackathons.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'National Statistics Competition — 1st Place',
        description:
          'Project: "Predicting homelessness risk using public datasets" — included feature engineering, model interpretability, and policy recommendations.',
        years: '2024',
        rank: 2,
      },
      {
        title: 'Internship — Mastercard Dublin (Data Science)',
        description: 'Built anomaly detection models for transaction fraud using unsupervised techniques.',
        years: 'Summer',
        rank: 3,
      },
      {
        title: 'Kaggle Competitor',
        description: 'Several top-10% finishes, silver medal in a tabular challenge.',
        years: '2 years',
      },
    ],
    awards: [
      'EU Youth Innovation Prize — Finalist (2023)',
      'Ireland National Math Olympiad — Top 10%',
      'National Statistics Challenge — 1st Place (2024)',
      'Young Data Scientist Award — Regional Winner',
    ],
    collegeDecisions: [
      { school: 'University of Oxford', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Imperial College London', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'University of Edinburgh', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'University College London (UCL)', result: 'Waitlisted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Ms. Fiona Gallagher',
      role: 'Mathematics Teacher & Internship Mentor',
      content:
        `Dear Admissions Panel,\n\nI enthusiastically recommend Liam O'Connor for your Data Science program. As his mathematics teacher and internship supervisor at Mastercard Dublin, I have observed Liam apply theoretical rigor to practical data problems with maturity beyond his years.\n\nLiam's competition work demonstrated not only coding and modeling skill but also an emphasis on interpretability and societal impact. In his homelessness prediction project he balanced predictive accuracy with fairness constraints and produced policy recommendations that were both humane and implementable. During his Mastercard internship he built a small unsupervised pipeline for anomaly detection that improved triage efficiency for analysts.\n\nHe is intellectually curious, meticulous with proofs and code alike, and communicates complex ideas plainly. He will thrive in an academically rigorous program and contribute meaningfully to research and applied projects on campus.\n\nBest regards,\n\nMs. Fiona Gallagher\nMathematics Teacher & Internship Mentor`,
    },
  },
];
