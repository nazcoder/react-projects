import { Link } from "@tanstack/react-router"

function Navbar() {
    return (
        <Link to="/">
            <img className="logo" src='https://picsum.photos/id/237/200/300' height={40} width={60} alt="logo" /></Link>
    )
}

export default Navbar