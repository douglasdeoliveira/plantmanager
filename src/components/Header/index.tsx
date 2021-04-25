import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import userImg from '@assets/profile.png';

import styles from './styles';

const Header: React.FC = () => {
	const [userName, setUserName] = useState<string>();

	useEffect(() => {
		async function loadStorageUserName() {
			const user = await AsyncStorage.getItem('@plantmanager:user');

			setUserName(user || '');
		}

		loadStorageUserName();
	}, [userName]);

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.greeting}>Olá,</Text>
				<Text style={styles.username}>{userName}</Text>
			</View>

			<Image source={userImg} style={styles.image} />
		</View>
	);
};

export default Header;
