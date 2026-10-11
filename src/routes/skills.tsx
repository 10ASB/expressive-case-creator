import { createFileRoute } from '@tanstack/react-router'
import { SkillsPage } from '@/components/portfolio'
import { pageMeta } from '@/lib/page-meta'
export const Route=createFileRoute('/skills')({head:()=>pageMeta('Stark Tech Specs','Python, C/C++, PyTorch, OpenCV, Scikit-learn, FastAPI, Gradio, NumPy, Pandas, and XGBoost: Akshay’s technical toolkit.'),component:SkillsPage})