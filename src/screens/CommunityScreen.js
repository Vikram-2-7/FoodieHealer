// src/screens/CommunityScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const pieData = [
    {
        name: "Challenge A",
        population: 215000,
        color: "#ff0000",
        legendFontColor: "#ffffff",
        legendFontSize: 15,
    },
    {
        name: "Challenge B",
        population: 280000,
        color: "#00ff00",
        legendFontColor: "#ffffff",
        legendFontSize: 15,
    },
];

const CommunityScreen = () => {
    return (
        <View style={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Community Challenges</Text>
            <PieChart
                data={pieData}
                width={screenWidth}
                height={220}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
            />
        </View>
    );
};

export default CommunityScreen;
