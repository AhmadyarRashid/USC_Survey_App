import {StyleSheet} from 'react-native';
import {Colors} from "../../utils/colors"

const styles = StyleSheet.create({
  root: {
    margin: 8,
    flex: 1,
    height: '200%',
  },
  orderNumber: {
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  storeName: {
    marginTop: 4,
    textAlign: 'center',
    color: 'grey',
    marginBottom: 12,
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 8,
  },
  dangerText: {
    color: 'red',
  },
  timer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  textColor: {
    color: Colors.black
  },
  icon: {
    fontSize: 18,
    marginRight: 6,
  },
  timerIcon: {
    fontSize: 18,
    marginRight: 6,
    color: 'red'
  },
  orderCalculation: {
    marginTop: 8,
    borderTopColor: 'grey',
    zIndex: -1,
    borderWidth: 0,
    margin: 4,
  },
  deliveryListItem: {
    marginLeft: 6,
    zIndex: -1,
  }
});

export default styles;
