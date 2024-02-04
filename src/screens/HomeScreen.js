import React, { useEffect, useState } from 'react';
import { FlatList, Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImageViewer from '../components/ImageViewer';

const { height, width } = Dimensions.get( 'window' );
const API_URL = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

const HomeScreen = () => {
  const [photoLinks, setPhotoLinks] = useState( [] );
  const [isLoading, setIsLoading] = useState( true );
  // passing state in child component and updating it from child(<ImageViewer />) for Viewing image in full screen using Modal
  const [isImageOpened, setIsImageOpened] = useState( false );
  const [uri, setUri] = useState( null );

  useEffect( () => {
    // function to fetch photos from API or Cache if it is cached already and response is not changed
    const fetchPhotos = async () => {
      try {
        // getting cached links from Async Storage
        const storedPhotos = await AsyncStorage.getItem( 'cached_photo_links' );
        if ( storedPhotos ) {
          const photoLinks = JSON.parse( storedPhotos );
          // if cached links are available, set the state
          setPhotoLinks( photoLinks );
        }
        // extracting photo links from the API_URL
        const response = await axios.get( API_URL );
        const newPhotoLinks = response.data.photos.photo.map( ( photo ) => photo.url_s );
    
        // checking if API response has changed
        if ( JSON.stringify( newPhotoLinks ) !== JSON.stringify( photoLinks ) ) {
          // updating state with new links
          setPhotoLinks( newPhotoLinks );
          // updating AsyncStorage with new links
          await AsyncStorage.setItem( 'cached_photo_links', JSON.stringify( newPhotoLinks ) );
        }
      } catch ( error ) {
        // we can also give toast alert here as per need to show message to User to connect network and try again
        console.log( 'Error fetching photos:', error );
      } finally {
        setIsLoading( false );  // update loading to false regardless of success or failure
      }
    };

    fetchPhotos();
  }, [] );

  const handleImagePress = ( uri ) => {
    setUri( uri );
    setIsImageOpened( true );
  };

  return (
    <>
      <FlatList
        data={ photoLinks }
        numColumns={ 2 }
        keyExtractor={ ( index ) => index.toString() }
        contentContainerStyle={ styles.container }
        renderItem={ ( { item } ) => (
          // given scroll bar at edge and responsive padding acc. to dimension of window
          // some uri has no value so given display in styles so that it does not display
          <TouchableOpacity onPress={ () => handleImagePress( item ) } style={ { ...styles.imagePress, display: !item ? 'none' : 'flex' } }>
            { isLoading
              ? <ActivityIndicator size={ width * 0.1 } color='#279' />
              : <Image style={ styles.imageView } source={ { uri: item } } />
            }
          </TouchableOpacity>
        ) }
      />
      <ImageViewer isImageOpened={ isImageOpened } setIsImageOpened={ setIsImageOpened } uri={ uri } />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#F5F5F5',
    padding: width * 0.02,
    flexGrow: 1,
    alignItems: 'center',
  },
  imagePress: {
    width: width * 0.45,
    height: width * 0.45,
    margin: width * 0.02,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageView: {
    width: '100%',
    height: '100%'
  }
} );