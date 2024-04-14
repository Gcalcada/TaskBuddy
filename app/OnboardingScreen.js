import { Button, Layout, Text, useTheme } from '@ui-kitten/components';
import * as SplashScreen from 'expo-splash-screen';
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useCustomFonts from './useCustomFonts';
const { width } = Dimensions.get('window');
const OnboardingScreen = ({ navigation }) => {
    const scrollViewRef = useRef(null);
    const [currentPage, setCurrentPage] = useState(0);
    const fontsLoaded = useCustomFonts();
    const theme = useTheme();

    useEffect(() => {
        async function hideSplash() {
            await SplashScreen.hideAsync();
        }
        hideSplash();
    }, []);

    const descriptions = [
        {
            title: "Let's Get Started!",
            description: "Welcome to TaskBuddy! Let's kickstart your task management journey.",
            animation: require('../assets/images/Animation2.json')
        },
        {
            title: "Level Up Your Tasks!",
            description: "Time to level up! Learn to organize tasks, set deadlines, and prioritize effectively.",
            animation: require('../assets/images/Animation1.json')
        },
        {
            title: "Advanced Features!",
            description: "Congratulations! You're almost there. Discover advanced features like task sharing and collaboration.",
            animation: require('../assets/images/Animation3.json')
        }
    ];

    const handleSkip = () => {
        navigation.navigate("LoginScreen");

    };

    const handleNext = () => {
        if (currentPage < 2) {
            scrollViewRef.current.scrollTo({ x: width * (currentPage + 1), animated: true });
            setCurrentPage(currentPage + 1);
        } else {
            navigation.navigate("LoginScreen");

        }
    };

    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        const page = Math.round(offsetX / width);
        setCurrentPage(page);
    };

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Layout style={{ flex: 1 }}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {descriptions.map((step, index) => (
                    <Layout key={index} style={{ width, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 }}>
                        <View>
                            <Text category='h1' style={{ color: theme['color-primary-default'] }}>{step.title}</Text>
                            <Text category='s2' style={{ marginTop: 20 }}>{step.description}</Text>
                        </View>
                        <View style={{ alignItems: 'center', paddingTop: 50 }}>
                            {step.animation && <LottieView source={step.animation} autoPlay loop style={{ width: 300, height: 300 }} />}
                        </View>
                    </Layout>

                ))
                }

            </ScrollView >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {[1, 2, 3].map((pageNumber) => (
                    <Icon key={pageNumber} name={currentPage === pageNumber - 1 ? 'radio-button-checked' : 'radio-button-unchecked'} size={25} color={currentPage === pageNumber - 1 ? theme['color-primary-default'] : 'gray'} style={{ marginHorizontal: 5 }} />
                ))}
            </View>
            <Layout style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 30, paddingTop: 30 }}>
                <Button onPress={handleSkip} appearance='ghost' category='h1'>Skip</Button>
                <Button onPress={handleNext} category='h1' style={{ width: 100, paddingHorizontal: 20, paddingVertical: 10 }}> {currentPage < 2 ? 'Next' : 'Start'} </Button>
            </Layout>
        </Layout >
    );
};

export default OnboardingScreen;