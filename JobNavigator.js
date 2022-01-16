import React from "react";


import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Jobs from "./components/jobs_display";
import Details from "./components/Job_details";
import JobCompare from "./JobCompare";
import Bookmarks from "./components/bookmarks";
const Stack = createNativeStackNavigator();

const JobsNavigator = ({ route }) => {
    return (
        <Stack.Navigator initialRouteName="JobListing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="JobListing" component={Jobs} initialParams={{ isEmployee: route.params.isEmployee }} />
            <Stack.Screen name="JobDetails" component={Details} />
            <Stack.Screen name="Job Comparison" component={JobCompare} />
            <Stack.Screen name="Bookmarks" component={Bookmarks} />

        </Stack.Navigator>
    )
}

export default JobsNavigator;