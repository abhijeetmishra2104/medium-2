import { Link } from "react-router-dom"
import Button from "../components/Button"

export  function LandingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.3">
              <animate attributeName="stop-color" values="#4F46E5; #7C3AED; #EC4899; #4F46E5" dur="10s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3">
              <animate attributeName="stop-color" values="#EC4899; #4F46E5; #7C3AED; #EC4899" dur="10s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#gradient)">
          <animate attributeName="x" from="-100%" to="100%" dur="20s" repeatCount="indefinite" />
        </rect>
        <g fill="none" stroke="url(#gradient)" strokeWidth="2">
          <circle cx="20%" cy="30%" r="80">
            <animate attributeName="r" values="80;120;80" dur="5s" repeatCount="indefinite" />
          </circle>
          <circle cx="80%" cy="70%" r="100">
            <animate attributeName="r" values="100;60;100" dur="7s" repeatCount="indefinite" />
          </circle>
        </g>
      </svg>
      <div className="relative bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-lg shadow-lg max-w-2xl w-full mx-4">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-white">
            Hi there, I am Abhijeet Mishra.
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white">
            Welcome to my project Medium.
          </h2>
          <Link to="/signup">
            <Button/>
          </Link>
        </div>
      </div>
    </div>
  )
}