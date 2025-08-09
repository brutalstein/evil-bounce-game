import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const Splash = ({ navigation }) => {
  const [rdy, setRdy] = useState(false);
  const [prg, setPrg] = useState(0);
  
  const fade = new Animated.Value(0);
  const bounce = new Animated.Value(0);
  const glow = new Animated.Value(0);

  useEffect(() => {
    setTimeout(() => SplashScreen.hideAsync(), 100);

    Animated.sequence([
      Animated.timing(fade, { toValue: 1, duration: 1000, useNativeDriver: false }),
      Animated.timing(glow, { toValue: 1, duration: 500, useNativeDriver: false }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: -20, duration: 400, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 300, useNativeDriver: true }),
        Animated.delay(200),
      ])
    ).start();

    const load = () => {
      const dur = 6000, steps = 100, stepDur = dur / steps;
      let c = 0;
      const itv = setInterval(() => {
        c++;
        setPrg(c);
        if (c >= 100) {
          clearInterval(itv);
          setRdy(true);
        }
      }, stepDur);
    };

    setTimeout(load, 500);
  }, []);

  useEffect(() => {
    if (rdy) {
      Animated.timing(fade, { toValue: 0, duration: 300, useNativeDriver: false })
        .start(() => navigation.replace('Game'));
    }
  }, [rdy, navigation]);

  return (
    <View style={st.c}>
      <Animated.View style={[st.ct, { opacity: fade }]}>
        <Animated.View style={[st.ttC, { shadowOpacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]}>
          <Text style={st.tt1}>Evil</Text>
          <Text style={st.tt2}>Bounce</Text>
        </Animated.View>

        <Animated.View style={[st.ballC, { transform: [{ translateY: bounce }] }]}>
          <View style={st.ball}>
            <View style={st.l1} />
            <View style={st.l2} />
            <View style={st.l3} />
          </View>
        </Animated.View>

        <View style={st.ldC}>
          <LdTxt />
        </View>

        <View style={st.pgC}>
          <View style={st.pgB}>
            <Animated.View style={[st.pgF, { width: `${prg}%` }]} />
          </View>
          <Text style={st.pgT}>{prg}%</Text>
        </View>

        <View style={st.sl} />
      </Animated.View>
    </View>
  );
};

const LdTxt = () => {
  const d1 = new Animated.Value(0);
  const d2 = new Animated.Value(0);
  const d3 = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(d1, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(d2, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(d3, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.delay(500),
        Animated.parallel([
          Animated.timing(d1, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(d2, { toValue: 0, duration: 200, useNativeDriver: true }),
          Animated.timing(d3, { toValue: 0, duration: 200, useNativeDriver: true }),
        ]),
        Animated.delay(300),
      ])
    ).start();
  }, []);

  return (
    <View style={st.ldW}>
      <Text style={st.ld}>Loading</Text>
      <View style={st.dtC}>
        <Animated.Text style={[st.dt, { opacity: d1 }]}>.</Animated.Text>
        <Animated.Text style={[st.dt, { opacity: d2 }]}>.</Animated.Text>
        <Animated.Text style={[st.dt, { opacity: d3 }]}>.</Animated.Text>
      </View>
    </View>
  );
};

const st = StyleSheet.create({
  c: { flex: 1, backgroundColor: '#0d1117', justifyContent: 'center', alignItems: 'center' },
  ct: { alignItems: 'center', justifyContent: 'center', position: 'relative' },
  ttC: { alignItems: 'center', marginBottom: 40, shadowColor: '#ff6b35', shadowOffset: { width: 0, height: 0 }, shadowRadius: 20 },
  tt1: { fontSize: 48, fontWeight: '900', color: '#ff6b35', letterSpacing: 8, textShadowColor: '#ff6b35', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 10 },
  tt2: { fontSize: 32, fontWeight: '700', color: '#f39c12', letterSpacing: 12, marginTop: -8, textShadowColor: '#f39c12', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 8 },
  ballC: { marginBottom: 50 },
  ball: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#d35400', borderWidth: 3, borderColor: '#e67e22', position: 'relative', shadowColor: '#d35400', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.6, shadowRadius: 12 },
  l1: { position: 'absolute', top: 10, left: 38, width: 4, height: 60, backgroundColor: '#a0522d', borderRadius: 2 },
  l2: { position: 'absolute', top: 38, left: 10, width: 60, height: 4, backgroundColor: '#a0522d', borderRadius: 2 },
  l3: { position: 'absolute', top: 20, left: 20, width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#a0522d' },
  ldC: { marginBottom: 30 },
  ldW: { flexDirection: 'row', alignItems: 'center' },
  ld: { fontSize: 20, fontWeight: '600', color: '#00ff88', letterSpacing: 3, textShadowColor: '#00ff88', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5 },
  dtC: { flexDirection: 'row', marginLeft: 5 },
  dt: { fontSize: 24, color: '#00ff88', marginHorizontal: 2, textShadowColor: '#00ff88', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 5 },
  pgC: { alignItems: 'center', width: 250 },
  pgB: { width: '100%', height: 12, backgroundColor: '#1a1a2e', borderRadius: 6, borderWidth: 3, borderColor: '#00ff88', overflow: 'hidden', marginBottom: 10, shadowColor: '#00ff88', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 8 },
  pgF: { height: '100%', backgroundColor: '#00ff88', borderRadius: 2, shadowColor: '#00ff88', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8 },
  pgT: { fontSize: 18, color: '#00ff88', fontWeight: '700', letterSpacing: 2, textShadowColor: '#00ff88', textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 3, marginTop: 5 },
  sl: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 136, 0.03) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' },
});

export default Splash;
