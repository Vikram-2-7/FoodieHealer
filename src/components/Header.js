import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

const Header = ({ username }) => {
    const greeting = `Good Morning, ${username}! 🌞`;

    return (
        <View style={styles.header}>
            <Text style={styles.greeting}>{greeting}</Text>
            <Text style={styles.motivationalQuote}>"Eat clean, train mean, live green!"</Text>
            <View style={styles.stats}>
                <Text style={styles.stat}>Calories Consumed: 1,200</Text>
                <Text style={styles.stat}>Target: 2,000</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: colors.darkPurple,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.white,
    },
    motivationalQuote: {
        fontSize: 16,
        color: colors.white,
        fontStyle: 'italic',
        marginTop: 5,
    },
    stats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    stat: {
        fontSize: 16,
        color: colors.white,
    },
});

export default Header;