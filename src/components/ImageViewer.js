import React from 'react';
import { Dimensions, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { height, width } = Dimensions.get( 'window' );

const ImageViewer = React.memo( ( { isImageOpened, setIsImageOpened, uri } ) => {

  const handleImageClose = () => {
    setIsImageOpened( false );
  };

  return (
    <Modal animationType='fade' transparent visible={ isImageOpened }>
      <View style={ styles.container }>
        <TouchableOpacity onPress={ handleImageClose } style={ styles.closeButton }>
          {/* can use icon from react-native-vector-icons or any other 3rd party library */ }
          <Text style={ styles.closeButtonText }>❌</Text>
        </TouchableOpacity>
        <Image style={ styles.image } source={ { uri } } />
      </View>
    </Modal>
  );
} );

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center'
  },
  closeButton: {
    position: 'absolute',
    top: height * 0.02,
    right: width * 0.02
  },
  closeButtonText: {
    color: '#fff',
    fontSize: height * 0.03
  },
  image: {
    height: height * 0.85,
    width: width,
    resizeMode: 'contain'
  }
} );

export default ImageViewer;