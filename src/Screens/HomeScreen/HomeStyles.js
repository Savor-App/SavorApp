import Colors from "../../Themes/Colors";
import {AppConstants} from '../../Services';
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
        borderRadius:10,
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
    bottomNavBar:{
        backgroundColor:Colors.figmaBlue,
        position:'absolute',
        bottom:0,
        height:'10%',
        width:AppConstants.SCREEN_WIDTH,
        justifyContent:'space-around',
        flexDirection:'row'
    },
    bottomNavBarButtonContainer:{
        flex:1,
        padding:10,
        // backgroundColor:Colors.gray,
        alignItems:'center',
        justifyContent:'center',
    },
    bottomNavBarButtonText:{
        color:Colors.white,
        fontSize:20,
    },
    divider:{
        width:1,
        borderLeftWidth:1,
        borderColor:Colors.white,
        marginVertical:10,
    },
    emergencyButtonContainer:{
        borderRadius:50,
        backgroundColor:Colors.white,
        width:70,
        height:70,
        position:'absolute',
        bottom:0,
        alignSelf:'center',
        marginBottom:30,
        elevation:4,
        justifyContent:'center',
        alignItems:'center',
    },
    hospitalsHeadingTextContainer:{
        backgroundColor:Colors.figmaBlue,
        width:'100%'
    },
    hospitalsHeadingText:{
        color:Colors.white,
        textAlign:'center',
        marginVertical:10,
        fontSize:20,
    },
    hospitalListItemContainer:{
        backgroundColor:Colors.accent,
        // width:AppConstants.SCREEN_WIDTH,
        marginVertical:10,

    }

};

export default styles;