
const React = require('react-native');

const { StyleSheet, Dimensions } = React;

let { width, height } = Dimensions.get('window')

module.exports = StyleSheet.create({
  container: {
   justifyContent: 'center',
   alignItems: 'center',
  },
  map: {
    width: width,
    height: 515,
  },
  callout: {
    flex: 1,
    position: 'relative',
  },
  calloutCard: {
    width:250,
    height:400,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  calloutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#474747',
  },
  calloutDescription: {
    marginBottom: 20,
    padding: 20,
    opacity: .6,
    textAlign: 'center',
  },
  calloutImage: {
    width: 160,
    height: 120,
    marginBottom: 15,
  },
  calloutButton: {
    width: 190,
    marginLeft: 30,
  }
});
