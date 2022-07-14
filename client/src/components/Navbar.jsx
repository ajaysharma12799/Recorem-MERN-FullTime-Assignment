import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="mb-10">
        <ul className="flex justify-between container mx-auto p-5 items-center">
            <Link to="/">
                <li className="bg-[#3944f7] p-5 text-[#ffffff] cursor-pointer">
                    Home
                </li>
            </Link>
            <Link to="/AllArticle">
                <li className="bg-[#3944f7] p-5 text-[#ffffff] cursor-pointer">
                    View All Articles
                </li>
            </Link>
            <Link to="/CreateArticle">
                <li className="bg-[#3944f7] p-5 text-[#ffffff] cursor-pointer">
                    Create New Article
                </li>
            </Link>
        </ul>
    </div>
  )
}

export default Navbar