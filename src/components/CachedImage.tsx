import React from 'react';
import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

interface CachedImageProps {
  uri: string;
  style: any;
}

export const CachedImage: React.FC<CachedImageProps> = ({ uri, style }) => {
  const [loading, setLoading] = React.useState(true);

  return (
    <View style={[style, styles.container]}>
      <Image
        source={{ uri }}
        style={[style, { position: 'absolute' }]}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={[style, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}); 