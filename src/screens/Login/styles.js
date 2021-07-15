import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.lightGrey,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  content: {
    marginLeft: 30,
    marginRight: 30,
    display: 'flex',
    marginTop: 180,
  },
  logoContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputContainer: {
    marginTop: 18,
  },
  input: {
    backgroundColor: Colors.white,
    borderRadius: 12
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    color: Colors.black,
    marginTop: 18,
    borderRadius: 12
  },
  loginBtnText: {
    color: Colors.white
  }
});

export default styles;
