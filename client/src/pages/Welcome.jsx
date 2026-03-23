/**
 *  This is welcome page. User will see this page whenever they enter in our website.
 */
import { useNavigate } from 'react-router-dom'
import BarLoader from '../components/BarLoader'
import { useContext } from 'react'
import AppContext from '../contexts/AppContext'


function Welcome() {
  const navigate = useNavigate()
  const {email} = useContext(AppContext)

  const handleNavigate = () => {
    if (email) {
      navigate('/dashboard')
    } 
  }
  const handleNavigatep = () => {
    if (email) {
      navigate('/practice')
    } else {
      navigate('/login')
    } 
  }
return (
  <>
    {/* Hero Section */}
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-16 bg-gradient-to-br from-teal-50 to-sky-50">
      
      {/* Badge */}
      <span className="mb-6 inline-flex items-center gap-2 bg-teal-100 text-teal-800 text-xs font-medium px-4 py-1.5 rounded-full">
        Free • Practice • Excel
      </span>

      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-semibold text-center text-slate-800 leading-tight max-w-2xl">
        Master Aptitude with{" "}
        <span className="text-teal-700">StudyMate</span>
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-center text-slate-500 text-base md:text-lg max-w-xl leading-relaxed">
        Practice real exam-style MCQs, beat the timer, and track your progress — completely free.
      </p>

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        <button
          className="px-7 py-2.5 bg-teal-700 hover:bg-teal-800 text-white font-medium rounded-lg transition-colors text-sm md:text-base"
          onClick={handleNavigatep}
        >
          Start Practice
        </button>
        <button
          className="px-7 py-2.5 border-2 border-teal-700 text-teal-700 hover:bg-teal-50 font-medium rounded-lg transition-colors text-sm md:text-base"
          onClick={handleNavigate}
        >
          Start Test
        </button>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-8 mt-10 flex-wrap justify-center">
        {[
          { value: "500+", label: "Questions" },
          { value: "3", label: "Skill Levels" },
          { value: "Free", label: "Forever" },
        ].map(({ value, label }, i, arr) => (
          <div key={label} className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-2xl font-semibold text-teal-700">{value}</p>
              <p className="text-xs text-slate-400 mt-1">{label}</p>
            </div>
            {i < arr.length - 1 && <div className="h-8 w-px bg-slate-200" />}
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-2xl">
        {[
          { icon: "fa-clock", title: "Timed Exams", desc: "Auto-submit when time runs out" },
          { icon: "fa-layer-group", title: "Skill Levels", desc: "Beginner to Pro progression" },
          { icon: "fa-shield-halved", title: "AI Proctoring", desc: "Camera-based exam integrity" },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="bg-white border border-slate-100 rounded-xl p-5 flex flex-col items-center text-center gap-2 shadow-sm">
            <div className="w-9 h-9 rounded-full bg-teal-50 flex items-center justify-center">
              <i className={`fa-solid ${icon} text-teal-600 text-sm`} />
            </div>
            <p className="font-medium text-slate-700 text-sm">{title}</p>
            <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

    </div>

    <BarLoader />
  </>
)
}

export default Welcome