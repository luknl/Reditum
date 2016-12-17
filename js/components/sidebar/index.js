
import React, { Component } from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Content, Text, List, ListItem, Icon, View } from 'native-base';

import navigateTo from '../../actions/sideBarNav';
import sidebarTheme from './sidebar-theme';
import styles from './style';

const drawerCover = require('../../../img/drawer-cover.jpg');
const drawerImage = require('../../../img/logo.png');

class SideBar extends Component {

  static propTypes = {
    navigateTo: React.PropTypes.func,
  }

  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
    };
  }

  navigateTo(route) {
    this.props.navigateTo(route, 'home');
  }

  render() {
    return (
      <Content
        theme={sidebarTheme}
        style={styles.sidebar}
      >
        <Image source={drawerCover} style={styles.drawerCover}>

        </Image>
        <List>
        <ListItem button iconLeft onPress={() => this.navigateTo('map')} >
          <View style={styles.listItemContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#BE6F50', paddingLeft: 10 }]}>
              <Icon name="ios-navigate-outline" style={styles.sidebarIcon} />
            </View>
            <Text style={styles.text}>Carte</Text>
          </View>
        </ListItem>
        <ListItem button iconLeft onPress={() => this.navigateTo('favorites')}>
          <View style={styles.listItemContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#4DCAE0' , paddingLeft: 10}]}>
              <Icon name="ios-star" style={styles.sidebarIcon} />
            </View>
            <Text style={styles.text}>Favoris</Text>
          </View>
        </ListItem>
        <ListItem button iconLeft onPress={() => this.navigateTo('parameters')}>
          <View style={styles.listItemContainer}>
            <View style={[styles.iconContainer, { backgroundColor: '#ADADAD' , paddingLeft: 11}]}>
              <Icon name="ios-settings" style={styles.sidebarIcon} />
            </View>
            <Text style={styles.text}>Paramètres</Text>
          </View>
        </ListItem>
        </List>
      </Content>
    );
  }
}

function bindAction(dispatch) {
  return {
    navigateTo: (route, homeRoute) => dispatch(navigateTo(route, homeRoute)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SideBar);
