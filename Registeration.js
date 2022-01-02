import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Button
} from "react-native";
import { Header } from "react-native-elements";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { Constants, Permissions } from 'expo';


const Registeration = ({navigation}) => {
  const [email, setemail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [repeatpass, setrepeatpass] = React.useState("");
  const [type, settype] = React.useState("Employee");
  const [error, seterror] = React.useState("");
  const [company, setcompany] = React.useState("");
  const [fullname, setfullname] = React.useState("");
  const [image,setimage]=React.useState("");
  const [formdata,setformdata]= React.useState();

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const validateFields = () => {
    console.log(mailformat.test(email));

    if (mailformat.test(email)) {
      if (password == repeatpass && password !== "") {
        if (fullname !== "")
        {
          if(type=="Employer" && company!=="")
            return true;
          else{
            seterror(`${error}\n Please Fill all fields!`);  
            return false;
          }
        }

        else{
          seterror(`${error}\n Please Fill all fields!`);  
          return false
        }
      } else {
        seterror(`${error}\n Repeat password does not match!`);
        return false;
      }
    } else {
      seterror(`${error}\n Please enter valid email! `);
      return false;
    }
  };
  const postdata = () => {
    if (validateFields()) {
      console.log("here");

      if (type == "Employee") {
        var requestopt = {
          method: "POST",
          body: JSON.stringify({
            name: fullname,
            email: email,
            pass: password,
          }),
        };

        fetch(
          "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employees.json",
          requestopt
        )
          .then((response) => response.json)
          .then((result) => {
            console.log(result);
            alert("User Successfully created");
            navigation.goBack();
          })
          .catch((error) => console.log("error : ", error));
      } else if (type == "Employer") {
        var requestopt = {
          method: "POST",
          body: JSON.stringify({
            name: fullname,
            email: email,
            pass: password,
            company: company,
            
          }),
        };
        fetch(
          "https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers.json",
          requestopt
        )
          .then((response) => response.json)
          .then((result) => {
            console.log(result);
            alert("Employer Successfully created");
            navigation.goBack();
          })
          .catch((error) => seterror("error : ", error));
      }
    }
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setimage(result.uri);
    }
  };

  const upload = async ()=>{
    let formData = new FormData();
    formData.append('photo', { uri: image, name: 'company ' });
    setformdata(formData);

  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "30%",
        }}
      >
        <Text style={stylesheet.heading}>Sign Up</Text>
        <TouchableOpacity
          onPress={() => {
            type == "Employee" ? settype("Employer") : settype("Employee");
          }}
          style={{ flexDirection: "row" }}
        >
          <Ionicons name={"chevron-back-circle-outline"} size={50} />
          <Text style={{ fontSize: 40, color: "black", marginBottom: 40 }}>
            {type}
          </Text>
          <Ionicons name={"chevron-forward-circle-outline"} size={50} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        {type == "Employer" ? (
          <>
            
           <View style={stylesheet.imageContainer}>
              <Image
                source={{uri:image}}
                style={{ width: 200, height: 200 }}
              />
              <Button title="upload" onPress={()=>pickImage()}/> 
            </View>

            <TextInput
              style={[stylesheet.input]}
              onChangeText={(val) => {
                setcompany(val);
                seterror("");
              }}
              placeholder="Company Name"
            />
          </>
        ) : (
          <></>
        )}
        <TextInput
          style={[stylesheet.input]}
          onChangeText={(val) => {
            setfullname(val);
            seterror("");
          }}
          placeholder="Full name"
        />
        <TextInput
          style={[stylesheet.input]}
          onChangeText={(val) => {
            setemail(val);
            seterror("");
          }}
          placeholder="e-mail"
        />
        <TextInput
          secureTextEntry={true}
          style={[stylesheet.input]}
          onChangeText={(val) => {
            setpassword(val);
            seterror("");
          }}
          placeholder="password"
        />
        <TextInput
          secureTextEntry={true}
          style={[stylesheet.input]}
          onChangeText={(val) => {
            setrepeatpass(val);
            seterror("");
          }}
          placeholder="repeat password"
        />
      </ScrollView>
      {error !== undefined ? (
        <Text style={{ fontSize: 20, color: "red" }}>{error}</Text>
      ) : (
        <></>
      )}
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
    borderRadius: 20,
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
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // aspectRatio: 1,
    width: "30%",
    marginBottom:"10%",
    marginTop:"10%"

  },
  input: {
    backgroundColor: "#bdcbe1",
    borderRadius: 10,
    padding: 10,
    width: 300,
    height: 60,
    margin: 10,
    fontSize: 20,
    textAlignVertical: "top",
  },
  textinputheading: {
    fontSize: 30,
  },
});

export default Registeration;
