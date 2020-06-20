import React, { Component } from 'react';
import { Text, View, Dimensions ,TextInput, TouchableOpacity } from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/Ionicons';

var {  height, width } = Dimensions.get("window");


export default class Address extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: '',
            latitude:-7.244307077059245,
            longitude:-35.880187600851066
        };
    }

    render() {
        return (
          <View style={{flex:1,alignItems: 'center', justifyContent: 'center'}}>
    
               <MapView
               style={{width:width, height:height-60}}
                region={{
                  latitude:  this.state.latitude,
                  longitude: this.state.longitude,
                  latitudeDelta: 0.0042,
                  longitudeDelta: 0.0121,
                }}
                onPress={(e) => this.onClickMap(e.nativeEvent)}
    
              >
    
    
    
              <MapView.Marker draggable
                coordinate={{
                  latitude: this.state.latitude,
                  longitude: this.state.longitude
                }}
                onDragEnd={(e) => this.movementMarker(e.nativeEvent)}
                title="Here"  />
            </MapView>
    
            <TouchableOpacity style={{
                backgroundColor:"white",
                height:60, width:60,
                borderRadius:50,
                alignItems:'center',
                padding:5,
                position:"absolute",
                top :10 ,
                right:10
              }} onPress={()=>this._getLocation()}>
              <Icon name="md-locate" size={50} color={"gray"}  />
            </TouchableOpacity>
    
          </View>
        );
      }
    
      _getLocation()
      {
        Geolocation.getCurrentPosition((info) => {
          this.setState({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude,
          })
        },(error)=>{
          console.log(JSON.stringify(error))
        })
      }
    
      movementMarker(e){
        // get coordinate from mapviews
        const { latitude, longitude } = e.coordinate
        // update coordinate
        this.setState({
          latitude: latitude,
          longitude: longitude
        })
      }
    
      onClickMap(e)
     {
       const {latitude,longitude} = e.coordinate
       this.setState({
         latitude: latitude,
         longitude: longitude
       })
     }
    
    }