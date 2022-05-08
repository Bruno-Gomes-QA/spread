import React from 'react'
import data from './data';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  Text,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  withTiming,
  interpolate,
  useDerivedValue,
  withRepeat,
  withSpring,
  Extrapolate,
} from 'react-native-reanimated';
import styled from  'styled-components'

export const TouchableOpacity = styled.TouchableOpacity`
`;

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const width = 300
const _itemWidth = width * 0.6;
const _itemHeight = _itemWidth * 1.69;
const _spacing = 10;
const _itemWidthWithSpacing = _itemWidth + _spacing * 2;

function Item({ item, index, scrollX, activeIndex }) {
  const navigation = useNavigation();
  const currentIndex = useDerivedValue(() => {
    return scrollX.value / _itemWidthWithSpacing;
  });

  const inputRange = React.useMemo(() => [index - 1, index, index + 1]);

  const imageStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentIndex.value,
        inputRange,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP
      ),
      transform: [
        {
          scale: interpolate(
            currentIndex.value,
            inputRange,
            [0.2, 1, 0],
            Extrapolate.CLAMP
          ),
        },
        {
          translateY:
            activeIndex.value === currentIndex.value
              ? withRepeat(
                  withTiming(-_spacing, { duration: 2000 }),
                  Infinity,
                  true
                )
              : withSpring(
                  interpolate(
                    currentIndex.value,
                    inputRange,
                    [_spacing * 4, -_spacing * 2, _spacing * 4],
                    Extrapolate.CLAMP
                  )
                ),
        },
      ],
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(
              currentIndex.value,
              inputRange,
              [_itemHeight * 0.8, _itemHeight * 0.5, _itemHeight * 0.8],
              Extrapolate.CLAMP
            )
          ),
        },
      ],
    };
  });

  const wrapperStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            currentIndex.value,
            inputRange,
            [_itemHeight * 0.1, 0, _itemHeight * 0.1],
            Extrapolate.CLAMP
          ),
        },
      ],
    };
  });
  return (
        <Animated.View
            style={[
                {
                width: _itemWidth,
                margin: _spacing,
                height: _itemHeight,
                overflow: 'hidden',
                borderRadius: 24,
                },
                wrapperStyle,
            ]}>
                <TouchableOpacity
                    onPress={() => navigation.navigate(item.nav)}
                    style={{
                    flex: 1,
                    padding: _spacing * 2.5,
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    }}>
                    <Animated.View
                    style={[
                        {
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                        flex: 1,
                        borderRadius: 24,
                        backgroundColor: '#FD8033',
                        },
                        containerStyle,
                    ]}
                    />
                    <View style={{ alignItems: 'center' }}>
                    <Animated.Image
                        source={{ uri: item.icon }}
                        style={[
                        {
                            width: _itemWidth,
                            height: _itemWidth,
                            marginBottom: _spacing,
                        },
                        imageStyle,
                        ]}
                    />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color:'#FFF' }}>{item.name}</Text>
                    </View>
                </TouchableOpacity>
        </Animated.View> 
  );
}

export function TabBarOptions() {
    const scrollX = useSharedValue(0);
    const activeIndex = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler({
      onMomentumBegin: (ev) => {
        activeIndex.value = -1;
      },
      onMomentumEnd: (ev) => {
        activeIndex.value = Math.floor(
          ev.contentOffset.x / _itemWidthWithSpacing
        );
      },
      onScroll: (ev) => {
        scrollX.value = ev.contentOffset.x;
      },
    });
  
    return (  
          <AnimatedFlatList
              data={data}
              keyExtractor={(item) => item.key}
              style={{ flexGrow: 0 }}
              horizontal
              onScroll={onScroll}
              scrollEventThrottle={16}
              snapToInterval={_itemWidthWithSpacing}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
              paddingHorizontal: (width - _itemWidthWithSpacing) / 2,
              }}
              decelerationRate="fast"
              renderItem={({ item, index }) => {
              return (
                <Item
                    item={item}
                    index={index}
                    scrollX={scrollX}
                    activeIndex={activeIndex}
                /> 
              );
              }}
          />
    );
  }