// Firebase Imports:
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import Modal from '../components/Modal';

const Dashboard = () => {
	// Getting data from firebase:
	const [imgs, setImgs] = useState([]);
	const usersCollectionRef = collection(db, 'images');

	const [selectedImg, setSelectedImg] = useState(null);

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
			<h1 className="pt-20 text-3xl md:text-5xl font-bold text-center text-white">
				My Art Gallery
			</h1>
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

			{selectedImg && (
				<Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
			)}
		</section>
	);
};
export default Dashboard;
