// Firebase Imports:
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';

const Dashboard = () => {
	const [selectedImg, setSelectedImg] = useState(null);
	// Getting data from firebase:
	const [imgs, setImgs] = useState([]);
	const usersCollectionRef = collection(db, 'images');

	useEffect(() => {
		const fetchImages = onSnapshot(
			usersCollectionRef,
			(snapShot) => {
				let list = [];

				snapShot.docs.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setImgs(list);
				console.log(list);
			},
			(error) => {
				console.log(error);
			}
		);
		return () => {
			fetchImages();
		};
	}, []);

	return (
		<section className="section">
			<h2>My Art </h2>
			<div className="img-grid">
				{imgs &&
					imgs.map((doc) => (
						<div
							className="img-wrap"
							key={doc.id}
							onClick={() => setSelectedImg(doc.imageUrl)}
						>
							<img src={doc.imageUrl} alt="uploaded art" />
						</div>
					))}
			</div>

			<div></div>
		</section>
	);
};
export default Dashboard;
