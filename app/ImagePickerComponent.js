import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';

const ImagePickerComponent = ({ onChoosePhoto }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const openImagePickerAsync = async () => {
        let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permissão para acessar a biblioteca de mídia é necessária!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage(pickerResult.uri);
        onChoosePhoto(pickerResult.uri); // Passa a URL da foto selecionada para a função handleChoosePhoto
    };

    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Button title="Escolher Foto" onPress={openImagePickerAsync} />
            {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200, marginTop: 20 }} />}
        </View>
    );
};

export default ImagePickerComponent;