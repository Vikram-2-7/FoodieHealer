// src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../styles/colors';


const Header = ({ title }) => {
    return (
        <View style={styles.header}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export default Header;
