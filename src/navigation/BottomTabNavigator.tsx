import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Platform, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../styles/theme';

const Tab = createBottomTabNavigator();

const TabButton = ({ icon, focused }) => {
  return (
    <View style={styles.tabButton}>
      <Animated.View
        style={[
          styles.tabIconContainer,
          focused && styles.tabIconContainerFocused
        ]}
      >
        <Icon
          name={icon}
          size={24}
          color={focused ? COLORS.primary : '#666'}
        />
      </Animated.View>
    </View>
  );
};

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton icon="view-dashboard" focused={focused} />
          ),
        }}
      />
      <Tab.Screen
        name="DietPlanner"
        component={DietPlannerScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton icon="food-apple" focused={focused} />
          ),
        }}
      />
      {/* Add other tab screens similarly */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 20 : 10,
    left: 20,
    right: 20,
    height: 60,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    ...SHADOWS.light,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
  },
  tabIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainerFocused: {
    backgroundColor: `${COLORS.primary}20`,
  },
});

export default BottomTabNavigator; 