import { Text } from '@ui-kitten/components';
import React from 'react';
import customStyles from './customStyles.json';

const CustomText = ({ category, children, ...restProps }) => {
    // Verifica se há estilos personalizados para a categoria fornecida
    const customStyle = customStyles[category] || {};

    return (
        <Text {...restProps} style={[customStyle]}>
            {children}
        </Text>
    );
};

export default CustomText;