import * as Font from 'expo-font';
import { useEffect, useState } from 'react';

export default function useCustomFonts() {
    const [fontsLoaded, setFontsLoaded] = useState(false);

    useEffect(() => {
        async function loadFonts() {
            await Font.loadAsync({

                'OpenSans-Bold': require('../assets/fonts/OpenSans-Bold.ttf'),
                'OpenSans-SemiBold': require('../assets/fonts/OpenSans-SemiBold.ttf'),
                'OpenSans-Regular': require('../assets/fonts/OpenSans-Regular.ttf'),

            });
            setFontsLoaded(true);
        }

        loadFonts();

        return () => {

        };
    }, []);

    return fontsLoaded;
}