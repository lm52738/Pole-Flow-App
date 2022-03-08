import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        paddingBottom: '10%',
        alignItems: 'center',
    },
    heading: {
        marginTop: '10%'
    },
    title: {
        fontSize: 60,
        fontFamily: 'bauhaus'
    },
    header: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        width: '100%',
        padding: '5%',
        backgroundColor: '#b36cac'
    },
    card: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: '5%',
        elevation: 5,
        paddingVertical: '5%',
    },
    newsTitle: {
        fontSize: 16,
        fontWeight: "700",
        paddingBottom: 7,
        paddingLeft: 10,
    },
    newsText: {
        paddingHorizontal: 10,
        paddingVertical: 7,
    },
});

export const reminderStyles = StyleSheet.create({
    reminder: {
        marginLeft: '5%',
        borderRadius: 8,
        backgroundColor: '#b36cac',
        paddingTop: 20,
        paddingBottom: 10,
        width: '55%',
        height: 230,
    },
    reminderTitle: {
        fontSize: 16,
        color: 'white',
        paddingHorizontal: 10,
    },
    reminderDate: {
        color: 'white',
        paddingHorizontal: 10,
    },
    divider: {
        paddingTop: 5,
        alignItems: 'center',
        flex: 1,
        borderTopColor: 'white',
        borderTopWidth: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    reminderButtons: {
        height: 120,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        alignContent: 'center',
    },
    button: {
        borderRadius: 70,
        backgroundColor: 'white',
        height: 70,
        width: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        paddingLeft: '30%',
    }
});

export const tableStyles = StyleSheet.create({
    heading: {
        marginTop: '10%',
        fontSize: 20,
    },
    table: {
        paddingVertical: '5%',
    },
    cell: {
        flex: 1,
        paddingHorizontal: '1%',
        justifyContent: 'space-around',
        height: '90%',
    },
    title: {
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop: '5%',
        elevation: 5,
    }, 
    text: {
        width: '100%',
        height: '100%',
    },
    row: {
        height: 130,
    },
    header: {
        justifyContent: 'center',
    },
});

export const formStyles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '5%'
    },
    inputs: {
        width: '90%',
        flex: 1,
        padding: '3%',
    },  
    input: {
        width: '100%',
        fontSize: 16, 
    },
    inline: {
        width: '90%',
        flex: 1,
        alignItems: 'center',
        padding: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    radioText: {
        fontSize: 16,
        paddingRight: 10
    },
    buttons: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    buttonLogin: {
        width: '35%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddb2e0',
    },
    buttonSignup: {
        width: '45%',
        height: 40,
        marginLeft: -15,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b36cac',
    },
    buttonSubmit: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b36cac',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
    radios: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        paddingTop: '5%'
    }
});