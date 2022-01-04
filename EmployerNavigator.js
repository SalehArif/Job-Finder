import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Picker,
  ScrollView,
  ScrollViewBase,
} from "react-native";

import { Input, Icon } from "react-native-elements";

import { NavigationContainer } from "@react-navigation/native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { JobListing } from "./UserDashboard";


const Tab = createBottomTabNavigator();


const Settings = ({ navigation, route }) => {
    const [userdata, setuserdata] = React.useState(true);

    //viewing or disabling inputs
    const [emaildis, setemaildis] = React.useState(true);
    const [passdis, setpassdis] = React.useState(true);
    const [fulldis, setfulldis] = React.useState(true);
    const [securepass,setsecurepass]= React.useState(true);

    //storing data
    const [email,setemail]= React.useState();
    const [pass,setpass]= React.useState();
    const [name,setname]= React.useState();

    const updatefields = () => {
      var requestopt = {
        method: "PATCH",
        body: JSON.stringify({
          email:email,
          pass:pass,
          name:name
        }),
      };
      fetch(
        `https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers/${userdata.user_id}.json`,
        requestopt
      )
        .then((response) => response.json)
        .then((result) => {
          console.log(result);
          alert("Data Updated Successfully");
          navigation.goBack();
        })
        .catch((error) => console.log("error : ", error));
    };

    const clearAll = async () => {
      try {
        await AsyncStorage.clear();
        console.log("cleared");
        route.params.changeloginstate(false);
      } catch (e) {
        console.log(e);
      }
    };
  
    navigation.setOptions({
      headerRight: () => <Button onPress={() => clearAll()} title="Logout" />,
      headerShown: false,
    });


    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@loggedin_user");
        if (value !== null) {
          const data = await JSON.parse(value);
          setemail(data.email);
          setpass(data.pass);
          setname(data.name);
        }
      } catch (e) {
        console.log(`error : ${e}`);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <View style={stylesheet.container}>
        <Text style={[stylesheet.heading, { alignContent: "center" }]}>
          {userdata.name}
        </Text>
        <Input
          value={email}
          leftIcon={{ type: "ionicon", name: "mail" }}
          style={{ paddingLeft: 20 }}
          disabled={emaildis}
          onChangeText={setemail}
          rightIcon={
            <Ionicons
              name={"create-outline"}
              size={30}
              onPress={() => setemaildis(!emaildis)}
            />
          }
        />
        <Input
          value={pass}
          secureTextEntry={securepass}
          
          leftIcon={{ type: "ionicon", name: "lock-closed" }}
          onChangeText={setpass}
          style={{ paddingLeft: 20 }}
          disabled={passdis}
          rightIcon={
            <Ionicons
              name={"create-outline"}
              size={30}
              onPress={() => {
                  setpassdis(!passdis)
                  setsecurepass(!securepass)
                }}
            />
          }
        />
        <Input
          
          value={name}
          leftIcon={{ type: "ionicon", name: "text" }}
          style={{ paddingLeft: 20 }}
          disabled={fulldis}
          onChangeText={setname}
          rightIcon={
            <Ionicons
              name={"create-outline"}
              size={30}
              onPress={() => setfulldis(!fulldis)}
            />
          }
        />
  
        <TouchableOpacity
          onPress={() => {
            updatefields();
          }}
        >
          <Text
            style={[
              stylesheet.button_initial,
              { backgroundColor: "#2ee61a", color: "white" },
            ]}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    );
  };


const EmployerNavigator = ({ route }) => {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear();
      console.log("cleared");
      route.params.changeloginstate(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home-outline" : "home";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings-outline" : "settings";
          } else if (route.name === "JobListing") {
            iconName = "list";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={EmployeeDashboard}
        options={{
          headerRight: () => (
            <Button onPress={() => clearAll()} title="Logout" />
          ),
        }}
      />
      <Tab.Screen name="Settings" component={Settings} />
      <Tab.Screen name="JobListing" component={JobListing} />
    </Tab.Navigator>
  );
};


const EmployeeDashboard = ({ navigation, route }) => {
    const [userdata, setuserdata] = React.useState("");
  
    
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("@loggedin_user");
        if (value !== null) {
          const data = await JSON.parse(value);
          setuserdata(data);
        }
      } catch (e) {
        console.log(`error : ${e}`);
      }
    };
    useEffect(() => {
      getData();
    }, []);
    return (
      <View>
        <View>
          <View style={stylesheet.headerContent}>
            <View style={{flexDirection:'row'}}>
            <Image
              style={stylesheet.avatar}
              source={{
                uri: userdata.profilepic
              }}
            />
            <Image
              style={stylesheet.avatar}
              source={{
                uri: userdata.companylogo
              }}
            />
            </View>
  
            <Text style={stylesheet.name}>{userdata.name} </Text>
            <Text style={stylesheet.userInfo}>{userdata.email} </Text>
            <Text style={stylesheet.userInfo}>Florida </Text>
            <Text style={stylesheet.userInfo}>{userdata.company} </Text>
          </View>
        </View>
  
        <View style={stylesheet.body}>
          <ScrollView>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("JobPosting", { id: userdata.user_id });
              }}
            >
              <Text
                style={[
                  stylesheet.button_initial,
                  { backgroundColor: "orange", color: "white" },
                ]}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("JobPosting", { id: userdata.user_id });
              }}
            >
              <Text
                style={[
                  stylesheet.button_initial,
                  { backgroundColor: "orange", color: "white" },
                ]}
              >
                Post Job
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  };

  const stylesheet = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    button_initial: {
      width: 250,
      height: 40,
      fontSize: 30,
      borderRadius: 10,
      textAlign: "center",
      justifyContent: "center",
      marginBottom: 10,
      marginTop: 10,
    },
    heading: {
      width: 250,
      height: 80,
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      fontSize: 60,
      marginBottom: 100,
      color: "#bdcbe1",
    },
    input: {
      backgroundColor: "#bdcbe1",
      borderRadius: 10,
      padding: 10,
      width: 200,
      height: 60,
      margin: 10,
      fontSize: 20,
      textAlignVertical: "top",
    },
    textinputheading: {
      fontSize: 30,
    },
    header: {
      backgroundColor: "#DCDCDC",
    },
    headerContent: {
      padding: 30,
      alignItems: "center",
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 20,
      borderWidth: 4,
      borderColor: "white",
      marginBottom: 10,
      marginRight:10
    },
    name: {
      fontSize: 22,
      color: "#000000",
      fontWeight: "600",
    },
    userInfo: {
      fontSize: 16,
      color: "#778899",
      fontWeight: "600",
    },
    body: {
      backgroundColor: "#778899",
      height: 500,
      alignItems: "center",
    },
    item: {
      flexDirection: "row",
    },
    infoContent: {
      flex: 1,
      alignItems: "flex-start",
      paddingLeft: 5,
    },
    iconContent: {
      flex: 1,
      alignItems: "flex-end",
      paddingRight: 5,
    },
    icon: {
      width: 30,
      height: 30,
      marginTop: 20,
    },
    info: {
      fontSize: 18,
      marginTop: 20,
      color: "#FFFFFF",
    },
  });

export default EmployerNavigator;
