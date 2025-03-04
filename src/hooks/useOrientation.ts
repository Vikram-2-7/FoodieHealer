import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export const useOrientation = () => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width < Dimensions.get('window').height ? 'portrait' : 'landscape'
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width < window.height ? 'portrait' : 'landscape');
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return orientation;
}; 