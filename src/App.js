// Reac Router Imports:
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useState } from 'react';

import Home from './components/Home';
import About from './components/About';
import FlowFields from './components/FlowFields';
import SharedLayout from './components/SharedLayout';
import SavedFF from './components/SavedFF';
import Products from './components/SavedArt';
import Error from './components/Error';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';
import SharedArtLayout from './components/SharedArtLayout';
import './App.css';

function App() {
	const [user, setUser] = useState(null);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<SharedLayout />}>
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="flowfields" element={<FlowFields />} />
					<Route path="products" element={<SharedArtLayout />}>
						<Route index element={<Products />} />
						<Route path=":ffId" element={<SavedFF />} />
					</Route>

					<Route path="login" element={<Login setUser={setUser}></Login>} />
					<Route
						path="dashboard"
						element={
							<ProtectedRoute user={user}>
								<Dashboard user={user} />
							</ProtectedRoute>
						}
					/>
					<Route path="*" element={<Error />} />
				</Route>
			</Routes>
			{/* <footer>Footer</footer> */}
		</BrowserRouter>
	);
}

export default App;
