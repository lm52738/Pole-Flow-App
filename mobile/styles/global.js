import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        paddingBottom: '5%',
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
        alignItems:'center',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal:'5%',
        backgroundColor: '#b36cac',
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
    newsIcon: {
        marginLeft: 'auto',
        marginRight: 30,
        padding: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    newsInline: {
        flexDirection: 'row',
        alignItems: 'center',
    }
});


export const usersStyles = StyleSheet.create({
    usersNav: {
        flexDirection: 'row',
        paddingVertical: 20,
        justifyContent: 'center',
    },
    users: {
        flex: 1,
        width: '100%',
    },
    newUsers: {
        width: '100%',
        paddingVertical: 10,
    },
    userItem: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    }, 
    newUserItem: {
        fontSize: 16,
        paddingVertical: 10,
    },
    newUsersTitle: {
        flex:1,
        marginLeft: 20,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        fontSize: 16,
        paddingVertical: 10,
        color: '#b36cac',
    },
    noUsers: {
        flex:1,
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 16,
        paddingVertical: 10,
        color: '#b36cac',
    },
    item: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        elevation: 15,
        backgroundColor: 'white',
    }, 
    itemText: {
        marginHorizontal: 30,
        flex:2,
        marginBottom: 10,
    }, 
    itemIcon: {
        flex:1,
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 5,
        justifyContent: 'space-between',
        alignSelf: 'center',
    },
    itemIconEdit: {
        flex:1,
        flexDirection: 'row',
        marginLeft:50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    icon: {
        flex:1,
        padding:10,
    },
});

export const reminderStyles = StyleSheet.create({
    reminder: {
        marginLeft: '5%',
        marginBottom: 5,
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
        alignItems:'center',
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
        paddingVertical: '5%'
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

export const galleryStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    imageContainerStyle: {
      flex: 1,
      flexDirection: 'column',
      margin: 2,
    },
    imageStyle: {
      height: 120,
      width: '100%',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    fullImageStyle: {
      flex: 1,
      marginBottom: 70,
      width: '80%',
      resizeMode: 'contain',
    },
    imageButtons: {
        height: '10%',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
    },
    buttonStyle: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        marginVertical: 20,
        width: '50%',
        alignSelf: 'center',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        elevation: 3
    },
    card: {
        width: '90%',
        backgroundColor: 'white',
        marginTop: '5%',
        elevation: 5,
    },
    title: {
        width: '100%',
        backgroundColor:'#ffffff'
    },
    form: {
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    formRadio: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingBottom: 15,
    },
    inputs: {
        width: '90%',
        paddingBottom: 3,
    },  
    input: {
        marginBottom: 20,
        width: '100%',
        backgroundColor:'#ffffff'
    },
    picker:{
        marginBottom: 20,
        width: '100%',
        backgroundColor:'#ffffff',
        borderColor:'#737373',
        borderWidth:1,
        borderRadius:5
    },
    buttonUpload: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#b36cac'
    },
    publish: {
        alignSelf: 'flex-end',
        marginRight: 30,
        paddingVertical: 10,
    }
});

export const profileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingBottom: '5%',
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    card: {
        width: '40%',
        backgroundColor: '#ffffff',
        marginTop: '5%',
        elevation: 5,
        alignContent: 'flex-start',
    },
    cardWidth: {
        width: '90%',
        backgroundColor: '#ffffff',
        marginTop: '5%',
        elevation: 5,
        alignContent:'flex-start',
    },
    avatar: {
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        marginTop: 30,
    },
    label: {
        paddingVertical: 10,
        paddingLeft: 10,
        color: '#808080',
        fontSize: 10,
    },
    labelEdit: {
        paddingVertical: 10,
        paddingLeft: 10,
        color: '#808080',
        fontSize: 16,
    },
    text: {
        paddingHorizontal: 15,
        paddingVertical: 15,
    },
    textEdit: {
        paddingLeft: 15,
        paddingVertical: 15,
        color:"#b36cac",
        fontSize: 16,
    },
    button2: {
        width:50,
        alignSelf: 'center',
    },
    button: {
        borderRadius: 30,
        backgroundColor: '#b36cac',
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '65%',
        marginTop: '-10%',
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    inlineButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    inlineEdit: {
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    right: {
        alignSelf: 'flex-end',
        marginHorizontal: 30,
    },
    buttonLogout: {
        marginTop: 15,
        width: '80%',
        alignSelf: 'center',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#b36cac',
    },
});

export const calendarStyles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    divider: {
        marginBottom: 20,
    },
});