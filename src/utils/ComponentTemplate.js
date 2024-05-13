import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// Template for creating components

const ComponentTemplate = ({}) => {
  return (
    <View style={styles.container}>
      <Text>Component</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default ComponentTemplate;
