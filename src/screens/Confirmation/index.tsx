import { useNavigation, useRoute } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { SafeAreaView, Text, View } from 'react-native';

import Button from '@components/Button';

import styles from './styles';

interface Params {
	title: string;
	subtitle: string;
	buttonTitle: string;
	icon: 'smile' | 'hug';
	nextScreen: string;
}

const Confirmation: React.FC = () => {
	const navigation = useNavigation();
	const route = useRoute();

	const emojis = {
		hug: '🤗',
		smile: '😄',
	};

	const {
		title,
		subtitle,
		buttonTitle,
		icon,
		nextScreen,
	} = route.params as Params;

	const handleMoveOn = useCallback(() => {
		navigation.navigate(nextScreen);
	}, [navigation, nextScreen]);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>{emojis[icon]}</Text>

				<Text style={styles.title}>{title}</Text>

				<Text style={styles.subtitle}>{subtitle}</Text>

				<View style={styles.footer}>
					<Button title={buttonTitle} onPress={handleMoveOn} />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Confirmation;
