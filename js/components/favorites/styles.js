
const React = require('react-native');

const { StyleSheet } = React;

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#FBFAFA',
   justifyContent: 'center',
   alignItems: 'center',
  },
  padder: {
    padding: 10,
  },
  mb: {
    marginBottom: 10,
  },
  delete: {
    marginBottom: 20,
  },
  favorite: {
    height: 130,
    padding: 20,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d6d7da',
  },
  image: {
    width: 135,
    height: 100,
    position: 'absolute',
  },
  title: {
    marginLeft: 150,
  },
  adress: {
    marginLeft: 150,
    marginTop: 20,
  },
});
