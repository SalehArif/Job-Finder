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

} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

const Registeration = () => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [repeatpass, setrepeatpass] = React.useState("");
  const [type, settype] = React.useState("Employee");

  const postdata = () => {
    if (password === repeatpass) {
      var requestopt = {
        method: "POST",
        body: JSON.stringify({
          email: email,
          pass: password,
        }),
      };
      if (type == "Employee") {
        fetch(
          "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json",
          requestopt
        )
          .then((response) => response.json)
          .then((result) => {
            console.log(result);
            alert("User Successfully created");
          })
          .catch((error) => console.log("error : ", error));
      } else if (type == "Employer") {
        fetch(
          "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers.json",
          requestopt
        )
          .then((response) => response.json)
          .then((result) => {
            console.log(result);
            alert("Employer Successfully created");
          })
          .catch((error) => console.log("error : ", error));
      }
    } else {
      alert("repeat pass does not match");
    }
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
      <Text style={stylesheet.heading}>Sign Up</Text>
      <TouchableOpacity
        onPress={() => {
          type == "Employee" ? settype("Employer") : settype("Employee");
        }}
      >
        <Text style={{ fontSize: 40, color: "black", marginBottom: 40 }}>
          {type}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setemail(val);
        }}
        placeholder="e-mail"
      />
      <TextInput
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setpassword(val);
        }}
        placeholder="password"
      />
      <TextInput
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setrepeatpass(val);
        }}
        placeholder="repeat password"
      />
      <TouchableOpacity
        onPress={() => {
          postdata();
        }}
      >
        <Text
          style={[
            stylesheet.button_initial,
            { backgroundColor: "#1C58F2", color: "#ffff" },
          ]}
        >
          Sign up
        </Text>
      </TouchableOpacity>
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
    for (key in data) {
      console.log(data[key].email);

      if (data[key].email == email) {
        if (data[key].pass == password) {
          alert("Authenticated");
          storeData({
            user_id: key,
            email: data[key].email,
            pass: data[key].pass,
          });
          route.params.changeloginstate(true);
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
      >
        <Text style={{ fontSize: 40, color: "black", marginBottom: 40 }}>
          {type}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={[stylesheet.input]}
        onChangeText={(val) => {
          setemail(val);
        }}
        placeholder="e-mail"
      />
      <TextInput
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
const UserDashboard = ({ navigation }) => {
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
      <Text>NAME: {userdata.email}</Text>
      <Text>Password: {userdata.pass}</Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("JobPosting");
        }}
      >
        <Text
          style={[
            stylesheet.button_initial,
            { backgroundColor: "orange", color: "white" },
          ]}
        >
          Post Data
        </Text>
      </TouchableOpacity>
    </View>
  );
};





const JobPosting = () => {
  const [jobtype, setjobtype] = React.useState("Remote");

  return (
    <View style={stylesheet.container}>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text style={stylesheet.heading}>Company: </Text>
        <Text >Image Here</Text>
      </View>
      <ScrollView style={{ width: 350, }}>
        <Text style={stylesheet.textinputheading}>JOB TYPE:</Text>
        <Picker
          selectedValue={jobtype}
          style={{ height: 80, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setjobtype(itemValue)}
        >
          <Picker.Item label="Remote" value="Remote" />
          <Picker.Item label="Full-Time" value="FullTime" />
        </Picker>

        <Text style={stylesheet.textinputheading}>Salary Range: </Text>
        <TextInput placeholder="$0 - $6000 " style={stylesheet.input} />
        <Text style={stylesheet.textinputheading}>Job Heading: </Text>
        <TextInput placeholder="Java Developer" style={stylesheet.input} />
        <Text style={stylesheet.textinputheading}>Description: </Text>
        <TextInput multiline
          numberOfLines={4} placeholder=" description ..." style={[stylesheet.input, { width: 300, height: 300 }]} />

        <Text style={stylesheet.textinputheading}>Required Qualification: </Text>
        <TextInput multiline
          numberOfLines={4} placeholder=" description ..." style={[stylesheet.input, { width: 300, height: 300 }]} />
        <Text style={stylesheet.textinputheading}>Responsibilities: </Text>
        <TextInput multiline
          numberOfLines={4} placeholder=" description ..." style={[stylesheet.input, { width: 300, height: 300 }]} />

      </ScrollView>


      <TouchableOpacity
        onPress={() => {
        }}
      >
        <Text
          style={[
            stylesheet.button_initial,
            { backgroundColor: "#42EAB7", color: "#344161" },
          ]}
        >
          POST JOB
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const App = () => {
  const [isloggedin, setloggedin] = React.useState(false);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@loggedin_user");
      if (value !== null) {
        const data = await JSON.parse(value);
        setloggedin(true)
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
            initialParams={{ changeloginstate: setloggedin }}
          />
        </Stack.Navigator>
      )}
      {isloggedin && (
        <Stack.Navigator initialRouteName="UserDashboard">
          <Stack.Screen name="UserDashboard" component={UserDashboard} />
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
    borderRadius: 30,
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
    textAlignVertical: 'top'

  },
  textinputheading: {
    fontSize: 30,

  }
});

export default App;
