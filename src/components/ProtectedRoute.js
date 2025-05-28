import { Navigate } from 'react-router-dom';
import UserAuth from '../helpers/UserAuth';
/**
 * ProtectedRoute component checks if the user is authenticated.
 * If not, it redirects to the login page.
 * If authenticated, it renders the children components.
 */

const ProtectedRoute = ({ children }) => {
  if (!UserAuth || !UserAuth.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;