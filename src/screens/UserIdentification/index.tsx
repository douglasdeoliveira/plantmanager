import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useState } from 'react';
import {
	SafeAreaView,
	Text,
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from 'react-native';

import Button from '@components/Button';
import colors from '@styles/colors';

import styles from './styles';

const UserIdentification: React.FC = () => {
	const navigation = useNavigation();

	const [isFocused, setIsFocused] = useState(false);
	const [isFilled, setIsFilled] = useState(false);
	const [name, setName] = useState<string>();

	const handleInputBlur = useCallback(() => {
		setIsFocused(false);
		setIsFilled(!!name);
	}, [name]);

	const handleInputFocus = useCallback(() => {
		setIsFocused(true);
	}, []);

	const handleInputChange = useCallback((value: string) => {
		setName(value);
		setIsFilled(!!value);
	}, []);

	const handleSubmit = useCallback(async () => {
		if (!name) return Alert.alert('Me diz como chamar você 😢');

		try {
			await AsyncStorage.setItem('@plantmanager:user', name);

			navigation.navigate('Confirmation', {
				title: 'Prontinho',
				subtitle:
					'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
				buttonTitle: 'Começar',
				icon: 'smile',
				nextScreen: 'PlantSelect',
			});
		} catch {
			Alert.alert('Não foi possível salvar o seu nome. 😢');
		}
	}, [name, navigation]);

	return (
		<SafeAreaView style={styles.container}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.content}>
						<View style={styles.form}>
							<View style={styles.header}>
								<Text style={styles.emoji}>{isFilled ? '😄' : '😃'}</Text>
								<Text style={styles.title}>
									Como podemos {'\n'}
									chamar você?
								</Text>
							</View>

							<TextInput
								style={[
									styles.input,
									(isFocused || isFilled) && { borderColor: colors.green },
								]}
								placeholder="Digite um nome"
								onBlur={handleInputBlur}
								onFocus={handleInputFocus}
								onChangeText={handleInputChange}
							/>

							<View style={styles.footer}>
								<Button title="Confirmar" onPress={handleSubmit} />
							</View>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default UserIdentification;
