import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  root: {
    margin: 8,
  },
  orderNumber: {
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  storeName: {
    marginTop: 4,
    textAlign: 'center',
    color: 'grey',
  },
  storeAddress: {
    textAlign: 'center',
    color: 'grey',
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    margin: 4
  },
  dangerText: {
    color: 'red'
  }
});

export default styles;
