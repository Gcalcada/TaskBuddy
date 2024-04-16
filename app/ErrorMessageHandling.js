import { Button, Layout, Text, useTheme } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';
import { setMessage } from './reducer/messageReducer';

const ErrorMessageHandling = ({ message, duration }) => {
    const [isVisible, setIsVisible] = useState(false);
    const translateY = useSharedValue(0);
    const dispatch = useDispatch();
    const overlayOpacity = useSharedValue(0.7);
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
    const animateIn = () => {
        translateY.value = withTiming(0, {
            duration: 700,
            easing: Easing.inOut(Easing.bounce),
        });
        overlayOpacity.value = withTiming(0.7, {
            duration: 400,
            easing: Easing.inOut(Easing.in),
        });
    };

    const animateOut = () => {
        translateY.value = withTiming(1000, {
            duration: 700,
            easing: Easing.inOut(Easing.out),
        });
        overlayOpacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.inOut(Easing.out),
        });
        setIsVisible(false); // Ocultar o componente após a animação de saída
    };

    const handleClose = () => {

        setIsVisible(false);
        dispatch(setMessage({ category: 'errorMessage', message: '' }));
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
                    <View style={{ paddingHorizontal: 20 }}>
                        <Text category='s2' style={styles.errorMessage}>{message}</Text>
                    </View >
                    <View style={{ paddingRight: 28 }} >
                        <Button
                            onPress={handleClose}
                            appearance='outline'
                            status='primary'
                            style={styles.closeButton}
                            size='small'>
                            X
                        </Button>
                    </View >
                </Layout>
            </Animated.View >
        </>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9998, // Para garantir que o overlay esteja abaixo do modal
    },

    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        alignItems: 'center',
    },
    errorContainer: {
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    errorMessage: {
        padding: 20,
        marginTop: 30,
        color: 'white',
        flex: 1,
    },
    closeButton: {
        bottom: 20,
        top: 0, // Move o botão "X" para a extremidade direita do contêiner
    },
});
export default ErrorMessageHandling;
