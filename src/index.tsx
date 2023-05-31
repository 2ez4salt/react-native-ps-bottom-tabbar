import React, { FC, ReactNode } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Canvas,
  Circle,
  Path,
  Shadow,
  Skia as Skia,
  useValue,
  runTiming,
} from '@shopify/react-native-skia';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const SCREEN_WIDTH = Dimensions.get('window').width;
const DEPTH = 52;
const TABBAR_HEIGHT = 91;

type Props = BottomTabBarProps & {
  topAreaStyle?: {
    backgroundColor?: string
    shadowColor?: string
    shadowRate?: number
  }
  bottomAreaStyle?: {
    backgroundColor?: string
    shadowColor?: string
    shadowRate?: number
  }
  selectorStyle?: {
    backgroundColor?: string
    shadowColor?: string
  }
}

export const PSBottomTabBar: FC<Props> = ({
    state,
    navigation,
    descriptors,
    selectorStyle = { backgroundColor: '#fff', shadowColor: '#305F84' },
    topAreaStyle = {
      backgroundColor: '#1E1F23',
      shadowColor: '#000',
      shadowRate: 2,
    },
    bottomAreaStyle = {
      backgroundColor: '#1B1C1E',
      shadowColor: '#000',
      shadowRate: 2,
    },
  }) => {
    if (state.routes.length !== 5) {
      throw new Error('[PS-BOTTOM-TABBAR]: There must be 5 routes');
    }
    const { bottom: bottomSafe } = useSafeAreaInsets();
    const firstCircleR = 650;

    const selector = Skia.Path.Make();
    selector.moveTo(0, TABBAR_HEIGHT - 8);
    selector.quadTo(
      SCREEN_WIDTH / 2 - 13,
      TABBAR_HEIGHT - DEPTH - 13, SCREEN_WIDTH,
      TABBAR_HEIGHT - 8,
    );

    const selectorStart = useValue(.06);
    const selectorEnd = useValue(.17);

  const calculateY = (index: number) => {
    if (index == 2) {
      return (TABBAR_HEIGHT / 2) + 32;
    } else if (index == 3 || index == 1) {
      return (TABBAR_HEIGHT / 2) + 24;
    } else {
      return (TABBAR_HEIGHT / 2) + 12;
    }
  };

  const selectorPositions = [
    {
      selectorStartPosition: .06,
      selectorEndPosition: .18,
    },
    {
      selectorStartPosition: .25,
      selectorEndPosition: .37,
    },
    {
      selectorStartPosition: .44,
      selectorEndPosition: .56,
    },
    {
      selectorStartPosition: .63,
      selectorEndPosition: .75,
    },
    {
      selectorStartPosition: .82,
      selectorEndPosition: .94,
    },
  ];


  const onPress = async (route, index: number) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      const isFocused = state.index === index;
      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
        runTiming(selectorStart, selectorPositions[index].selectorStartPosition, { duration: 200 });
        runTiming(selectorEnd, selectorPositions[index].selectorEndPosition, { duration: 200 });
      }
    };

    return (
      <View style={[styles.container, { height: TABBAR_HEIGHT + bottomSafe }]}>
        <Canvas style={{ flex: 1 }}>
          <Circle opacity={.85} cx={SCREEN_WIDTH / 2} cy={firstCircleR} r={firstCircleR}
                  color={topAreaStyle.backgroundColor}>
            {
              [...Array(topAreaStyle.shadowRate)].map((_, index) => {
                return (
                  <Shadow key={index} dx={-15} dy={0} blur={45} color={topAreaStyle.shadowColor as string} inner />
                );
              })
            }
          </Circle>
          <Circle cx={SCREEN_WIDTH / 2} cy={firstCircleR} r={firstCircleR - DEPTH}
                  color={bottomAreaStyle.backgroundColor as string}>
            {
              [...Array(bottomAreaStyle.shadowRate)].map((_, index) => {
                return (
                  <Shadow key={index} dx={0} dy={0} blur={24} color={bottomAreaStyle.shadowColor as string} inner />
                );
              })
            }
          </Circle>
          <Path
            path={selector}
            color={selectorStyle.backgroundColor}
            style='stroke'
            strokeWidth={4}
            start={selectorStart}
            end={selectorEnd}
          >
            <Shadow dx={-5} dy={-5} blur={15} color={selectorStyle.shadowColor as string} />
            <Shadow dx={-7} dy={-4} blur={8} color={selectorStyle.shadowColor as string} />
            <Shadow dx={5} dy={-5} blur={8} color={selectorStyle.shadowColor as string} />
            <Shadow dx={7} dy={-4} blur={8} color={selectorStyle.shadowColor as string} />
          </Path>

        </Canvas>
        <View style={styles.tabIcons}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key] || {};
            return (
              <TabIcon
                key={index}
                onPress={() => onPress(route, index)}
                icon={options?.tabBarIcon as ReactNode}
                position={{
                  x: (SCREEN_WIDTH / 5 * index) + 24,
                  y: (TABBAR_HEIGHT) - calculateY(index),
                }}
              />
            );
          })}
          <View style={[styles.textWrapper, {
            bottom: bottomSafe || 8,
          }]}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 16 }}>
              {state.routes[state.index]?.name}
            </Text>
          </View>
        </View>
      </View>
    );
  }


const TabIcon = ({
 position,
 onPress,
 icon,
}: {
position: { x: number, y: number },
onPress: () => void,
icon: ReactNode
}) => {
  return (
    <TouchableOpacity
      hitSlop={{
        top: 12,
        left: 12,
        bottom: 12,
        right: 12,
      }}
      onPress={onPress}
      style={[styles.icon, {
        top: position.y,
        left: position.x,
      }]}>
      {icon}
    </TouchableOpacity
    >
  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: SCREEN_WIDTH,
  },
  tabIcons: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  icon: {
    flex: 1,
    position: 'absolute',
    zIndex: -1,
    width: 36,
    height: 36,
  },
  textWrapper: {
    position: 'absolute',
    right: 0,
    left: 0,
  },
});
