import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const styles = StyleSheet.create({
  root: {
    marginTop: 8,
    // paddingBottom: 8,
    // paddingTop: 8,
    // borderWidth: 1,
    // borderTopColor: Colors.lightGrey,
    // borderBottomColor: Colors.lightGrey,
    // borderLeftColor: Colors.white,
    // borderRightColor: Colors.white,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  inputItem: {
    width: '45%',
    marginTop: 8,
    marginRight: 4,
  },
  form: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    marginTop: 12,
    marginRight: 5,
  },
  actionButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    zIndex: -100,
    marginTop: 0
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    width: "90%",
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default styles;
