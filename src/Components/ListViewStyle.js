import {I18nManager, StyleSheet} from "react-native";

export default styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius: 60,
        margin: 10,
        position: 'absolute',
        left: '5%'
    },
    listViewContainer: {
        flexDirection: 'row',
        flex: 1,
        width: '100%',
        height: 80,
        justifyContent: 'center',
    },
    button: {
        marginTop: '5%',
        position: 'absolute',
        right: '5%',
        transform: [{scaleX: I18nManager.isRTL ? -1 : 1}]
    },
    name: {
        color: 'black',
        fontSize: 16
    },
    helps: {},
    textContainer: {
        flexDirection: 'column',
        margin: 10,

    }
});
