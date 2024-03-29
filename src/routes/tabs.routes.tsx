/* eslint-disable react/display-name */
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Platform } from 'react-native';

import MyPlants from '@screens/MyPlants';
import PlantSelect from '@screens/PlantSelect';
import colors from '@styles/colors';

const AppTab = createBottomTabNavigator();

const AuthRoutes: React.FC = () => {
	return (
		<AppTab.Navigator
			tabBarOptions={{
				activeTintColor: colors.green,
				inactiveTintColor: colors.heading,
				labelPosition: 'beside-icon',
				style: {
					paddingVertical: Platform.OS === 'ios' ? 10 : 0,
					height: Platform.OS === 'ios' ? 80 : 60,
				},
			}}
		>
			<AppTab.Screen
				name="Nova Planta"
				component={PlantSelect}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="add-circle-outline"
							size={size}
							color={color}
						/>
					),
				}}
			/>

			<AppTab.Screen
				name="Minhas Plantas"
				component={MyPlants}
				options={{
					tabBarIcon: ({ size, color }) => (
						<MaterialIcons
							name="format-list-bulleted"
							size={size}
							color={color}
						/>
					),
				}}
			/>
		</AppTab.Navigator>
	);
};

export default AuthRoutes;
