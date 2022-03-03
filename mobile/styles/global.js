import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    container: {
        flex: 1,
        overflow: "scroll",
        alignItems: 'center',
    },
    heading: {
        marginTop: '20%'
    },
    title: {
        fontSize: 60,
        fontFamily: 'bauhaus'
    },
});

export const formStyles = StyleSheet.create({
    card: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
        marginTop: '5%',
        elevation: 5,
        paddingVertical: '5%',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '5%'
    },
    inputs: {
        width: '90%',
        flex: 1,
        alignItems: 'flex-start',
        padding: '3%',
    },  
    input: {
        width: '90%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    inline: {
        width: '90%',
        flex: 1,
        alignItems: 'center',
        padding: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttons: {
        alignSelf: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
    },
    buttonLogin: {
        width: '45%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddb2e0',
    },
    buttonSignup: {
        width: '55%',
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
});