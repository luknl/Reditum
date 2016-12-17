
import React, { Component } from 'react';
import { AppRegistry, View, WebView, Image, Dimensions, Platform} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import { Container, Header, Title, Content, Text, H3, Button, Icon, Footer, FooterTab } from 'native-base';
import store from 'react-native-simple-store';

import { openDrawer } from '../../actions/drawer';
import myTheme from '../../themes/base-theme';
import styles from './styles';

const {
  replaceAt,
} = actions;

const deviceHeight = Dimensions.get('window').height;

class Card1 extends Component {

  static propTypes = {
    openDrawer: React.PropTypes.func,
    replaceAt: React.PropTypes.func,
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
    }),
  }

  replaceAt(route) {
    this.props.replaceAt('card1', { key: route }, this.props.navigation.key);
  }

  setFavorite() {
    let location = {
    title: "Distillerie Pernod-Ricard",
    description: "Un bruit assourdissant envahissait Montreuil, une odeur forte d’Anis agressait les narines, les alambics fonctionnaient sans relâche jours et nuits. L’usine Pernod-Ricard fonctionnait à plein régime le siècle dernier.",
    image:"http://www.montreuil.fr/fileadmin/user_upload/Images/newsletters/montreuil_entreprendre/Usine_Montreuil_-_Vue_g%C3%A9n%C3%A9rale.jpg",
      card: 'card1',
    };
    store.get('places').then(places => {
      if (places.findIndex((place) => place.title === location.title) !== 1) {
        places.push(location);
      }
      store.save('places', places)
    });
  }

  render() {
    return (
      <Container theme={myTheme} style={styles.container}>

        <Header>
          <Title>Reditum</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>

        <Content padder style={styles.padder}>
          <Icon name="ios-arrow-back" style={styles.sidebarIcon, styles.back} onPress={() => this.replaceAt('map')} />
          <Icon name="ios-star" style={styles.sidebarIcon, styles.fav} onPress={() => this.setFavorite()} />
          <WebView style={styles.webview}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            source={{uri: 'http://www.lucaphotos.com/reditum/index.html'}}
          />
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

export default connect(mapStateToProps, bindAction)(Card1);
