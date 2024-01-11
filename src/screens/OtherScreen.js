import React from 'react';
import { View, Text } from 'react-native';

const OtherScreen = () => {
  return (
    <View style={ { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5F5F5' } }>
      <Text style={ { color: '#000', fontSize: 20 } }>
        Other Screen
      </Text>
    </View>
  );
};

export default OtherScreen;