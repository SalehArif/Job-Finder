import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text, ScrollView } from 'react-native';
import {
    Chip,
    ListItem,
    Icon,
    Avatar,
    SearchBar,
    Divider,
    Badge,
} from 'react-native-elements';
import Constants from 'expo-constants';

const Jobs = () => {
    const [search, setSearch] = useState('');

    const updateSearch = (search) => {
        setSearch(search);
    };

    const list = [
        {
            title: 'Java Dev',
            company: 'JavTech',
            subtitle:
                '*Job description/ summary goes here* Big text to demonstrate how the description will be viewed when the time comes.',
            icon: 'briefcase',
            salary: '$600-800',
            addon: ['Full time', 'Office'],
        },
        {
            title: 'Senior Designer',
            company: 'AzTax',
            subtitle: 'Big text, lorem ipsum idk.',
            icon: 'briefcase',
            salary: '$1000-1100',
            addon: ['Contractual', 'WFH'],
        },
        {
            title: 'React Dev',
            company: 'Protip',
            subtitle:
                'Big text, lorem ipsum idk. tis and twat etc ya know. we bangin our UI.',
            icon: 'briefcase',
            salary: '$800-1000',
            addon: ['Remote', 'WFH'],
        },
        {
            title: 'React Dev',
            company: 'Protip',
            subtitle:
                'Big text, lorem ipsum idk. tis and twat etc ya know. we bangin our UI.',
            icon: 'briefcase',
            salary: '$800-1000',
            addon: ['Remote', 'WFH'],
        },
    ];

    const render = ({ item, index }) => {
        const decreaseSize = () => {
            const a = item.subtitle.substr(0, 84);
            var dot = a.lastIndexOf('.');
            if (dot === -1) return a;
            else return a.substr(0, dot + 1);
        };

        return (
            <View style={{ marginLeft: 0, flex: 1 }}>
                <ListItem>
                    <Icon name={item.icon} type="font-awesome" color="#05a" />
                    <ListItem.Content>
                        <ListItem.Title style={{ fontSize: 18.8, fontWeight: 'bold' }}>
                            {item.title}
                        </ListItem.Title>
                        <ListItem.Subtitle style={{ height: 20 }}>
                            by {item.company}
                        </ListItem.Subtitle>
                        <View style={{ flex: 1 }}>
                            <ListItem.Subtitle
                                style={{ height: 100, textAlign: 'left', marginTop: 10 }}>
                                {decreaseSize()}
                            </ListItem.Subtitle>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {item.addon.map((val) => (
                                    <Badge
                                        value={val}
                                        status="primary"
                                        containerStyle={{
                                            alignSelf: 'flex-start',
                                            paddingRight: 5,
                                        }}
                                    />
                                ))}
                            </View>
                        </View>
                    </ListItem.Content>
                    <View>
                        <Chip
                            title="Apply"
                            type="outline"
                            containerStyle={{ marginVertical: 5 }}
                            onPress={() => {
                                console.log('Apply to job, send user, employer and job id');
                            }}
                        />
                        <Chip
                            title="Compare"
                            type="outline"
                            containerStyle={{ marginVertical: 5 }}
                            onPress={() => {
                                console.log('Navigate to job comparison');
                            }}
                        />
                        <Text>{item.salary}</Text>
                    </View>
                </ListItem>
                <Divider width={2} style={{ width: 295 }} />
            </View>
        );
    };

    const keyExtractor = (item, index) => index.toString();

    return (
        <View style={styles.container}>
            <ScrollView>

                <Avatar
                    size={64}
                    rounded
                    icon={{
                        name: 'person',
                        type: 'material',
                        color: '#05a',
                    }}
                    containerStyle={{
                        borderColor: 'grey',
                        borderStyle: 'solid',
                        borderWidth: 3,
                        alignSelf: 'flex-start',
                        marginLeft: 15,
                    }}
                />
                <SearchBar
                    placeholder="Search Jobs"
                    onChangeText={updateSearch}
                    value={search}
                    lightTheme
                    round
                    containerStyle={{
                        borderRadius: 20,
                        padding: 4,
                        margin: 10,
                        width: 320,
                    }}
                    inputContainerStyle={{ backgroundColor: '#333' }}
                />
                <FlatList data={list} renderItem={render} keyExtractor={keyExtractor} />

            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight - 25,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
});

export default Jobs;
