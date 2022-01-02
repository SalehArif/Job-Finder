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

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import JobPosting from "./Posting";
import UserNavigator from "./UserDashboard";
import Registeration from "./Registeration";
import EmployerNavigator from "./EmployerNavigator";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createNativeStackNavigator();

const InitialScreen = ({ navigation }) => {
  return (
    <View
      style={{
        backgroundColor: "#1C58F2",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* //image view */}
      <View style={{ marginBottom: 100 }}>
        <Image source={require("./assets/guy_using_comp.png")}></Image>
      </View>

      <View>
        <Text style={{ fontSize: 40, color: "white", marginBottom: 100 }}>
          Job Finder
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text
            style={[
              stylesheet.button_initial,
              { backgroundColor: "#42EAB7", color: "#344161" },
            ]}
          >
            Register Now
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={[
              stylesheet.button_initial,
              { backgroundColor: "#1A1928", color: "white" },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Login = ({ route }) => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [type, settype] = React.useState("Employee");

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@loggedin_user", JSON.stringify(value));
    } catch (e) {
      console.log(`error ${e}`);
    }
  };

  const getdata = async () => {
    if (type == "Employee") {
      const res = await fetch(
        "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json"
      );
      const data = await res.json();
      console.log(data);
      return data;
    } else if (type == "Employer") {
      const res = await fetch(
        "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers.json"
      );
      const data = await res.json();
      console.log(data);
      return data;
    }
  };
  const authenticate = async () => {
    const data = await getdata();
    for (let key in data) {
      // console.log(JSON.stringify(tomerge));

      if (data[key].email == email) {
        if (data[key].pass == password) {
          alert("Authenticated");
          let a= {
            user_id:key
          }
          let merged = Object.assign(data[key],a);
          storeData(merged);
          route.params.changeloginstate(true);

          //showing different screen for employer
          type == "Employee"
            ? route.params.changeisEmployee(true)
            : route.params.changeisEmployee(false);

          return;
        } else {
          alert("pasword does not match");
          return;
        }
      }
    }
    alert("Email address does not found");
    return;
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={stylesheet.heading}>Login</Text>
      <TouchableOpacity
          onPress={() => {
            type == "Employee" ? settype("Employer") : settype("Employee");
          }}
          style={{flexDirection:'row'}}
        >
          <Ionicons
            name={"chevron-back-circle-outline"}
            size={50}
            
          />
          <Text style={{ fontSize: 40, color: "black", marginBottom: 40 }}>
            {type}
          </Text>
          <Ionicons
            name={"chevron-forward-circle-outline"}
            size={50}
          />
        </TouchableOpacity>
      <TextInput
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setemail(val);
        }}
        placeholder="e-mail"
      />
      <TextInput
        secureTextEntry={true}
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setpassword(val);
        }}
        placeholder="password"
      />

      <TouchableOpacity
        onPress={() => {
          authenticate();
        }}
      >
        <Text
          style={[
            stylesheet.button_initial,
            { backgroundColor: "#1C58F2", color: "#ffff" },
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

//toremove
const FirebaseCheck = () => {
  const postdata = () => {
    //-------------------
    var requestopt = {
      method: "POST",
      body: JSON.stringify({
        emp_email: "newasd@mail.com",
        emp_pass: "testing123",
      }),
    };

    //-------------------

    fetch(
      "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json",
      requestopt
    )
      .then((response) => response.json)
      .then((result) => console.log(result))
      .catch((error) => console.log("error : ", error));
  };

  const getdata = async () => {
    const res = await fetch(
      "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json"
    );
    const data = await res.json();
    console.log(data);
  };
  return (
    <View>
      <Button
        title="Get Data"
        onPress={() => {
          getdata();
        }}
      />
      <Button
        title="POST Data"
        onPress={() => {
          postdata();
        }}
      />
    </View>
  );
};

const App = () => {
  const [isloggedin, setloggedin] = React.useState(false);
  const [isEmployee, setisEmployee] = React.useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@loggedin_user");
      if (value !== null) {
        const data = await JSON.parse(value);
        setloggedin(true);
      } else {
        setloggedin(false);
      }
    } catch (e) {
      console.log(`error : ${e}`);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <NavigationContainer>
      {!isloggedin && (
        <Stack.Navigator initialRouteName="Homee">
          {/* <Stack.Screen  name = "Firebase" component={FirebaseCheck} /> */}
          <Stack.Screen name="Homee" component={InitialScreen} />
          <Stack.Screen name="Register" component={Registeration} />
          <Stack.Screen
            name="Login"
            component={Login}
            initialParams={{
              changeloginstate: setloggedin,
              changeisEmployee: setisEmployee,
            }}
          />
        </Stack.Navigator>
      )}
      {isloggedin && isEmployee && (
        <Stack.Navigator initialRouteName="UserDashboard">
          <Stack.Screen
            name="UserDashboard"
            component={UserNavigator}
            initialParams={{ changeloginstate: setloggedin }}
          />
        </Stack.Navigator>
      )}

      {isloggedin && !isEmployee && (
        <Stack.Navigator initialRouteName="EmployerDashboard">
          <Stack.Screen
            name="EmployerDashboard"
            component={EmployerNavigator}
            initialParams={{ changeloginstate: setloggedin }}

          />
          <Stack.Screen name="JobPosting" component={JobPosting} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
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
    height: 60,
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
    marginBottom: "10%",
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
});

export default App;
