import { formatDistance } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Image, Text, FlatList, Alert } from 'react-native';

import waterdrop from '@assets/waterdrop.png';
import Header from '@components/Header';
import Load from '@components/Load';
import PlantCardSecondary from '@components/PlantCardSecondary';
import { loadPlant, PlantProps, removePlant } from '@services/storage';

import styles from './styles';

const MyPlants: React.FC = () => {
	const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [nextWatered, setNextWatered] = useState<string>();

	useEffect(() => {
		async function loadStorageData() {
			const plantsStoraged = await loadPlant();

			if (plantsStoraged.length > 0) {
				const nextTime = formatDistance(
					new Date(plantsStoraged[0].dateTimeNotification).getTime(),
					new Date().getTime(),
					{ locale: ptBR },
				);

				setNextWatered(
					`Regue sua ${plantsStoraged[0].name} daqui a ${nextTime}`,
				);
				setMyPlants(plantsStoraged);
			}

			setLoading(false);
		}

		loadStorageData();
	}, []);

	const handleRemove = useCallback((plant: PlantProps) => {
		Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
			{
				text: 'Não 🙏🏻',
				style: 'cancel',
			},
			{
				text: 'Sim 😥',
				onPress: async () => {
					try {
						await removePlant(plant.id);

						setMyPlants((oldData) =>
							oldData.filter((item) => item.id !== plant.id),
						);
					} catch (error) {
						Alert.alert('Não foi possível remover! 😥');
					}
				},
			},
		]);
	}, []);

	if (loading) return <Load />;

	return (
		<View style={styles.container}>
			<Header />

			{myPlants.length > 0 ? (
				<>
					<View style={styles.spotlight}>
						<Image source={waterdrop} style={styles.spotlightImage} />
						<Text style={styles.spotlightText}>{nextWatered}</Text>
					</View>

					<View style={styles.plants}>
						<Text style={styles.plantsTitle}>Próximas regadas</Text>

						<FlatList
							data={myPlants}
							keyExtractor={(item) => String(item.id)}
							renderItem={({ item }) => (
								<PlantCardSecondary
									data={item}
									handleRemove={() => {
										handleRemove(item);
									}}
								/>
							)}
							showsVerticalScrollIndicator={false}
							// contentContainerStyle={{ flex: 1 }}
						/>
					</View>
				</>
			) : (
				<Text style={styles.plantsTitle}>
					Você não possui nenhuma planta salva
				</Text>
			)}
		</View>
	);
};

export default MyPlants;
