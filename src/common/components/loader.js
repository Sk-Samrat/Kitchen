// import React from 'react';
// import {ActivityIndicator} from 'react-native';
// import {primaryColor} from '../components/commonStyles';

// export const Indicator = ({visible, indicatorColor, style}) => {
//   return (
//     <ActivityIndicator
//       animating={visible}
//       color={indicatorColor || primaryColor}
//       size={30}
//       style={style}
//     />
//   );
// };
import React from 'react';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
// import COLORS from '../../conts/colors';
import colors from './colors';
const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={colors.blue} />
          <Text style={{ marginLeft: 10, fontSize: 16 }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: 70,
    backgroundColor: colors.white,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

export default Loader;
