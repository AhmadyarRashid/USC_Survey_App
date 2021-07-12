import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const styles = StyleSheet.create({
  cardRoot: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardImageContainer: {
    width: '40%',
    marginRight: 12,
  },
  shopBanner: {
    width: '100%',
    height: 100,
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '95%'
  },
  cardActionsRow: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'red',
    width: "60%",
    flexWrap: 'wrap',
    marginTop: 12,
  },
  cardText: {
    color: Colors.grey,
  },
  orderBtn: {
    marginRight: 8,
    marginBottom: 4
  },

  btn: {
    // marginTop: 4
  }
});

export default styles;
