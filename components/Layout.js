import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const Layout = ({ children }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {children}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
});

export default Layout;
