import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions } from 'react-native';
import styled  from 'styled-components';

export const TouchableOpacity = styled.TouchableOpacity`
`
const {width, height} = Dimensions.get('screen');
const bgs = ['#F65E00', '#FF8514', '#FFAF28'];
const DATA = [
  {
    "key": "1",
    "title": "Iniciando no Spread",
    "description": "Este código é recomendado para quem está começando agora",
    "image": 'https://firebasestorage.googleapis.com/v0/b/spread-349216.appspot.com/o/SpreadCodes%2FInitSpreadCode.png?alt=media&token=2578bcd1-0aa6-4c39-9a9c-1ab320a847f3'
  },
  {
    "key": "2",
    "title": "Já conheço o Spread",
    "description": "Recomendado para quem já experimentou o Spread, sendo o código com maior custo benefício",
    "image": 'https://firebasestorage.googleapis.com/v0/b/spread-349216.appspot.com/o/SpreadCodes%2FExperienceSpreadCode.png?alt=media&token=069761b6-3d11-4f32-88ca-292005274811'
  },
  {
    "key": "3",
    "title": "Influenciador Digital",
    "description": "Este código é recomendado para influenciadores digitais que querem ingressar no Spread",
    "image": 'https://firebasestorage.googleapis.com/v0/b/spread-349216.appspot.com/o/SpreadCodes%2FInfluencerSpreadCode.png?alt=media&token=c8ad2e0d-793c-4b46-9b5d-730f6804dc8c'
  },
]

export function SlideCodeView() {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const inputRange = DATA.map((_, i) => i * width);
  const backgroundColor = scrollX.interpolate({
    inputRange,
    outputRange: bgs
  })

  const YOLO = Animated.modulo(
    Animated.divide(
        Animated.modulo(scrollX, width),
        new Animated.Value(width)
    ),
    1
  )

  const rotate = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: ['35deg', '-35deg', '35deg']
  })
  const translateX = YOLO.interpolate({
    inputRange: [0, .5, 1],
    outputRange: [0, -height, 0]
  })
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <StatusBar backgroundColor={'transparent'} translucent={true} barStyle={'dark-content'}/>
      <Animated.View
        style={[StyleSheet.absoluteFillObject, {
          backgroundColor,
        }]}
      />
      <Animated.View
        style={{width: height * .55, height: height * .55, marginTop: 10, borderRadius: 96, backgroundColor: 'rgba(255,255,255,0.9)', position: 'absolute', top: -height * .2, left: -height * .1,
        transform: [{
          translateX
        },{
          rotate
        }]}}
      />


      <Animated.FlatList
        data={DATA}
        scrollEventThrottle={32}
        showsHorizontalScrollIndicator={false}
        style={{paddingBottom: height * .25}}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        keyExtractor={item => item.key}
        pagingEnabled
        horizontal
        renderItem={({item}) => {
          return <View style={{width, justifyContent: 'center', height: '100%'}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Image source={{uri: item.image}} style={{width: width / 1.1, height: width / 1.1 , resizeMode: 'contain'}}/>
            </View>
            <View style={{padding: 20}}>
              <Text style={{color: '#fff', fontWeight: '800', fontSize: 28, paddingVertical: 10}} numberOfLines={2} adjustsFontSizeToFit>{item.title}</Text>
              <Text style={{color: '#fff', fontWeight: '400', fontSize: 16}}>{item.description}</Text>
            </View>
          </View>
        }}
      />
      <View style={{position: 'absolute', bottom: 0, height: height * .25, padding: 20, width, justifyContent: "space-between"}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={() => {navigation.navigate('Home')}}>
          <View style={{paddingVertical: 16, paddingHorizontal: 22, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.8)'}}>
              <Text style={{fontSize: 16, fontWeight: '400', opacity: .9, letterSpacing: 1}}>Selecionar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 20}}>
          {DATA.map((_, i) => {
            const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
            const scale = scrollX.interpolate({
              inputRange,
              outputRange: [1, 1.5, 1],
              extrapolate: 'clamp'
            })
            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [.6, 1, .6],
              extrapolate: 'clamp'
            })
            return <Animated.View
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                margin: 8,
                opacity,
                backgroundColor: '#fff',
                transform: [{
                  scale
                }]
              }}
            />
          })}
        </View>
      </View>
    </View>
  );
}