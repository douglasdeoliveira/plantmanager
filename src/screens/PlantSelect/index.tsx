import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import EnvironmentButton from '@components/EnvironmentButton';
import Header from '@components/Header';
import Load from '@components/Load';
import PlantCardPrimary from '@components/PlantCardPrimary';
import api from '@services/api';
import { PlantProps } from '@services/storage';
import colors from '@styles/colors';

interface EnvironmentProps {
	key: string;
	title: string;
}

import styles from './styles';

const PlantSelect: React.FC = () => {
	const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
	const [plants, setPlants] = useState<PlantProps[]>([]);
	const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
	const [environmentSelected, setEnvironmentSelected] = useState('all');
	const [loading, setLoading] = useState(true);

	const [page, setPage] = useState(1);
	const [loadingMore, setLoadingMore] = useState(false);

	const navigation = useNavigation();

	const handleEnvironmentSelected = useCallback(
		(environment: string) => {
			setEnvironmentSelected(environment);

			if (environment === 'all') return setFilteredPlants(plants);

			const filtered = plants.filter((plant) =>
				plant.environments.includes(environment),
			);

			setFilteredPlants(filtered);
		},
		[plants],
	);

	const fetchPlants = useCallback(async () => {
		const { data } = await api.get<PlantProps[]>(
			`plants?_sort=name&_order=asc&_page=${page}&_limit=8`,
		);

		if (!data) return setLoading(true);

		if (page > 1) {
			setPlants((oldValue) => [...oldValue, ...data]);
			setFilteredPlants((oldValue) => [...oldValue, ...data]);
		} else {
			setPlants(data);
			setFilteredPlants(data);
		}

		setLoading(false);
		setLoadingMore(false);
	}, [page]);

	const handleFetchMore = useCallback((distance: number) => {
		if (distance < 1) return;

		setLoadingMore(true);
		setPage((oldValue) => oldValue + 1);
	}, []);

	const handlePlantSelect = useCallback(
		(plant: PlantProps) => {
			navigation.navigate('PlantSave', { plant });
		},
		[navigation],
	);

	useEffect(() => {
		async function fetchEnvironment() {
			const { data } = await api.get<EnvironmentProps[]>(
				'plants_environments?_sort=title&_order=asc',
			);

			setEnvironments([
				{
					key: 'all',
					title: 'Todos',
				},
				...data,
			]);
		}

		fetchEnvironment();
	}, []);

	useEffect(() => {
		fetchPlants();
	}, [fetchPlants]);

	if (loading) return <Load />;

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Header />

				<Text style={styles.title}>Em qual ambiente</Text>
				<Text style={styles.subtitle}>você quer colocar sua planta?</Text>
			</View>

			<View>
				<FlatList
					data={environments}
					keyExtractor={(item) => String(item.key)}
					renderItem={({ item }) => (
						<EnvironmentButton
							title={item.title}
							active={item.key === environmentSelected}
							onPress={() => handleEnvironmentSelected(item.key)}
						/>
					)}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={styles.environmentList}
					ListHeaderComponent={<View />}
					ListHeaderComponentStyle={{ marginRight: 24 }}
				/>
			</View>

			<View style={styles.plants}>
				<FlatList
					data={filteredPlants}
					keyExtractor={(item) => String(item.id)}
					renderItem={({ item }) => (
						<PlantCardPrimary
							data={item}
							onPress={() => handlePlantSelect(item)}
						/>
					)}
					showsVerticalScrollIndicator={false}
					numColumns={2}
					onEndReachedThreshold={0.1}
					onEndReached={({ distanceFromEnd }) =>
						handleFetchMore(distanceFromEnd)
					}
					ListFooterComponent={
						loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
					}
				/>
			</View>
		</View>
	);
};

export default PlantSelect;
