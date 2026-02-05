import { Link } from 'react-router'
import { HomePage } from '../pages/home'
import { AboutPage } from '../pages/about'

export const Header = () => {
    return (
        <div className='top-nav'>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
        </div>
    )
}

