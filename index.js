import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Platform, Animated, PanResponder } from 'react-native';
import AnimatedMath from 'react-native-animated-math';

const getIndex = (animRotate, data) => {
  const dir = Math.sign(animRotate.__getValue());
  const pct = animRotate.__getValue() / (2 * Math.PI);
  const i = Math.round(data.length * pct) % data.length;
  const j = data.length - i;
  const k = j >= data.length ? 0 : j;
  const l = dir * i;
  return dir >= 0 ? k : l;
};

const shouldRest = (animRotate, data, duration) => {
  animRotate.flattenOffset();
  const d = Math.PI * 2 / data.length;
  Animated
    .timing(
      animRotate,
      {
        toValue:  Math.round(animRotate.__getValue() / d) * d,
        duration,
        useNativeDriver: Platform.OS !== 'web',
      },
    )
    .start(
      () => animRotate.extractOffset(),
    );
};

const Rotary = ({ radius, data, renderItem, index, onIndexChanged, duration, style, ...extraProps }) => {
  const [ animRotate ] = useState(
    new Animated.Value(
      -1 * index * Math.PI * 2 / data.length,
    ),
  );
  const [ panResponder ] = useState(
    PanResponder
      .create(
        {
          onStartShouldSetPanResponder: () => true,
          onPanResponderTerminationRequest: () => false,
          onShouldBlockNativeResponder: () => true,
          onPanResponderGrant: (evt, gestureState) => {
            animRotate.extractOffset();
          },
          onPanResponderMove: (evt, gestureState) => {
            const { dx } = gestureState;
            const v = (dx / radius);
            animRotate.setValue(
              v,
            );
          },
          onPanResponderRelease: (evt, gestureState) => {
            onIndexChanged(getIndex(animRotate, data));
            shouldRest(animRotate, data, duration);
          },
          onPanResponderTerminate: (evt, gestureState) => {
            onIndexChanged(getIndex(animRotate, data));
            shouldRest(animRotate, data, duration);
          },
        },
      )
  );
  const [ anim ] = useState(
    data.map(
        (item, index, { length }) => {
          const offsetRotate = Animated
            .add(
              animRotate,
              Math.PI,
            );
          const scale = AnimatedMath
            .sinus(
              Animated.diffClamp(
                Animated.modulo(
                  Animated.add(
                    Animated.add(
                      offsetRotate,
                      -1 * Math.PI / 2,
                    ),
                    index / length * 2 * Math.PI,
                  ),
                  Math.PI * 2,
                ),
                -radius,
                radius,
              ),
            );
          return (
            <Animated.View
              key={index}
              style={{
                opacity: scale,
                position: 'absolute',
                transform: [
                  { translateX: Animated
                      .add(
                        Animated.multiply(
                          radius,
                          AnimatedMath
                            .cosinus(
                              Animated
                                .add(
                                  (index / length) * Math.PI * 2 + Math.PI / 2,
                                  offsetRotate,
                                ),
                            ),
                        ),
                        radius * 0.5,
                      )},
                  { translateY: Animated
                      .add(
                        Animated.multiply(
                          radius,
                          AnimatedMath
                            .sinus(
                              Animated
                                .add(
                                  (index / length) * Math.PI * 2 + Math.PI / 2,
                                  offsetRotate,
                                ),
                            ),
                        ),
                        radius,
                      )},
                  { scale }
                ],
              }}
            >
              {renderItem({ item, index })}
            </Animated.View>
          );
        }
      )
  );
  useEffect(
    () => {
      const curr = getIndex(animRotate, data);
      if (index !== curr) {
        animRotate.flattenOffset();
        Animated
          .timing(
            animRotate,
            {
              toValue: -1 * index * Math.PI * 2 / data.length,
              duration,
              useNativeDriver: Platform.OS !== 'web',
            },
          )
          .start();
      }
    },
    [ index ],
  );
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        style,
        {
          width: radius * 2,
          height: radius,
        }
      ]}
    >
      {anim}
    </Animated.View>
  );
};

Rotary.propTypes = {
  radius: PropTypes.number,
  data: PropTypes.arrayOf(
    PropTypes.any,
  ),
  renderItem: PropTypes.func,
  index: PropTypes.number,
  onIndexChanged: PropTypes.func,
  duration: PropTypes.number,
  style: PropTypes.shape({}),
};

Rotary.defaultProps = {
  radius: 60,
  data: [],
  renderItem: ({ item, index }) => null,
  index: 0,
  onIndexChanged: (index) => null,
  duration: 300,
  style: {
    overflow: 'hidden',
  },
};

export default Rotary;
