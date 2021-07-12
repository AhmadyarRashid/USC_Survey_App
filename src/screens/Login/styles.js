import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';

const styles = StyleSheet.create({
  root: {
    backgroundColor: Colors.primary,
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
  logoImage: {
    height: 80,
    width: 300,
  },
  inputContainer: {
    marginTop: 18,
  },
  input: {
    backgroundColor: Colors.white,
  },
  loginBtn: {
    backgroundColor: Colors.white,
    color: Colors.black,
    marginTop: 18
  },
  loginBtnText: {
    color: Colors.black
  }
});

export default styles;
