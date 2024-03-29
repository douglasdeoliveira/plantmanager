import React from 'react';
import { Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import styles from './styles';

interface EnvironmentButtonProps extends RectButtonProps {
	title: string;
	active?: boolean;
}

const EnvironmentButton: React.FC<EnvironmentButtonProps> = ({
	title,
	active = false,
	...rest
}) => {
	return (
		<RectButton
			style={[styles.container, active && styles.containerActive]}
			{...rest}
		>
			<Text style={[styles.text, active && styles.textActive]}>{title}</Text>
		</RectButton>
	);
};

export default EnvironmentButton;
