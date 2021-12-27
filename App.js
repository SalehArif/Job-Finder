import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button
} from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

const InitialScreen = ({navigation}) => {
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
         onPress={()=>{navigation.navigate('Register')}} 
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#42EAB7',color:'#344161'}]}>Register Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=>{navigation.navigate('Login')}} 
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#1A1928',color:'white'}]}>Login</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const Registeration = ()=>{
  const [email,setemail]=React.useState('');
  const [password,setpassword] = React.useState('');
  const [repeatpass,setrepeatpass] = React.useState('');
  const [type,settype]=React.useState('Employee');
  
  const postdata = ()=>{
    if(password===repeatpass)
    {
      var requestopt = {
        method:"POST",
        body:JSON.stringify({  
          emp_email:email,
          emp_pass:password,

          },
        )
      };
      fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json",requestopt)
      .then((response)=>response.json)
      .then((result)=>{
        console.log(result)
        alert("User Successfully created");
      })
      .catch((error)=>console.log('error : ',error));
    }
    else
    {
      alert("repeat pass does not match");
    }
  }

  return (
    <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
      <Text style={stylesheet.heading}>Sign Up</Text>
      <TouchableOpacity
      onPress={()=>{type=="EMPLOYEE"?settype('EMPLOYEER'):settype("EMPLOYEE")}}
      
      >
        <Text style={{fontSize:40,color:'black',marginBottom:40}}>{type}</Text>
      </TouchableOpacity>
      <TextInput style={[stylesheet.input]} onChangeText={(val)=>{setemail(val)}} placeholder="e-mail" />
      <TextInput style={[stylesheet.input]} onChangeText={(val)=>{setpassword(val)}} placeholder="password" />
      <TextInput style={[stylesheet.input]} onChangeText={(val)=>{setrepeatpass(val)}} placeholder="repeat password" />
      <TouchableOpacity
        onPress={()=>{
          postdata();
        }}
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#1C58F2',color:'#ffff'}]}>Sign up</Text>
        </TouchableOpacity>
    </View>
  )
}

const Login = ()=>{
  const [email,setemail]=React.useState('');
  const [password,setpassword] = React.useState('');
  
  const getdata = async ()=>{
    const res  = await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json")
    const data = await res.json();
    return data;
  }
  const authenticate = async ()=>{
    const data =await  getdata();
    for ( key in data)
    {
      if (data[key].emp_email==email)
      {
        if( data[key].emp_pass==password)
        {
          alert("Authenticated");
        }
        else
        {
          alert("pasword does not match");
        }
      }
      
    }
  }
  
  return (
    <View style={{width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
      <Text style={stylesheet.heading}>Login</Text>
      <TextInput style={[stylesheet.input]} onChangeText={(val)=>{setemail(val)}} placeholder="e-mail" />
      <TextInput style={[stylesheet.input]} onChangeText={(val)=>{setpassword(val)}} placeholder="password" />
      
      <TouchableOpacity
         onPress={()=>{
          authenticate();
         }}
        >
          <Text style={[stylesheet.button_initial,{backgroundColor:'#1C58F2',color:'#ffff'}]}>Login</Text>
        </TouchableOpacity>
    </View>
  )
}


//toremove
const FirebaseCheck = () =>{


  const postdata = ()=>{
    var requestopt = {
      method:"POST",
      body:JSON.stringify({  
        emp_email:'newasd@mail.com',
        emp_pass:'testing123',

        },
      )
    };
    fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json",requestopt)
    .then((response)=>response.json)
    .then((result)=>console.log(result))
    .catch((error)=>console.log('error : ',error));
  }

  const getdata = async ()=>{
    const res  = await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json")
    const data = await res.json();
    console.log(data);
  }
  return(
    <View>
      <Button title="Get Data" onPress={()=>{getdata()}} />
      <Button title="POST Data" onPress={()=>{postdata()}} />
    </View>
  )
}
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Homee">
    {/* <Stack.Screen  name = "Firebase" component={FirebaseCheck} /> */}
      <Stack.Screen name="Homee" component={InitialScreen}  />
      <Stack.Screen name="Register" component={Registeration}  />
      <Stack.Screen name="Login" component={Login}  />
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
  heading:{
    width:250,
    height:80,
    alignItems: "center",
    justifyContent: "center",
    textAlign:'center',
    fontSize:60,
    marginBottom:150,
    color:'#bdcbe1'
  },
  input:{
    backgroundColor:'#bdcbe1',
    borderRadius:15,
    width:200,
    height:60,
    textAlign:'center',
    margin:10,
    fontSize:20,
  }

});

export default App;
