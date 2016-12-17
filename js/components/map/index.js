import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Button, Icon, Badge } from 'native-base';
import MapView from 'react-native-maps';
import store from 'react-native-simple-store';
import geolib from "geolib"

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

import markers from './markers.json';
import mapstyle from './mapstyle.json';

const {
  replaceAt,
} = actions;

class MainMap extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      markers
    };
  }

  replaceAt(route) { // routing
    this.props.replaceAt('map', { key: route }, this.props.navigation.key);
  }


  watchID: ?number = null;

  state = {
    initialPosition: 'unknown',
    lastPosition: 'unknown',
  };

  componentDidMount() { // get distances between location and a certain point

    store.get('perimeter')
    .then(perimeter => {
      let notifyPerimeter = perimeter.distance;
      let distance = geolib.getDistanceSimple(
        {latitude: 48.851664, longitude: 2.420759},
        {latitude: 48.856914, longitude: 2.429780}, 
      );
    })

    navigator.geolocation.getCurrentPosition( // get location
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      }
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() { // get location
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {

   const { region } = this.props;
   const { markers } = this.state;
   const mapPin = require('../../../img/markup.png');

    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>Reditum</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
      <Content padder style={styles.padder}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
           latitude: 48.856914,
           longitude: 2.429780,
           latitudeDelta: 0.025,
           longitudeDelta: 0.0921,
          }}
          customMapStyle={mapstyle}
          showsUserLocation={true}
          followsUserLocation={true}
          showsMyLocationButton={true}
          toolbarEnabled={true}
          showsBuildings={true}
          loadingEnabled={true}
        >
        { markers.map((marker, index) => {

         return (
           <MapView.Marker
           coordinate={marker.LatLng}
           title={marker.title}
           description={marker.description}
           key={index}
           image={mapPin}
           calloutAnchor={{x:0,y:8}}
           onCalloutPress={() => this.replaceAt(marker.page)}
           >
           <MapView.Callout style={styles.callout}
           tooltip={true}
           >
             <View style={styles.calloutCard}>
             <Image style={styles.calloutImage}
             source={{uri: marker.image}}
             />
              <Text style={styles.calloutTitle}>
                {marker.title}
              </Text>
              <Text style={styles.calloutDescription}>
                {marker.description}
              </Text>
              <Button style={styles.calloutButton}>Découvrir</Button>
             </View>
           </MapView.Callout>
         </MapView.Marker>
         )
        })}
        </MapView>
     </View>
     </Content>
   </Container>
    );
  }
}


function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    replaceAt: (routeKey, route, key) => dispatch(replaceAt(routeKey, route, key)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(MainMap);
