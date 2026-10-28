import resume from '@/assets/resume.pdf.asset.json'
export const resumeUrl = resume.url
export const dossier = {
  title: 'AI & Machine Learning Undergraduate',
  location: 'Mysuru, Karnataka, India',
  summary: 'Motivated AI & ML undergraduate with hands-on experience in software development, AI and IoT projects. A tech enthusiast who loves exploring new ideas and a wide range of interests. Passionate about Python, problem-solving, and building practical applications.',
  personal: {
    favouriteFoods: ['Pizza', 'Paneer biryani', 'Ice cream'],
    favouriteSubject: 'Maths',
    lunchToday: 'Not supplied; favourite foods do not establish what he ate today.',
    loverBoyReply: 'Why don’t you go on a date to know him better? 😉',
    weaknessReplies: [
      'He never lets his enemies know his weaknesses. 😉',
      'Classified. Even S.H.I.E.L.D. couldn’t get that file. 😏',
      'Nice try — that information is locked inside the arc reactor. 🔒',
      'I ran a full scan. The report came back: no weaknesses found. 🤖',
      'That file is encrypted, and I may have swallowed the key. 😉',
      'Weaknesses? His suit has none, and neither does he. 😄',
    ],
  },
  education: [
    {year:'2024 — 2028', name:'Mysore University School of Engineering', degree:'B.E. Artificial Intelligence & Machine Learning'},
    {year:'2024',name:'Sharada Vidya Mandir PU College',degree:'Pre-University Course'},
    {year:'2022',name:'DAV Public School',degree:'Secondary School Leaving Certificate'},
  ],
  experience: {role:'Machine Learning Intern', company:'Bluemind Solution Pvt. Ltd.', period:'03 August 2026 — 28 August 2026', location:'Mysuru, Karnataka', status:'Completed', description:'Completed a four-week internship, gaining practical industry exposure and hands-on learning during the internship.'},
  availability: 'His first internship (Bluemind Solution, August 2026) is complete, and he is now available for his next internship opportunity.',
  extracurriculars: {
    workshops: ['AWS', 'LinkedIn', 'Be10X'],
    club: "Member of his college's Synapse club.",
    hackathons: 'Attended multiple hackathons.',
    sports: ['Badminton', 'Cricket', 'Basketball', 'Swimming', 'Hiking/Trekking'],
    pursuits: ['Fitness', 'Composing music', 'Gaming (COD, Garena, and many more)', 'Artist — multiple creative artworks made at home'],
    movies: 'Loves watching movies, especially Marvel films.',
    creative: ['Photography', 'Video editing', 'Singing'],
    singing: 'Junior-level singer in Sangeetha (music).',
    creativeNote: 'He is into photography and video editing; visitors can see his work on Instagram.',
    currentBuild: 'Currently building a voice-to-text application that supports 60+ languages (in progress; no public link yet).',
    details: 'These are additional details shared by Akshay, not entries from the résumé PDF. He has attended other workshops beyond those listed, and more details will be added later. Only mention missing specifics (certificates, wins, roles, awards) if a visitor asks about them directly.',
  },
  achievements: [
    {
      title: 'AI Tools & Claude Workshop',
      issuer: 'BE10X',
      recipient: 'Akshay S Bharadwaj',
      issued: '25 October 2026',
      issuedIso: '2026-10-25',
      note: 'Certificate of successful completion.',
      skills: [
        'Create presentations using AI in under 5 minutes',
        'Analyse data using AI in under 30 minutes',
        'Code and debug using AI in under 10 minutes',
      ],
    },
    {
      title: 'Artificial Intelligence Fundamentals',
      issuer: 'IBM SkillsBuild',
      recipient: 'Akshay S Bharadwaj',
      issued: '2 January 2026',
      issuedIso: '2026-01-02',
      note: 'Verified IBM SkillsBuild credential.',
      skills: ['Artificial intelligence fundamentals'],
      verifyUrl: 'https://www.credly.com/badges/d22fdd6f-e46f-4f10-a99e-0adc5b61f5ef',
    },
    {
      title: 'SkillsBuild - Customer Engagement: Communication and Personality Dynamics',
      issuer: 'IBM SkillsBuild',
      recipient: 'Akshay S Bharadwaj',
      issued: '2 January 2026',
      issuedIso: '2026-01-02',
      note: 'Verified IBM SkillsBuild credential.',
      skills: ['Communication', 'Personality dynamics', 'Customer engagement'],
      verifyUrl: 'https://www.credly.com/badges/7379ecf4-57c7-4e23-bab5-532addb8f353',
    },
  ],
  events: [
    {
      title: 'Sales Connect on Tour — Mysore',
      status: 'Attended',
      association: 'LinkedIn event material · names Akshay S and Bluemind Solutions Private Limited',
    },
  ],
}
export const skillGroups = [
  {tier:'01',name:'Core systems',level:'PRIMARY STACK', skills:['Python','C/C++','NumPy','Pandas'],power:5},
  {tier:'02',name:'Intelligence layer',level:'APPLIED ML', skills:['PyTorch','OpenCV','Scikit-learn','XGBoost'],power:4},
  {tier:'03',name:'Deployment toolkit',level:'APPLICATION TOOLKIT',skills:['FastAPI','Gradio','Git & GitHub','Google Colab'],power:3},
]
export const marquee = 'AI & Machine Learning · Python & C/C++ · Computer Vision & Deep Learning · IoT Enthusiast · Mysuru, India'