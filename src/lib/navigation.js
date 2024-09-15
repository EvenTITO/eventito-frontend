import { useNavigate, useLocation } from "react-router-dom";

class Navigator {
  constructor(navigate, location) {
    this.navigate = navigate;
    this.location = location;
  }

  foward(path) {
    const relativePath = `${this.location.pathname}/${path}`;
    this.navigate(relativePath);
  }

  to(path) {
    this.navigate(path);
  }
}

export const useNavigator = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return new Navigator(navigate, location);
};
