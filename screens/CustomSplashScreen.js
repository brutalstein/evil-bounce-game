import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const CustomSplashScreen = ({ navigation }) => {
  const [appReady, setAppReady] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const fadeAnim = new Animated.Value(0);
  const ballBounce = new Animated.Value(0);
  const titleGlow = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 100);

    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(titleGlow, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();

    const bounceAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ballBounce, {
            toValue: -20,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(ballBounce, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(200),
        ])
      ).start();
    };

    bounceAnimation();

    const startLoading = () => {
      const duration = 6000;
      const steps = 100;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const progressInterval = setInterval(() => {
        currentStep += 1;
        setLoadingProgress(currentStep);
        
        if (currentStep >= 100) {
          clearInterval(progressInterval);
          setAppReady(true);
        }
      }, stepDuration);

    };

    setTimeout(startLoading, 500); 
  }, []);

  useEffect(() => {
    if (appReady) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        navigation.replace('Game');
      });
    }
  }, [appReady, navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Animated.View style={[
          styles.titleContainer,
          {
            shadowOpacity: titleGlow.interpolate({
              inputRange: [0, 1],
              outputRange: [0.3, 1],
            }),
          }
        ]}>
          <Text style={styles.title}>Evil</Text>
          <Text style={styles.titleGame}>Bounce</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.ballContainer,
            {
              transform: [{ translateY: ballBounce }]
            }
          ]}
        >
          <View style={styles.basketball}>
            <View style={styles.ballLine1} />
            <View style={styles.ballLine2} />
            <View style={styles.ballLine3} />
          </View>
        </Animated.View>

        <View style={styles.loadingTextContainer}>
          <LoadingText />
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View
              style={[
                styles.progressFill,
                {
                  width: `${loadingProgress}%`, // Gerçek yüzde ile senkron
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>{loadingProgress}%</Text>
        </View>

        <View style={styles.scanlines} />
      </Animated.View>
    </View>
  );
};

const LoadingText = () => {
  const dotAnim1 = new Animated.Value(0);
  const dotAnim2 = new Animated.Value(0);
  const dotAnim3 = new Animated.Value(0);

  useEffect(() => {
    const animateText = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dotAnim1, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dotAnim2, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dotAnim3, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.delay(500),
          Animated.parallel([
            Animated.timing(dotAnim1, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(dotAnim2, { toValue: 0, duration: 200, useNativeDriver: true }),
            Animated.timing(dotAnim3, { toValue: 0, duration: 200, useNativeDriver: true }),
          ]),
          Animated.delay(300),
        ])
      ).start();
    };

    animateText();
  }, []);

  return (
    <View style={styles.loadingTextWrapper}>
      <Text style={styles.loadingText}>Loading</Text>
      <View style={styles.dotsContainer}>
        <Animated.Text style={[styles.dot, { opacity: dotAnim1 }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dotAnim2 }]}>.</Animated.Text>
        <Animated.Text style={[styles.dot, { opacity: dotAnim3 }]}>.</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#ff6b35',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: '#ff6b35',
    letterSpacing: 8,
    textShadowColor: '#ff6b35',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  titleGame: {
    fontSize: 32,
    fontWeight: '700',
    color: '#f39c12',
    letterSpacing: 12,
    marginTop: -8,
    textShadowColor: '#f39c12',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  ballContainer: {
    marginBottom: 50,
  },
  basketball: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#d35400',
    borderWidth: 3,
    borderColor: '#e67e22',
    position: 'relative',
    shadowColor: '#d35400',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  ballLine1: {
    position: 'absolute',
    top: 10,
    left: 38,
    width: 4,
    height: 60,
    backgroundColor: '#a0522d',
    borderRadius: 2,
  },
  ballLine2: {
    position: 'absolute',
    top: 38,
    left: 10,
    width: 60,
    height: 4,
    backgroundColor: '#a0522d',
    borderRadius: 2,
  },
  ballLine3: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#a0522d',
  },
  loadingTextContainer: {
    marginBottom: 30,
  },
  loadingTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#00ff88',
    letterSpacing: 3,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  dot: {
    fontSize: 24,
    color: '#00ff88',
    marginHorizontal: 2,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 5,
  },
  progressContainer: {
    alignItems: 'center',
    width: 250,
  },
  progressBar: {
    width: '100%',
    height: 12, // Daha kalın
    backgroundColor: '#1a1a2e',
    borderRadius: 6,
    borderWidth: 3, // Daha kalın border
    borderColor: '#00ff88',
    overflow: 'hidden',
    marginBottom: 10,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#00ff88',
    borderRadius: 2,
    shadowColor: '#00ff88',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    transition: 'width 0.1s ease-out', // Smooth transition
  },
  progressText: {
    fontSize: 18, // Daha büyük
    color: '#00ff88',
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: '#00ff88',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
    marginTop: 5,
  },
  scanlines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 136, 0.03) 50%)',
    backgroundSize: '100% 4px',
    pointerEvents: 'none',
  },
});

export default CustomSplashScreen;