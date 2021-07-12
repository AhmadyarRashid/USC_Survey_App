import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const styles = StyleSheet.create({
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputItem: {
    width: '48%',
    marginTop: 8,
  },
  payBtn: {
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 4,
  },
  dropdown: {
    width: 180,
    marginTop: 10,
  },
});

export default styles;
