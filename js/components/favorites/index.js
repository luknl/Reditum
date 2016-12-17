
import React, { Component, findNodeHandle } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { View, Text, Container, Header, Title, Content, InputGroup, Input, Button, Icon, Badge } from 'native-base';
import { AppRegistry, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import store from 'react-native-simple-store';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  replaceAt,
} = actions;

  class Favorites extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = { places: [] }
  }

  replaceAt(route) {
    this.props.replaceAt('favorites', { key: route }, this.props.navigation.key);
  }

  componentDidMount() {
    store
      .get('places')
      .then((places) => {
        this.setState({ places })
      })
  }

  deleteFavorite() {
    store.delete('places');
    this.replaceAt('map')
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header style={styles.header}>
          <Title>Favoris</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder style={styles.padder}>
          <Button block style={styles.delete} onPress={() => this.replaceAt('card1')}>Aller</Button>

          {this.state.places.map((place, index) => (
            <View key={index} style={styles.favorite} >
              <Image
                style={styles.image}
                source={{uri: place.image}}
              />
              <Text key={index} style={styles.title}>{place.title}</Text>
              <Text style={styles.adress}>{place.adress}</Text>
            </View>
          ))}

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

export default connect(mapStateToProps, bindAction)(Favorites);
