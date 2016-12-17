
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { View, Text, Container, Header, Title, Content, InputGroup, Input, Button, Icon, Badge } from 'native-base';
import { AppRegistry, StyleSheet, Image, TextInput, TouchableHighlight } from 'react-native';
import store from 'react-native-simple-store';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  replaceAt,
} = actions;

  class Parameters extends Component {
  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  constructor(props) {
    super(props);
    this.state = { value: 900 }
  }

  replaceAt(route) {
    this.props.replaceAt('parameters', { key: route }, this.props.navigation.key);
  }

  setNotifyPerimeter(value) {
    store.save('perimeter', {
      distance: value,
    })
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>
        <Header>
          <Title>Paramètres</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder style={styles.padder}>
          <Text>Définir le périmètre (en m) à partir duquel vous voulez être notifié dun point Reditum à proximité</Text>
          <TextInput
            placeholder = '700, 1300...'
            keyboardType = 'numeric'
            editable = {true}
            maxLength = {10000}
            onChangeText={(value) => this.setState({value})}
            onSubmitEditing = {this.setNotifyPerimeter(this.state.value)}
          />
          <Text>Actuellement : {this.state.value} m</Text>
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

export default connect(mapStateToProps, bindAction)(Parameters);
