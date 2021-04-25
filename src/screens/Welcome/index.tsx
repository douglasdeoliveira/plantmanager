import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import {
	SafeAreaView,
	Text,
	Image,
	View,
	TouchableOpacity,
} from 'react-native';

import wateringImg from '@assets/watering.png';

import styles from './styles';

const Welcome: React.FC = () => {
	const navigation = useNavigation();

	const handleStart = useCallback(() => {
		navigation.navigate('UserIdentification');
	}, [navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>
					Gerencie {'\n'}
					suas plantas de {'\n'}
					forma fácil
				</Text>

				<Image source={wateringImg} style={styles.image} resizeMode="contain" />

				<Text style={styles.subtitle}>
					Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
					sempre que precisar.
				</Text>

				<TouchableOpacity
					style={styles.button}
					activeOpacity={0.7}
					onPress={handleStart}
				>
					<Text>
						<Feather name="chevron-right" style={styles.buttonIcon} />
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default Welcome;
