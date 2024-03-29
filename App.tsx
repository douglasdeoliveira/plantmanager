import {
	useFonts,
	Jost_400Regular,
	Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';

import { PlantProps } from '@services/storage';

import Routes from './src/routes';

export default function App(): JSX.Element {
	const [fontsLoaded] = useFonts({
		Jost_400Regular,
		Jost_600SemiBold,
	});

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(
			async (notification) => {
				const data = notification.request.content.data.plant as PlantProps;
				// eslint-disable-next-line no-console
				console.log(data);
			},
		);

		return () => subscription.remove();

		// async function notifications() {
		//   await Notifications.cancelAllScheduledNotificationsAsync();

		//   const data = await Notifications.getAllScheduledNotificationsAsync();
		//   console.log('NOTIFICAÇÕES AGENDADAS #####')
		//   console.log(data)
		// }

		// notifications()
	}, []);

	if (!fontsLoaded) return <AppLoading />;

	return <Routes />;
}
