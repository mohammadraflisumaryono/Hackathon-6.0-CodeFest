import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

// Add PropTypes validation
PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
