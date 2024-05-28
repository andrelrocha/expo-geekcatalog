import * as ImagePicker from 'expo-image-picker';

type HandleImageSelectionProps = {
    cameraType?: ImagePicker.CameraType;
    mode?: 'gallery' | 'camera';
};

export const handleImageSelection = async (props: HandleImageSelectionProps) => {    
    let result;

    if (props.mode === 'gallery') {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied to access image gallery');
                return;
            }
            
            result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
        
            if (!result.canceled) {
                return result.assets[0].uri;
            }
        } catch (error) {
            console.log('Error accessing image gallery: ', error);
        }
    } else if (props.mode === 'camera') {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission denied to access camera');
                return;
            }
            
            result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                cameraType: props.cameraType || ImagePicker.CameraType.front,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            
            });
        
            if (!result.canceled) {
                return result.assets[0].uri;
            }
        } catch (error) {
            console.log('Error accessing camera: ', error);
            return;
        }
    } else {
        console.log('Invalid image selection mode');
        return;
    }
};