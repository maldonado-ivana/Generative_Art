import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, user }) => {
	if (!user) {
		return <Navigate to="/" />;
	}
	return (
		<section>
			<h3> Dashboard</h3>
			{children};
		</section>
	);
};

export default ProtectedRoute;
