// src/components/ProgressChart.js
import React from 'react';
import { View, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ProgressChart = ({ data }) => {
    return (
        <View>
            <Text>Your Progress</Text>
            <BarChart
                data={{
                    labels: data.labels,
                    datasets: [
                        {
                            data: data.values,
                        },
                    ],
                }}
                width={screenWidth}
                height={220}
                yAxisLabel=""
                chartConfig={{
                    backgroundColor: '#fff',
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>
    );
};

export default ProgressChart;
