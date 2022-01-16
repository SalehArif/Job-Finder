import * as React from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import {
    Chip,
    ListItem,
    Icon,
    Avatar,
    Divider,
    Badge,
} from "react-native-elements";
const Bookmarks = ({ route, navigation }) => {
    const [jobs, setjobs] = React.useState([])
    const getData = async () => {
        try {

            var response = await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Bookmarks.json", {
                method: "GET"
            })
            var data = await response.json()
            var array = Object.keys(data).map((key) => data[key]);
            array = array.filter(val => val.user_id == route.params.user)
            console.log(array)

            var jobss = await fetch("https://jobfinder-80af8-default-rtdb.firebaseio.com/Jobs.json")
            var jobData = await jobss.json()
            var array1 = Object.keys(jobData).map((key) => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].job_id === key)
                        return jobData[key]
                }
                // jobData[key]
                return null
            });

            array1 = array1.filter(val => val !== null)
            console.log(array1)
            setjobs(array1)
        } catch (error) {

        }
    }

    const render = ({ item, index }) => {
        const decreaseSize = () => {
            const a = item.job_description.substr(0, 84);
            var dot = a.lastIndexOf(".");
            if (dot === -1) return a;
            else return a.substr(0, dot + 1);
        };

        return (
            <>
                <View style={{ marginLeft: 0, flex: 0.5, margin: 10 }}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("JobDetails", {
                                job_deets: item,
                                user_id: route.params.user,
                                typeofuser: "Employee"
                            });
                        }}
                    >
                        <ListItem>
                            {item.companylogo !== undefined ? (
                                <Image
                                    style={styles.avatar}
                                    source={{ uri: item.companylogo }}
                                />
                            ) : (
                                <Icon name={"briefcase"} type="font-awesome" color="#05a" />
                            )}
                            <ListItem.Content>
                                <ListItem.Title style={{ fontSize: 18.8, fontWeight: "bold" }}>
                                    {item.job_title.substr(0, 28)}
                                </ListItem.Title>
                                <ListItem.Subtitle style={{ height: 20 }}>
                                    by{" "}
                                    {item.company_name === undefined
                                        ? item.company
                                        : item.company_name}
                                </ListItem.Subtitle>
                                <View style={{ flex: 1 }}>
                                    <ListItem.Subtitle
                                        style={{ height: 100, textAlign: "left", marginTop: 10 }}
                                    >
                                        {decreaseSize()}
                                    </ListItem.Subtitle>
                                    <View style={{ flex: 1, flexDirection: "row" }}>

                                        <Badge
                                            value={item.is_remote ? "Remote" : "Full time"}
                                            status="primary"
                                            containerStyle={{
                                                alignSelf: "flex-start",
                                                paddingRight: 5,
                                                marginTop: 20,
                                            }}
                                        />
                                    </View>
                                </View>
                            </ListItem.Content>
                            <View>
                                <Chip
                                    title="Apply"
                                    type="outline"
                                    containerStyle={{ marginVertical: 5 }}
                                    onPress={() => {
                                        if (item.url !== undefined)
                                            WebBrowser.openBrowserAsync(item.url);
                                        else {
                                            apply(item);
                                            ToastAndroid.show("Applied To Job", ToastAndroid.SHORT)
                                        }
                                    }}
                                />
                                <Text style={{ marginLeft: 20 }}>
                                    {item.job_salary === null ? "N/A" : item.job_salary}
                                </Text>
                            </View>
                        </ListItem>
                    </TouchableOpacity>
                </View>
                <Divider width={2} style={{ width: 295 }} />
            </>
        );
    };
    const keyExtractor = (item, index) => index.toString();

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <View style={styles.container}>
            <Avatar
                size={64}
                rounded
                icon={{
                    name: "person",
                    type: "material",
                    color: "#05a",
                }}
                containerStyle={{
                    borderColor: "grey",
                    borderStyle: "solid",
                    borderWidth: 3,
                    alignSelf: "flex-start",
                    marginVertical: 20,
                    marginLeft: 15,
                    // marginRight: 150
                }}
            />
            <Divider width={2} style={{ width: 295 }} />
            <FlatList data={jobs} renderItem={render} keyExtractor={keyExtractor} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        padding: 8,
        backgroundColor: "white",
        textAlign: "center"
    },
    avatar: {
        width: 40,
        height: 40,
    },
});

export default Bookmarks