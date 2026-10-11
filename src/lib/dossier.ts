import resume from '@/assets/resume.pdf.asset.json'
export const resumeUrl = resume.url
export const dossier = {
  title: 'AI & Machine Learning Undergraduate',
  location: 'Mysuru, Karnataka, India',
  summary: 'Motivated AI & ML undergraduate with hands-on experience in software development, AI and IoT projects. Passionate about Python, problem-solving, and building practical applications.',
  education: [
    {year:'2024 — 2028', name:'Mysore University School of Engineering', degree:'B.E. Artificial Intelligence & Machine Learning'},
    {year:'2024',name:'Sharada Vidya Mandir PU College',degree:'Pre-University Course'},
    {year:'2022',name:'DAV Public School',degree:'Secondary School Leaving Certificate'},
  ],
  experience: {role:'Machine Learning Intern', company:'Bluemind Solution Pvt. Ltd.', period:'03 — 28 August 2026', location:'Mysuru', description:'Worked on Machine Learning and Computer Vision, focusing on visual defect detection and image-based quality inspection using deep learning and transfer learning.'},
}
export const skillGroups = [
  {tier:'01',name:'Core systems',level:'PRIMARY STACK', skills:['Python','C/C++','NumPy','Pandas'],power:5},
  {tier:'02',name:'Intelligence layer',level:'APPLIED ML', skills:['PyTorch','OpenCV','Scikit-learn','XGBoost'],power:4},
  {tier:'03',name:'Deployment toolkit',level:'APPLICATION TOOLKIT',skills:['FastAPI','Gradio','Git & GitHub','Google Colab'],power:3},
]
export const marquee = 'AI & Machine Learning · Python & C/C++ · Computer Vision & Deep Learning · IoT Enthusiast · Mysuru, India'