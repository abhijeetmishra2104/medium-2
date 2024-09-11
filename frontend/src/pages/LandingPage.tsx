import { Link } from "react-router-dom"

export const LandingPage = () => {
    return (
        <div className="flex justify-center ">
            <div>Hi there, I am Abhijeet Mishra. Welcome to my project Medium.</div>
            <Link to={"/signup"} >Visit the Project</Link>
        </div>
    )
}