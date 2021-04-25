import React from 'react';
import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import styles from './styles';

interface ButtonProps extends TouchableOpacityProps {
	title: string;
}

const Button: React.FC<ButtonProps> = ({ title, ...rest }) => {
	return (
		<TouchableOpacity style={styles.container} {...rest}>
			<Text style={styles.text}>{title}</Text>
		</TouchableOpacity>
	);
};

export default Button;
