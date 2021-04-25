import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { useNavigation, useRoute } from '@react-navigation/core';
import { format, isBefore } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Alert, Image, Platform, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg';

import waterdrop from '@assets/waterdrop.png';
import Button from '@components/Button';
import { PlantProps, savePlant } from '@services/storage';

import styles from './styles';

interface Params {
	plant: PlantProps;
}

const PlantSave: React.FC = () => {
	const [selectedDateTime, setSelectedDateTime] = useState(new Date());
	const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');

	const route = useRoute();
	const { plant } = route.params as Params;

	const navigation = useNavigation();

	const handleChangeTime = useCallback(
		(event: Event, dateTime: Date | undefined) => {
			if (Platform.OS === 'android') {
				setShowDatePicker((oldState) => !oldState);
			}

			if (dateTime && isBefore(dateTime, new Date())) {
				setSelectedDateTime(new Date());
				return Alert.alert('Escolha uma hora no futuro! ⏰');
			}

			if (dateTime) setSelectedDateTime(dateTime);
		},
		[],
	);

	const handleOpenDatetimePickerForAndroid = useCallback(() => {
		setShowDatePicker((oldState) => !oldState);
	}, []);

	const handleSave = useCallback(async () => {
		try {
			await savePlant({
				...plant,
				dateTimeNotification: selectedDateTime,
			});

			navigation.navigate('Confirmation', {
				title: 'Tudo certo',
				subtitle: `Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.`,
				buttonTitle: 'Muito obrigado',
				icon: 'hug',
				nextScreen: 'MyPlants',
			});
		} catch {
			Alert.alert('Não foi possível salvar. 😢');
		}
	}, [navigation, plant, selectedDateTime]);

	return (
		<ScrollView
			bounces={false}
			showsVerticalScrollIndicator={false}
			contentContainerStyle={styles.container}
		>
			<View style={styles.container}>
				<View style={styles.plantInfo}>
					<SvgFromUri uri={plant.photo} height={150} width={150} />

					<Text style={styles.plantName}>{plant.name}</Text>
					<Text style={styles.plantAbout}>{plant.about}</Text>
				</View>

				<View style={styles.controller}>
					<View style={styles.tipContainer}>
						<Image source={waterdrop} style={styles.tipImage} />
						<Text style={styles.tipText}>{plant.water_tips}</Text>
					</View>

					<Text style={styles.alertLabel}>
						Escolha o melhor horário para ser lembrado:
					</Text>

					{showDatePicker && (
						<DateTimePicker
							value={selectedDateTime}
							mode="time"
							display="spinner"
							onChange={handleChangeTime}
						/>
					)}

					{Platform.OS === 'android' && (
						<TouchableOpacity
							style={styles.dateTimePickerButton}
							onPress={handleOpenDatetimePickerForAndroid}
						>
							<Text style={styles.dateTimePickerText}>
								{`Mudar ${format(selectedDateTime, 'HH:mm')}`}
							</Text>
						</TouchableOpacity>
					)}

					<Button title="Cadastrar planta" onPress={handleSave} />
				</View>
			</View>
		</ScrollView>
	);
};

export default PlantSave;
