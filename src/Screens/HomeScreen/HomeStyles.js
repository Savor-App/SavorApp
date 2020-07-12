import Colors from "../../Themes/Colors";

const styles ={
    container:{
        flex: 1,
        justifyContent:'flex-start',
        overflow:'hidden'
    },
    drawerIcon:{
        // justifyContent:'center',
        marginHorizontal:10,
        marginTop:10,
        // backgroundColor:Colors.gray
    },
    map:{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    sourceSearchBar:{
        marginLeft:10,
        flex:8,
        overflow:'hidden',
        marginTop:-5,
        // backgroundColor:Colors.gray
    },
    sourceSearchBarContainer:{
        backgroundColor: Colors.white,
        marginTop: 10,
        padding: 10,
        marginHorizontal:10,
        flexDirection:'row',
        height:63,
        // overflow:'visible'
    },
    sourceSearchInput:{
        backgroundColor:Colors.white,
        position:'absolute',
        top:40,
        // overflow:'visible',
        // height:200
    },
    googlePlacesAutocomplete:{
        textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },
        textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
        },
        predefinedPlacesDescription: {
            color: '#1faadb',
        },
    },
    coordinatesAndAddressContainer:{
        marginHorizontal:10,
        padding:10,
        justifySelf:'flex-end',
        elevation:1
    },


};

export default styles;