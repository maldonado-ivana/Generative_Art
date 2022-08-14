import { useState, useEffect } from 'react';
import { collection, Firestore, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const useFirestore = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			let list = [];
			try {
				const querySnapshot = await getDocs(collection(db, 'images'));
				querySnapshot.forEach((doc) => {
					list.push({ id: doc.id, ...doc.data() });
				});
				setData(list);
				console.log(list);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, []);

	console.log(data);
	return;
};

export default useFirestore;
