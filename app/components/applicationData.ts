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
  highSchool?: string;
  program?: string;
  submission?: string;
  conditions?: string;
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
  ieltsScore?: number;
  ieltsReading?: number;
  ieltsListening?: number;
  ieltsSpeaking?: number;
  ieltsWriting?: number;
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
    id: 'sezim-bekova-nyuad',
    fullName: 'Sezim Bekova',
    title: 'Scholarship to NYU Abu Dhabi',
    highSchool: 'Educational Complex school-gymnasium #70 (2024)',
    program: 'Business',
    submission: 'Regular admission',
    conditions: 'Scholarship - $80,750/year',
    intendedMajor: 'Business',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kyrgyz',
    location: 'Bishkek, Kyrgyzstan / Abu Dhabi, UAE',
    gpa: 5,
    gpaType: 'unweighted',
    satScore: 1550,
    satMath: 790,
    satReading: 760,
    ieltsScore: 7.5,
    ieltsReading: 9,
    ieltsListening: 7.5,
    ieltsSpeaking: 7,
    ieltsWriting: 7,
    extracurriculars: [
      {
        title: 'Global Scholar — AFS x UPenn Global STEM Accelerators',
        description: 'Designed AI app “Recyclable” for waste sorting; presented to UPenn CSIS committee.',
        years: '1 year',
        rank: 1,
      },
      {
        title: 'Team Lead — The Junior Academy (NYAS)',
        description: 'Built AI tools for cognitive classrooms; led meetings, milestones, research summary.',
        years: '1 year',
        rank: 2,
      },
      {
        title: 'Administrative Assistant — Hotel Bishkek',
        description: 'Daily reports, sales efficiency strategy, improved team workflows.',
        years: '1 year',
        rank: 3,
      },
      {
        title: 'Intern — Nobel Global Navigators',
        description: 'Facilitator to coach; supported Intro to Web Design, TS, Leadership cohorts.',
        years: '1 year',
      },
    ],
    awards: [
      'Diploma with honors and Altyn Tamga (top 150 of 50,000 graduates)',
      'Winner of “Immersion Business Management Essay Contest”',
    ],
    collegeDecisions: [
      { school: 'New York University Abu Dhabi', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Carnegie Mellon University in Qatar', result: 'Admitted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Teacher',
      role: 'Business Teacher',
      content: 'Highlights leadership in STEM innovation, essays, and consistent scholarship performance.',
    },
  },
  {
    id: 'tomiris-kushekenova-hkust',
    fullName: 'Tomiris Kushekenova',
    title: 'Full tuition + housing at HKUST (Information Systems)',
    highSchool: 'NIS CBD Atyrau (2024)',
    program: 'Information Systems',
    submission: 'Regular admission',
    conditions: 'Full tuition and housing',
    intendedMajor: 'Information Systems',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kazakh',
    location: 'Atyrau, Kazakhstan / Hong Kong',
    gpa: 4.97,
    gpaType: 'unweighted',
    ieltsScore: 8,
    ieltsReading: 8.5,
    ieltsListening: 8.5,
    ieltsSpeaking: 7.5,
    ieltsWriting: 6.5,
    extracurriculars: [
      {
        title: 'Local Representative — NIS Valley',
        description: 'Built ties with Astana Hub; promoted IT opportunities to students.',
        years: '1 year',
        rank: 1,
      },
      {
        title: 'Founder — “Speak It Easy” English Club',
        description: '60+ students; interactive discussions and language practice.',
        years: '2 years',
        rank: 2,
      },
      {
        title: 'Minister of Education — NIS Atyrau Student Council',
        description: 'Workshops/events for 720 students on educational opportunities.',
        years: '1 year',
        rank: 3,
      },
      {
        title: 'Volunteer — Univero IT department',
        description: 'Helped fill university profiles (200+ institutions) on website.',
        years: '1 year',
      },
      {
        title: 'Assistant — Gas Stations IT department',
        description: 'Supported 1C program operations for fuel supply network.',
        years: '1 year',
      },
      {
        title: 'Scholar — Kode With Klossy',
        description: 'Front-end/back-end engineering, built global educational tools demo.',
        years: 'Summer',
      },
      {
        title: 'Learner — Girls Who Code',
        description: 'JavaScript, Game Design, tech career prep.',
        years: '1 year',
      },
      {
        title: 'Initiator — STEM competition',
        description: 'Organized STEM competition (30 students); 2 projects won national awards.',
        years: '1 year',
      },
      {
        title: 'Photographer — NIS Press Club',
        description: 'Photo exhibition 700+ visitors; national/local awards.',
        years: '2 years',
      },
    ],
    awards: [
      '2nd place at International Science Projects Olympiad (Okyanus Colleges)',
      'Selected to study at Miniboss International Business School (5 of 720)',
    ],
    collegeDecisions: [
      { school: 'The Hong Kong University of Science and Technology', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Bryn Mawr College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Drexel University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Fordham University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Corvinus University of Budapest', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'City University of Hong Kong', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'The University of Hong Kong', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'New York University', result: 'Waitlisted', decisionType: 'Regular Decision' },
      { school: 'Mount Holyoke College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Harvey Mudd College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Smith College', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Counselor',
      role: 'School Counselor',
      content: 'Highlights leadership in education outreach, STEM competitions, and language programs.',
    },
  },
  {
    id: 'ailu-baimagambetova-ku',
    fullName: 'Ailu Baimagambetova',
    title: 'Full tuition + housing at KU Leuven',
    highSchool: 'School gymnasium #9 (2021)',
    program: 'Business Administration',
    submission: 'Rolling admission',
    conditions: 'Full tuition and housing',
    intendedMajor: 'Business Administration',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kazakh',
    location: 'Aktobe, Kazakhstan / Leuven, Belgium',
    gpa: 4.8,
    gpaType: 'unweighted',
    ieltsScore: 7.5,
    ieltsReading: 7.5,
    ieltsListening: 8,
    ieltsSpeaking: 7.5,
    ieltsWriting: 7.5,
    extracurriculars: [
      {
        title: 'Co-Founder, Head of Finance — Qazaq Society in Belgium',
        description: 'Oversaw budgeting, risk management, and financial strategy.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Founder — 360 Degree Wear',
        description: 'Managed business strategy, design, production, logistics, marketing.',
        years: '2 years',
        rank: 2,
      },
      {
        title: 'English & Study Mentor — Online learning school',
        description: 'Taught and coordinated; created 30 learning courses.',
        years: '2 years',
        rank: 3,
      },
      {
        title: 'Marketing Manager — Local start-up',
        description: 'SMM and brand building.',
        years: '1 year',
      },
      {
        title: 'Volunteer — Online learning school',
        description: 'Supported operations and mentoring.',
        years: '1 year',
      },
    ],
    awards: [
      'Merit Scholar - National - Diploma with honors',
      'Gold Medalist - National - English language olympiad',
    ],
    collegeDecisions: [
      { school: 'KU Leuven', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Arizona State University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'The Hague Pathway College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Maastricht University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'University of Amsterdam', result: 'Admitted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Teacher',
      role: 'Business Teacher',
      content: 'Highlights entrepreneurship, finance leadership, and academic excellence.',
    },
  },
  {
    id: 'sofia-amanova-charles',
    fullName: 'Sofia Amanova',
    title: 'Scholarship to Charles University (Social Sciences)',
    highSchool: 'Bishkek International School (2023)',
    program: 'Social Sciences',
    submission: 'Regular admission',
    conditions: 'Scholarship - sponsoring exchange programs',
    intendedMajor: 'Social Sciences',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kyrgyz',
    location: 'Bishkek, Kyrgyzstan / Prague, Czech Republic',
    gpa: 4.7,
    gpaType: 'unweighted',
    ieltsScore: 7,
    ieltsReading: 6.5,
    ieltsListening: 7.5,
    ieltsSpeaking: 8,
    ieltsWriting: 6,
    extracurriculars: [
      { title: 'Interact Volunteering Club', description: 'Community volunteering projects and service.', years: '2 years', rank: 1 },
      { title: 'Volleyball', description: 'School volleyball team.', years: '2 years' },
      { title: 'Athletics', description: 'Track & field participation.', years: '2 years' },
      { title: 'Tech Girls’22', description: 'STEM outreach and tech learning for girls.', years: '1 year' },
      { title: 'Founder — Jetekchi Kyzdar', description: 'Initiative supporting girls’ leadership.', years: '1 year' },
      { title: 'Operator — Drama and theatre anniversary', description: 'Organized theatre anniversary operations.', years: '1 year' },
      { title: 'Youth leaders for social progress', description: 'Leadership and social progress activities.', years: '1 year' },
    ],
    awards: [
      'Medals of Excellence and certificates from volunteering',
      'Winner of school brain quizzes',
    ],
    collegeDecisions: [
      { school: 'Charles University', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Wesleyan College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Cassino University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Nottingham Trent University', result: 'Admitted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Counselor',
      role: 'Counselor',
      content: 'Highlights balanced academics, volunteering, and leadership initiatives.',
    },
  },
  {
    id: 'saida-auyezova-cityu',
    fullName: 'Saida Auyezova',
    title: 'Full tuition + housing to City University of Hong Kong',
    highSchool: 'NIS PhMD Almaty (2025)',
    program: 'Psychology',
    submission: 'Early action',
    conditions: 'Full tuition and housing - $21,850/year',
    intendedMajor: 'Psychology',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kazakh',
    location: 'Almaty, Kazakhstan / Hong Kong',
    gpa: 4.88,
    gpaType: 'unweighted',
    satScore: 1510,
    satMath: 760,
    satReading: 750,
    ieltsScore: 8,
    ieltsReading: 9,
    ieltsListening: 8.5,
    ieltsSpeaking: 7.5,
    ieltsWriting: 7.5,
    extracurriculars: [
      { title: 'Performer/Singer — Quality Art School', description: 'Music competitions, festivals, performances in orphanages and retirement homes.', years: '3 years', rank: 1 },
      { title: 'Researcher — NIS/STEMulate/Shanyrak Center', description: 'Research on gender stereotypes, dementia, identity crisis; presentations.', years: '2 years', rank: 2 },
      { title: 'Dance Team Member — Desire Dance Studio / Ura:Ritai', description: 'Placed in 6 national competitions; TV backup dancer.', years: '2 years', rank: 3 },
      { title: 'English Olympiad Participant', description: 'Hippo, school olympiads, NIS network — multiple wins including Asia finals.', years: '3 years' },
      { title: 'French Language Student', description: 'DELF B1/B2; won poetry and video contests (Belgian embassy).', years: '3 years' },
      { title: 'Volunteer/Tutor', description: 'Alash volunteers, OQU project; mentored kids for NIS entrance; event volunteering.', years: '2 years' },
      { title: 'Biology olympiad participant', description: 'British Biology Olympiad, Biomed society, NU iGEM camp (3rd place presentation).', years: '2 years' },
      { title: 'Eco Volunteer/Coordinator — Recycle Birge', description: 'Eco-events, copywriting, recycling coordination.', years: '2 years' },
      { title: 'Founder/Teacher — NIS Speaky English Club', description: 'Screenings, debates, quizzes, mascot challenges for grades 7-12.', years: '2 years' },
      { title: 'Psychology Student — Yale Online / RISE / Avernus', description: 'Essay competitions, short film on mental health, online psych courses.', years: '2 years' },
    ],
    awards: [
      '3rd place Hippo International English Olympiad (Assisi, Italy)',
      '1st place French Poetry Reading Competition (Belgian Embassy in Kazakhstan)',
    ],
    collegeDecisions: [
      { school: 'City University of Hong Kong', result: 'Admitted', decisionType: 'Early Decision', attending: true },
      { school: 'Kenyon College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Washington College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Lingnan University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Furman University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Reed College', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Rhodes College', result: 'Waitlisted', decisionType: 'Regular Decision' },
      { school: 'Bowdoin College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Bates College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Tulane University', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Teacher',
      role: 'Psychology / Humanities Teacher',
      content: 'Highlights arts, research, language achievements, and community impact.',
    },
  },
  {
    id: 'marina-tsoy-mhc',
    fullName: 'Marina Tsoy',
    title: 'Full tuition + housing to Mount Holyoke College',
    highSchool: 'Lyceum #134 (2023)',
    program: 'Undecided',
    submission: 'Regular admission',
    conditions: 'Full tuition and housing - $68,000/year',
    intendedMajor: 'Undecided',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kazakh',
    location: 'Almaty, Kazakhstan / Massachusetts, USA',
    gpa: 5,
    gpaType: 'unweighted',
    ieltsScore: 7.5,
    ieltsReading: 6.5,
    ieltsListening: 9,
    ieltsSpeaking: 6.5,
    ieltsWriting: 7,
    extracurriculars: [
      { title: 'Class President — Student Government', description: 'Re-elected 2 years; mediated concerns, resolved conflicts.', years: '2 years', rank: 1 },
      { title: 'Researcher — Mental illness depiction in film', description: 'Research, interviews, presentation on stigma.', years: '1 year', rank: 2 },
      { title: 'Editor — Video Editing', description: 'Ran editing page, commissions, school event videos.', years: '2 years', rank: 3 },
      { title: 'Volunteer — Community Service', description: 'Volunteered at NEWMAN, Alliance, marathons; inclusive support.', years: '2 years' },
      { title: 'Art Coordinator — Esentai Gallery (Intern)', description: 'Tours, posters, social posts, sponsor outreach, events.', years: '1 year' },
      { title: 'Vice President — Research Club', description: 'Organized conferences, mentored students, media outreach.', years: '1 year' },
      { title: 'Actress — Theater/Drama', description: 'Lead roles, training pieces, helped peers overcome stage fright.', years: '2 years' },
      { title: 'Media Outreach Chair — Firefly', description: 'Social media, networking, contacting professionals.', years: '1 year' },
    ],
    awards: [
      'Best detailed project (3D modeling) — school competition',
      '1st place Business Competition (Monetization of Ideas)',
    ],
    collegeDecisions: [
      { school: 'Mount Holyoke College', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'DePaul University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Bowdoin College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Amherst College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Middlebury College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Hamilton College', result: 'Denied', decisionType: 'Regular Decision' },
      { school: 'Tufts University', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Teacher',
      role: 'Advisor',
      content: 'Highlights leadership, research, media and community service impact.',
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
  {
    id: 'asemai-kauas-nu',
    fullName: 'Asemai Kauas',
    title: 'Full-ride to Nazarbayev University (CS)',
    highSchool: 'IT Lyceum (2023)',
    program: 'Computer Science',
    submission: 'Regular admission',
    conditions: 'Full ride',
    intendedMajor: 'Computer Science',
    schoolType: 'International',
    gender: 'Female',
    ethnicity: 'Kazakh',
    location: 'Taraz, Kazakhstan',
    gpa: 5,
    gpaType: 'unweighted',
    satScore: 1470,
    satMath: 790,
    satReading: 690,
    ieltsScore: 7.5,
    ieltsReading: 8,
    ieltsListening: 8.5,
    ieltsSpeaking: 7,
    ieltsWriting: 6.5,
    extracurriculars: [
      {
        title: 'CTO & Web Developer — Benelink',
        description: 'Built PHP/SQL backend connecting 2K volunteers from 49 countries; trained 3 interns.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Co-founder — “512” Safety Device',
        description: 'Arduino/Raspberry Pi panic button with voice recognition & SMS alert to reduce elevator violence.',
        years: '2 years',
        rank: 2,
      },
      {
        title: 'Co-founder — DebateLink',
        description: 'Non-profit popularizing debates; raised $7k; ran programs (56/400 won national cups).',
        years: '2 years',
        rank: 3,
      },
      {
        title: 'Sales / Chatbot Dev — BilimBer',
        description: 'Handled ~200 leads ($531 sales); built Python chatbot to replace sales ops by 70%.',
        years: '1 year',
      },
    ],
    awards: [
      '15K USD grant winner of “Social Innovation in Central Asia”',
      'Silver Medalist INFOMATRIX-Asia 2022 (top 4.1%)',
    ],
    collegeDecisions: [
      { school: 'Nazarbayev University', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'New York University', result: 'Waitlisted', decisionType: 'Regular Decision' },
      { school: 'Wellesley College', result: 'Waitlisted', decisionType: 'Regular Decision' },
      { school: 'University of Pennsylvania', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'School Counselor',
      role: 'Counselor',
      content: 'Highlighting full-ride admission with strong CS and social impact projects.',
    },
  },
  {
    id: 'azat-samatuly-minerva',
    fullName: 'Azat Samatuly',
    title: 'Full tuition + housing to Minerva University',
    highSchool: 'NIS PMD Astana (2024)',
    program: 'Business and Social Sciences',
    submission: 'Early action',
    conditions: 'Full tuition and housing',
    intendedMajor: 'Business and Social Sciences',
    schoolType: 'International',
    gender: 'Male',
    ethnicity: 'Kazakh',
    location: 'Astana, Kazakhstan',
    gpa: 4.96,
    gpaType: 'unweighted',
    satScore: 1500,
    satMath: 800,
    satReading: 700,
    ieltsScore: 8,
    ieltsReading: 8.5,
    ieltsListening: 8.5,
    ieltsSpeaking: 7,
    ieltsWriting: 6.5,
    extracurriculars: [
      {
        title: 'Peer-educator & Media Manager — Y-PEER (UNFPA)',
        description: '15 workshops for 380 people; trained 25 trainers; UN Women podcasts; TikTok +220k views.',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'GM & Biz Assistant — Ikigai Cafe',
        description: 'Implemented QR menu, suppliers, delivery; +20% revenue, -5% costs.',
        years: '1 year',
        rank: 2,
      },
      {
        title: 'Cofounder — Odaq Space events',
        description: 'Ran 9 events for 3K people; SMM and program design.',
        years: '1 year',
        rank: 3,
      },
      {
        title: 'Brand Ambassador — Ernst & Young',
        description: 'Supported case championships, workshops on CV and global careers.',
        years: '1 year',
      },
    ],
    awards: [
      'Bronze at International Economics Olympiad',
      '3rd place International Essay Competition (Trust for Sustainable Living, UK)',
    ],
    collegeDecisions: [
      { school: 'Minerva University', result: 'Admitted', decisionType: 'Early Decision', attending: true },
      { school: 'Northwestern University in Qatar', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'Nazarbayev University', result: 'Admitted', decisionType: 'Regular Decision' },
      { school: 'NYU Abu Dhabi', result: 'Denied', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'Teacher',
      role: 'Economics Teacher',
      content: 'Highlights leadership across economics, debate, and media initiatives.',
    },
  },
  {
    id: 'assylkhan-serikov-elte',
    fullName: 'Assylkhan Serikov',
    title: 'Full-ride to Eötvös Loránd University (Business Management)',
    highSchool: 'BIL Shymkent',
    program: 'Business Management',
    submission: 'Regular admission',
    conditions: 'Full ride',
    intendedMajor: 'Business Management',
    schoolType: 'International',
    gender: 'Male',
    ethnicity: 'Kazakh',
    location: 'Shymkent, Kazakhstan / Budapest, Hungary',
    gpa: 5,
    gpaType: 'unweighted',
    ieltsScore: 6.5,
    ieltsReading: 6.5,
    ieltsListening: 7.5,
    ieltsSpeaking: 6,
    ieltsWriting: 6,
    extracurriculars: [
      {
        title: 'SMM for multiple brands',
        description: 'Social media manager for restaurants, ophthalmology, dental clinics (Sandyq, Kaiser, Crystal Cornea).',
        years: '2 years',
        rank: 1,
      },
      {
        title: 'Event manager — Qazaq Reading Club',
        description: 'Organized cultural events promoting Kazakh language in Hungary.',
        years: '1 year',
        rank: 2,
      },
      {
        title: 'President — “Shyraq” NU Student Club',
        description: 'Led cultural club operations and events.',
        years: '1 year',
        rank: 3,
      },
    ],
    awards: [
      'Silver Medal in National Geography Olympiad (grade 11)',
      'Bronze Medal in National Geography Olympiad (grade 9)',
    ],
    collegeDecisions: [
      { school: 'Eötvös Loránd University', result: 'Admitted', decisionType: 'Regular Decision', attending: true },
      { school: 'Nazarbayev University', result: 'Admitted', decisionType: 'Regular Decision' },
    ],
    recommendationLetter: {
      author: 'School Counselor',
      role: 'Counselor',
      content: 'Emphasizes leadership in SMM, cultural events, and debate.',
    },
  },
];
