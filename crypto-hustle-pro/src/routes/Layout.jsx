import { Outlet, Link } from "react-router-dom";


const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li className="home-link" key="home-button">
            <Link style={{ color: "white" }} to="/">
              Home
            </Link>
          </li>
        </ul>
      </nav>
      <Outlet /> {/* This is where the child routes will be rendered */}
      {/* an example is the app component */}
    </div>
  );
};

export default Layout;