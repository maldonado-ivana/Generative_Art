// Reac Router Imports:
import { Routes, Route } from 'react-router-dom';

import { useState } from 'react';

import Home from './pages/Home';
import SharedLayout from './components/SharedLayout';
import FlowFields from './pages/FlowFields';
import SierpinskiTriangles from './pages/SierpinskiTriangles';
import FractalTreesSketch from './components/sketches/FractalTreesSketch';
import Dashboard from './pages/Dashboard';
import Error from './components/Error';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './pages/Account';
import ProtectedRoute from './components/ProtectedRoute';
import SharedArtLayout from './components/SharedArtLayout';
import './App.css';
import { AuthContextProvider } from './context/AuthContext';

function App() {
	const [user, setUser] = useState(null);

	return (
		<AuthContextProvider>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="flowfields" element={<FlowFields />} />
					<Route path="triangles" element={<SierpinskiTriangles />} />
					<Route path="trees" element={<FractalTreesSketch />} />
					<Route path="dashboard" element={<SharedArtLayout />}>
						<Route
							index
							element={
								<ProtectedRoute>
									<Dashboard />
								</ProtectedRoute>
							}
						/>
					</Route>
					<Route path="signup" element={<Signup />} />
					<Route path="login" element={<Login />} />
					<Route
						path="account"
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
		</AuthContextProvider>
	);
}

export default App;
