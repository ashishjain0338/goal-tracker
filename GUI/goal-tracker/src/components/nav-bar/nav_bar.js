import './nav_bar.css';
import axios from 'axios';
import { InputGroup } from 'react-bootstrap';
function NavBar() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ border: "1px solid gray" }} >
                <a className="navbar-brand" href="/">Manage_Your_Finances</a>
                <button aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler" data-target="#navbarNav" data-toggle="collapse" type="button">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/trend_plot/">Trend Plot</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/set_goal/">Set Goals</a>
                        </li>
                    </ul>
                </div>
                <div className="navbar navbar-dark bg-dark">
                    <a href="/view_data/"><button className="btn btn-sm btn-outline-secondary" type="button">View Data</button></a>
                    <button className="btn btn-sm btn-outline-secondary"  style={{ margin: "0 25px 0 25px" }} type="button">Sync New Entries
                    </button>
                    <button className="btn btn-sm btn-outline-secondary" type="button" >Clear and Sync All</button>
                </div>
            </nav>
        </div>
    );
}
export { NavBar };