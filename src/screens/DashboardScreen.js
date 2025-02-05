import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { colors } from '../styles/colors';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ navigation }) => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.greeting}>Good Morning, Vikram! 🌞</Text>
                <Text style={styles.motivationalQuote}>"Eat clean, train mean, live green!"</Text>
                <View style={styles.stats}>
                    <Text style={styles.stat}>Calories Consumed: 1,200</Text>
                    <Text style={styles.stat}>Target: 2,000</Text>
                </View>
            </View>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
                <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: colors.peach }]} 
                    onPress={() => navigation.navigate('AddMeal')}
                >
                    <Text style={styles.actionText}>Log a Healthy Meal</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: colors.babyPink }]} 
                    onPress={() => navigation.navigate('TrackWorkout')}
                >
                    <Text style={styles.actionText}>Start Workout</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.actionButton, { backgroundColor: colors.darkPurple }]} 
                    onPress={() => navigation.navigate('NutritionGoals')}
                >
                    <Text style={styles.actionText}>View Nutritional Goals</Text>
                </TouchableOpacity>
            </View>

            {/* Food Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Today's Meals</Text>
                <View style={styles.mealCards}>
                    <TouchableOpacity style={styles.mealCard} onPress={() => navigation.navigate('MealLog')}>
                        <Text style={styles.mealText}>Breakfast: Oatmeal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mealCard} onPress={() => navigation.navigate('MealLog')}>
                        <Text style={styles.mealText}>Lunch: Salad</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.mealCard} onPress={() => navigation.navigate('MealLog')}>
                        <Text style={styles.mealText}>Dinner: Grilled Chicken</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionSubtitle}>Nutritional Breakdown</Text>
                <PieChart
                    data={[
                        { name: 'Carbs', population: 40, color: colors.peach, legendFontColor: colors.darkPurple, legendFontSize: 15 },
                        { name: 'Protein', population: 30, color: colors.babyPink, legendFontColor: colors.darkPurple, legendFontSize: 15 },
                        { name: 'Fats', population: 30, color: colors.darkPurple, legendFontColor: colors.darkPurple, legendFontSize: 15 },
                    ]}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: colors.lightPurple,
                        backgroundGradientFrom: colors.lightPurple,
                        backgroundGradientTo: colors.lightPurple,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>

            {/* Fitness Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Workout Summary</Text>
                <TouchableOpacity style={styles.workoutCard} onPress={() => navigation.navigate('TrackWorkout')}>
                    <Text style={styles.workoutText}>Push-ups (3 sets)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.workoutCard} onPress={() => navigation.navigate('TrackWorkout')}>
                    <Text style={styles.workoutText}>Squats (4 sets)</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.workoutCard} onPress={() => navigation.navigate('TrackWorkout')}>
                    <Text style={styles.workoutText}>Plank (2 minutes)</Text>
                </TouchableOpacity>
                <Text style={styles.motivationalQuote}>"You’re stronger than you think!"</Text>
            </View>

            {/* Progress Chart */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Calories Consumed vs Target</Text>
                <PieChart
                    data={[
                        { name: 'Consumed', population: 1200, color: colors.peach, legendFontColor: colors.darkPurple, legendFontSize: 15 },
                        { name: 'Remaining', population: 800, color: colors.lightPurple, legendFontColor: colors.darkPurple, legendFontSize: 15 },
                    ]}
                    width={screenWidth - 40}
                    height={220}
                    chartConfig={{
                        backgroundColor: colors.lightPurple,
                        backgroundGradientFrom: colors.lightPurple,
                        backgroundGradientTo: colors.lightPurple,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
            </View>

            {/* Additional Content for Testing Scroll */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Community Challenges</Text>
                <TouchableOpacity style={styles.challengeCard}>
                    <Text style={styles.challengeText}>Challenge 1: 10,000 Steps a Day</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.challengeCard}>
                    <Text style={styles.challengeText}>Challenge 2: Drink 2 Liters of Water</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.challengeCard}>
                    <Text style={styles.challengeText}>Challenge 3: No Junk Food for a Week</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: colors.lightPurple,
    },
    header: {
        marginBottom: 20,
    },
    greeting: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.darkPurple,
    },
    motivationalQuote: {
        fontSize: 16,
        color: colors.darkPurple,
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
        color: colors.darkPurple,
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    actionText: {
        color: colors.white,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.darkPurple,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.darkPurple,
    },
    mealCards: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mealCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    mealText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkPurple,
    },
    workoutCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    workoutText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkPurple,
    },
    challengeCard: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    challengeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.darkPurple,
    },
});

export default DashboardScreen;