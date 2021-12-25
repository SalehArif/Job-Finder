import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const InitialScreen = () => {
  return (
    <View style={{backgroundColor:'#1C58F2',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
      
      {/* //image view */}
      <View style={{marginBottom:100,}}>
        <Image
          source={require("./assets/guy_using_comp.png")}
        ></Image>
      </View>

      <View      >
        <Text style={{fontSize:40,color:'white',marginBottom:100}}>
          Job Finder
        </Text>
      </View>
      
      <View>
        <TouchableOpacity
          
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#42EAB7',color:'#344161'}]}>Register Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#1A1928',color:'white'}]}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={InitialScreen}  />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff',
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center'
  },
  button_initial:{
    width:250,
    height:60,
    fontSize:30,
    borderRadius:30,    
    textAlign:"center",
    justifyContent:'center',
    marginBottom:10,
    


  },

});

export default App;
