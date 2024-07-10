import { Button, Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const ErrorMessageHandling = ({ message, duration }) => {
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useSharedValue(0);
    const overlayOpacity = useSharedValue(0);
    const theme = useTheme();

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            animateIn();
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [message, duration]);

    useEffect(() => {
        translateY.value = 0;
        overlayOpacity.value = 0;
    }, [message]);

    const animateIn = () => {
        translateY.value = withTiming(0, {
            duration: 500,
            easing: Easing.out(Easing.back(1)),
        });
        overlayOpacity.value = withTiming(0.7, {
            duration: 500,
            easing: Easing.out(Easing.ease),
        });
    };

    const animateOut = () => {
        translateY.value = withTiming(1000, {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
        });
        overlayOpacity.value = withTiming(0, {
            duration: 500,
            easing: Easing.inOut(Easing.quad),
        });
        setIsVisible(false);
    };

    const handleClose = () => {
        animateOut();
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    const overlayStyle = useAnimatedStyle(() => ({
        opacity: overlayOpacity.value,
    }));

    if (!isVisible) return null;

    return (
        <>
            {isVisible && (
                <Animated.View style={[styles.overlay, overlayStyle]} />
            )}
            <Animated.View style={[styles.container, animatedStyle]} >
                <Layout style={styles.errorContainer} level='3'>
                    <Text category='s2' style={styles.errorMessage}>{message}</Text>
                    <Button
                        onPress={handleClose}
                        appearance='outline'
                        status='primary'
                        style={styles.closeButton}
                        size='small'>
                        X
                    </Button>
                </Layout>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({

    container: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 9999,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 5,
    },
    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
    },
    errorMessage: {
        flex: 1,
        color: 'white',
    },
    closeButton: {
        marginLeft: 'auto',
    },
});

export default ErrorMessageHandling;
