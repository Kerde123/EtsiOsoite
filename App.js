import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Alert, Button } from 'react-native';
import { API_TOKEN } from '@env';
import MapView, { Marker } from 'react-native-maps';
import { useEffect, useState } from 'react';


// geokoodaus, osoitepalvelu karttapalvelun sisässä
// esim. mapquest-palvelussa. haetaan osoitteella -> hakee koordinaattien mukaan
// alkuun initial region, jota näytetään, ennen kuin käyttäjä tekee haun
// kun kirjottaa osoitteen -> sillä tehdään geokoodauspyyntö -> saadaan koordinaatit -> asetetaan ne koordinaatit mapview:lle, 
// niin että se mapview päivittyy siihen mitä halutaan näyttää eli siihen osoitteeseen


export default function App() {

  const [osoite, setOsoite] = useState('');
  const [coordinates, setCoordinates] = useState({});

      
  const getCoordinates = () => {
      fetch(`http://www.mapquestapi.com/geocoding/v1/address?key=${API_TOKEN}&location=${osoite}`)
      .then(response => response.json())
      .then(responseJson => setCoordinates(responseJson.results[0].locations.latLng))
      .catch(error => { 
        Alert.alert('Error', error.message); 
      });  
      console.log(Object.keys(coordinates)); 
      } 


  return (
    <View style={styles.container}>
      <MapView
        style={{ width: '100%', height: '90%' }}
        initialRegion={{
          latitude: 60.15524,
          longitude: 24.9117114,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}>
      </MapView>
      <TextInput
        placeholder={'Osoite'}
        value={osoite}
        onChangeText={text => setOsoite(text)}
        />
        <Button 
      title = "Show" 
      onPress = {getCoordinates} 
        />
  
        <MapView 
            style={{ width: '100%', height: '100%' }}
            region= {{
              latitude: coordinates[0],
              longitude: coordinates[1],
              latitudeDelta: 0.0322,
              longitudeDelta: 0.0221
            }}
            >
            <Marker 
              coordinate={{
              latitude: coordinates[0],
              longitude: coordinates[1]
              }}
              />
          </MapView> 
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});