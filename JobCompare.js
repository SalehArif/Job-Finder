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
import { getTotalDiskCapacityAsync } from "expo-file-system";

const JobCompare = ({route}) => {
  const [job1, setjob1] = React.useState(route.params.job1);
  const [job2, setjob2] = React.useState(route.params.job2);
  const [job1img, setjob1img] = React.useState(route.params.job1.companylogo);
  const [job2img, setjob2img] = React.useState(route.params.job2.companylogo);

  const getData = async () => {
    const job1id = "-Msa__ibh3Y_7og8KukJ";
    const job2id = "-Msa_oJ_4SxNh7ldwiWY";

    const res1 = await fetch(
      `https://jobfinder-80af8-default-rtdb.firebaseio.com/Jobs/${job1id}.json`
    );
    const data = await res1.json();
    console.log(data);
    setjob1(data);
    const res2 = await fetch(
      `https://jobfinder-80af8-default-rtdb.firebaseio.com/Jobs/${job2id}.json`
    );
    const data2 = await res2.json();
    console.log(data2);
    setjob2(data2);
  };

  const getImg = async () => {
    const res1 = await fetch(
      `https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers/${job1.postedby}/companylogo.json`
    );
    const data = await res1.json();
    console.log("image============================");
    console.log(data);
    setjob1img(data);

    // const res1=await fetch(`https://jobfinder-80af8-default-rtdb.firebaseio.com/Employers/-MsaQOLxF2-xcDsAv3X7/companylogo.json`)
    // const data = await res1.json();
    // console.log(data);
    setjob2img(data);
  };
  React.useEffect(async () => {
    // getData();
    // getImg();
  }, []);

  return (
    <ScrollView>
      <View style={{ flexDirection: "row" }}>
        {/* left panel */}
        <View style={{ height: "100%", width: "50%" }}>
          <View >
          <Ionicons name="arrow-back" size={30} style={{marginLeft:'85%'}}/>
            <Text style={[stylesheet.keyheading,{color:'black',fontStyle:'italic'}]}>{job1!==undefined || job1!==null ?job1.job_title:"unknown"}</Text>
          </View>

          <Image
            source={{ uri: job1img }}
            style={stylesheet.Image}
          />

          {job1 !== undefined ? (
            Object.entries(job1).map(([key, value]) => 
            
            key!=="companylogo" &&(
              <View style={{backgroundColor:'#4cacc7'}}>
                <Text style={[stylesheet.keyheading,{backgroundColor:'#60c4e2'}]}>{key}</Text>
                <Text style={[stylesheet.keyvalue]} >{value}</Text>
              </View>
            ))
          ) : (
            <></>
          )}
          {/* <Text>asd</Text> */}
        </View>


        {/* right panel */}
        <View
          style={{ height: "100%", width: "50%" }}
        >
          <View >
          <Ionicons name="arrow-forward" size={30} />
            <Text style={[stylesheet.keyheading,{color:'black',fontStyle:'italic'}]}>{job2!==undefined || job2!==null ?job2.job_title:"unknown"}</Text>
          </View>

          <Image
            source={{ uri: job2img }}
            style={stylesheet.Image}
          />

          {job2 !== undefined ? (
            Object.entries(job2).map(([key, value]) => 
            
            key!=="companylogo" && (
              
              <View style={{backgroundColor:'#c4c436',flex:1,}}>
                <Text style={[stylesheet.keyheading,{backgroundColor:'#dada44'}]}>{key}</Text>
                <Text style={[stylesheet.keyvalue,{flex:1}]}>{value}</Text>
              </View>
                
            )
            )
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
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
  Image:{
    width: 150,
    height: 150,
    backgroundColor: "#e9e9e9",
    borderRadius:30,
    marginBottom:10,
    alignSelf:'center'
  },
  keyheading: {
    width: "100%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 20,
    marginBottom: "10%",
    color: "#fff",
  },
  keyvalue: {
    width: "100%",
    flexWrap: "wrap",

    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 15,
    marginBottom: "10%",
    color: "#fff",
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

export default JobCompare;
