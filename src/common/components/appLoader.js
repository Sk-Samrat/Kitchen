import React from 'react';
import {View, Image} from 'react-native';
import icons from './icons';
import commonStyles, {cardBackgroundColor, primaryColor} from './commonStyles';
import {dynamicSize} from './responsive';
import colors from './colors';
export const AppLoader = props => {
  const {onRefresh} = props;
  return (
    <View
      style={[
        commonStyles.mainContainer,
        {
          flex: 1,
          alignItems: 'center',
          backgroundColor: primaryColor,
        },
      ]}>
      <Image
        source={icons.logo}
        resizeMode="contain"
        style={{
          tintColor: cardBackgroundColor,
          height: dynamicSize(300),
          width: dynamicSize(300),
        }}
      />
    </View>
  );
};
