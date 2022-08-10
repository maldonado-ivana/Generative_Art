// Firebase Imports:
import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import { collection, getDocs } from 'firebase/firestore';

const Dashboard = ({ user }) => {
	console.log(user);

	// Getting data from firebase:
	const [users, setUsers] = useState([]);
	const usersCollectionRef = collection(db, 'users');

	useEffect(() => {
		const getUsers = async () => {
			const data = await getDocs(usersCollectionRef);
			console.log(data);
			setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
		};
		getUsers();
	}, []);

	return (
		<section className="section">
			<h2>Dashboard</h2>
			<h4>Hello, {user?.name}</h4>

			<div>
				{users.map((user) => {
					return (
						<div>
							{' '}
							<h1> Name: {user.name}</h1>
							<h1>Last name: {user.lastname}</h1>
							<h1>Email: {user.email}</h1>
						</div>
					);
				})}
			</div>
		</section>
	);
};
export default Dashboard;
