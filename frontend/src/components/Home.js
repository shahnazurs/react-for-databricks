import { Link } from "react-router-dom"

const Home = () => {
    return ( 
        <Link className="btn btn-primary" to="/employees">Employees Dashboard</Link>
     );
}
 
export default Home;