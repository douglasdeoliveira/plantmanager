import { StyleSheet } from 'react-native';

import colors from '@styles/colors';
import fonts from '@styles/fonts';

export default StyleSheet.create({
	container: {
		width: '100%',
		paddingHorizontal: 10,
		paddingVertical: 25,
		borderRadius: 20,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: colors.shape,
		marginVertical: 5,
	},
	title: {
		flex: 1,
		marginLeft: 10,
		fontFamily: fonts.heading,
		fontSize: 17,
		color: colors.heading,
	},
	details: {
		alignItems: 'flex-end',
		marginRight: 6,
	},
	timeLabel: {
		fontSize: 16,
		fontFamily: fonts.text,
		color: colors.body_light,
	},
	time: {
		marginTop: 5,
		fontSize: 16,
		fontFamily: fonts.heading,
		color: colors.body_dark,
	},
	buttonRemove: {
		width: 120,
		height: 100,
		backgroundColor: colors.red,
		marginTop: 5,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: -30,
		position: 'relative',
		paddingLeft: 25,
	},
});
