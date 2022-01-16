import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ToastAndroid } from "react-native";
import { Avatar, Icon, FAB } from 'react-native-elements'
import * as WebBrowser from 'expo-web-browser';

const Details = ({ route }) => {
    const job_deets = route.params.job_deets
    const user = route.params.user_id

    const bookmark = async () => {
        try {
            await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Bookmarks.json", {
                method: "POST",
                body: JSON.stringify({
                    user_id: user,
                    job_id: job_deets.job_id
                })
            })
        } catch (error) {
            console.log(error)
        }
    }

    const apply = async () => {
        await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Applications.json", {
            method: "POST",
            body: JSON.stringify({
                user_id: user,
                job_id: job_deets.job_id,
                company_id: job_deets.postedby
            })
        })
            .then(response => console.log("Added Application"))
            .catch(error => console.error(error))

    }
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={{ backgroundColor: "white", marginTop: 10, padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        {job_deets.companylogo !== undefined ?
                            (
                                <>
                                    <Avatar
                                        size={64}
                                        rounded
                                        source={{ uri: job_deets.companylogo }}
                                        containerStyle={{ borderWidth: 2, borderColor: "#555", padding: 3 }}
                                    />
                                    <Icon
                                        raised
                                        name='heart'
                                        type='font-awesome'
                                        color='#f50'
                                        size={13}
                                        onPress={() => { bookmark(); ToastAndroid.show("Added Bookmark", ToastAndroid.SHORT); }} />
                                </>
                            )
                            :
                            <Avatar
                                size={64}
                                rounded
                                icon={{ name: 'apartment', type: 'material', color: '#009688' }}
                                containerStyle={{
                                    borderColor: 'grey',
                                    borderStyle: 'solid',
                                    borderWidth: 1,
                                }}
                            />
                        }
                    </View>
                    <Text style={{ fontSize: 30, fontWeight: "bold", marginTop: 10 }}>
                        {job_deets.job_title}
                    </Text>
                    <Text style={{ fontSize: 15 }}>
                        by {job_deets.company_name === undefined ? job_deets.company : job_deets.company_name}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", backgroundColor: "white", padding: 20, marginTop: 10 }}>
                    <View style={{ marginRight: 100 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                            Salary
                        </Text>
                        <Text style={{ fontSize: 14, paddingHorizontal: 5 }}>
                            {job_deets.job_salary === null ? "N/A" : job_deets.job_salary}
                        </Text>
                    </View>
                    <View>
                        <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                            Job Type
                        </Text>
                        <Text style={{ fontSize: 14, backgroundColor: "grey", color: "white", borderRadius: 20, paddingHorizontal: 15 }}>
                            {job_deets.jobtype || (job_deets.is_remote ? "Full time" : "Remote")}
                        </Text>
                    </View>
                </View>
                {job_deets.responsibilities === undefined ? (
                    <View style={{ backgroundColor: "white", padding: 20, marginTop: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>  Job Description </Text>
                        <Text >  {job_deets.job_description} </Text>
                    </View>
                ) : (
                    <>
                        <View style={{ backgroundColor: "white", padding: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>  Job Description </Text>
                            <Text >  {job_deets.job_description} </Text>
                        </View>
                        <View style={{ backgroundColor: "white", padding: 20, marginTop: 10 }}>
                            <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>  Roles and Responsibilities </Text>
                            <Text >  {job_deets.responsibilities} </Text>
                        </View>
                    </>
                )}
                {job_deets.qualification !== undefined ? (
                    <View style={{ backgroundColor: "white", padding: 20, marginTop: 10, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}>
                        <Text style={{ fontSize: 15, fontWeight: "bold", marginBottom: 10 }}>  Qualifications </Text>
                        <Text >  {job_deets.qualification} </Text>
                    </View>
                ) : null}
            </ScrollView>
            {
                route.params.typeofuser == "Employee" &&
                <FAB
                    visible={true}
                    onPress={() => {
                        if (job_deets.url === undefined) {
                            apply()
                            ToastAndroid.show("Applied To Job", ToastAndroid.SHORT)
                        }
                        else
                            WebBrowser.openBrowserAsync(job_deets.url)
                    }}
                    placement="right"
                    title="Apply Now"
                    color="#05d"
                />
            }

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: '#ecf0f1',
        // justifyContent: 'center',
        // textAlign: 'center',
    },
});
export default Details;