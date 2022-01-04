import React, { useEffect } from "react";
import {
  View,
  
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Picker,
  ScrollView,
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, useTheme, Text, Icon } from "react-native-elements";


const JobPosting = ({navigation,route}) => {
  const [userdata,setuserdata]=React.useState("");
  const [jobtype, setjobtype] = React.useState("Remote");
  const [salary,setsalary] = React.useState(0);
  const [jobheading,setjobheading] = React.useState("");
  const [description,setdescription] = React.useState("");
  const [qualification,setqualification] =React.useState("");
  const [responsibilities,setresponsibilities] =React.useState("");
  const { theme } = useTheme();
  

  const AddDatatofirebase = () => {
    var requestopt = {
      method: "POST",
      body: JSON.stringify({
          postedby:route.params.id,
        jobtype:jobtype,
        job_salary:salary,
        job_title:jobheading,
        job_description:description,
        qualification:qualification,
        responsibilities:responsibilities,
      }),
    };
    fetch(
      "https://jobfinder-80af8-default-rtdb.firebaseio.com/Jobs.json",
      requestopt
    )
      .then((response) => response.json)
      .then((result) => {
        console.log(result);
        alert("Job Posted Successfully");
        navigation.goBack();
      })
      .catch((error) => console.log("error : ", error));
  };

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
    <View style={stylesheet.container}>
      <View style={{ flexDirection: "row", margin: 10 }}>
        <Text
          style={stylesheet.text}
          h2
          h2Style={{ color: theme?.colors?.primary }}
        >
          Company:
        </Text>
        <Image
              style={stylesheet.avatar}
              source={{
                uri: userdata.companylogo
              }}
            />
      </View>
      <ScrollView style={{ width: 350 }}>
        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          JOB TYPE:
        </Text>
        <Picker
          selectedValue={jobtype}
          style={{ height: 80, width: 150 }}
          onValueChange={(itemValue, itemIndex) => setjobtype(itemValue)}
        >
          <Picker.Item label="Remote" value="Remote" />
          <Picker.Item label="Full-Time" value="FullTime" />
          <Picker.Item label="Internship" value="Internship" />
          <Picker.Item label="Part-Time" value="PartTime" />
        </Picker>

        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          Salary Range:{" "}
        </Text>
        <TextInput placeholder="$0 - $6000 " style={stylesheet.input} onChangeText={setsalary}/>
        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          Job Heading:{" "}
        </Text>
        <TextInput placeholder="Java Developer" style={stylesheet.input} onChangeText={setjobheading}/>
        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          Description:{" "}
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder=" description ..."
          style={[stylesheet.input, { width: 300, height: 300 }]}
          onChangeText={setdescription}
        />

        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          Required Qualification:{" "}
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder=" description ..."
          style={[stylesheet.input, { width: 300, height: 300 }]}
          onChangeText={setqualification}
        />
        <Text style={[stylesheet.text, { color: "#5b1ed5" }]} h4>
          Responsibilities:{" "}
        </Text>
        <TextInput
          multiline
          numberOfLines={4}
          placeholder=" description ..."
          style={[stylesheet.input, { width: 300, height: 300 }]}
          onChangeText={setresponsibilities}
        />
      </ScrollView>

      <Button
        title="POST JOB"
        buttonStyle={{
          borderColor: "rgba(78, 116, 289, 1)",
          height: 60,
        }}
        type="outline"
        raised
        titleStyle={{ color: "rgba(78, 116, 289, 1)" }}
        containerStyle={{
          width: 200,
          marginHorizontal: 50,
          marginVertical: 10,
        }}
        onPress={()=>{AddDatatofirebase();}}
      />
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
    textAlignVertical: "top",
  },
  textinputheading: {
    fontSize: 30,
  },
  view: {
    margin: 10,
  },
  text: {
    padding: 5,
  },
  more: {
    marginVertical: 20,
  },
  button: {
    width: 120,
    marginLeft: "auto",
    marginRight: "auto",
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
});

export default JobPosting;
