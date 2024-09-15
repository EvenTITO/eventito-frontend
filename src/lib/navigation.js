import { useNavigate, useLocation } from "react-router-dom";

class Navigator {
  constructor(navigate, location, startRoute = null) {
    this.navigate = navigate;
    this.location = location;
    this.startRoute = startRoute;
  }

  foward(path) {
    const fixedPath = path[0] === "/" ? path.slice(1) : path;
    const relativePath = `${this.location.pathname}/${fixedPath}`;
    this.to(relativePath);
  }

  back() {
    const path = this.location.pathname.split(this.startRoute)[0];
    this.to(path);
  }

  to(path) {
    this.navigate(path);
  }
}

export const useNavigator = (startRoute = "/home") => {
  const navigate = useNavigate();
  const location = useLocation();

  return new Navigator(navigate, location, startRoute);
};
