# 🕰️  react-native-rotary
A `<Rotary />` component for React Native, compatible with Android, iOS and Web, powered by [react-native-animated-math](https://github.com/rastapasta/react-native-animated-math).

<p align="center">
  <img src="./bin/out.gif" width="398" height="266">
</p>

This project supports [Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning).

## 🚀 Getting Started

Using [`npm`]():

```shell
npm install --save react-native-rotary
```

Using [`yarn`]():

```shell
yarn add react-native-rotary
```

### 🔥 Features
  - Dynamic paginated rotation control via the `index` prop.
  - Smoothly animated infinite content loops, without the need for duplicate entries, scroll limits or jitter.

## ✍️ Example

This component emulates the configuration of a [`<FlatList />`](https://facebook.github.io/react-native/docs/flatlist).

```javascript
import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Rotary from 'react-native-rotary';
 
export default () => {
  // You can define an initial index offset, and render arbitrary child elements.
  const [ index, setIndex ] = useState(1);
  return (
    <View
      style={[
        StyleSheet.absoluteFill,
        {
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <Rotary
        index={index}
        onIndexChanged={setIndex}
        radius={100}
        data={data}
        renderItem={({ item: uri, index }) => (
          <View
            style={{
              width: 100,
              height: 100,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{
                width: 80,
                height: 80,
              }}
              source={{ uri }}
            />
          </View>
        )}
      />
      <View
        style={{
          width: 50,
          height: 50,
        }}
      />
    </View>
  );
};
 
const data = [
  'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F929108%252F46c9313d-32d0-4da8-8d41-f5e50936a926.png%252Ffull-fit-in__950x534.png?signature=_R0yeIihD3oDvF1bulncd718gR0=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
  'https://cdn-01.independent.ie/incoming/article34131003.ece/bcec2/AUTOCROP/w620/Hugging%20Face.png',
  'https://i2.wp.com/www.emojifoundation.com/wp-content/uploads/2017/07/Thinking_Face_Emoji.png',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Unamused_Face_Emoji_761d8bf8-c78c-45b1-80b1-a86a80d2452d_grande.png?v=1480481058',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Cold_Sweat_Emoji_grande.png?v=1480481051',
  'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidphelan%2Ffiles%2F2017%2F07%2Femoji_update_2017_10.jpg',
  'https://cdn.shopify.com/s/files/1/1061/1924/products/Face_with_Cold_Sweat_Emoji_grande.png?v=1480481052',
  'https://www.dictionary.com/e/wp-content/uploads/2018/03/Upside-Down_Face_Emoji.png',
];
```

## 📌 Props

-----
Prop                  | Type     | Default                   | Required | Description
--------------------- | -------- | ------------------------- | -------- | -----------
radius|number|60|No|The radius of the circle the rendered items will render around.
data|arrayOf[object Object]|[]|No|The data source to render.
renderItem|func|({ item, index }) => null|No|A function to render an item from `data`.
index|number|0|No|The currently focused index.
onIndexChanged|func|(index) => null|No|Callback for when the index has changed.
duration|number|300|No|The animation duration when rendered items are realigned.
minSwipe|number|0|No|The minimum amount of distance to drag before rotating.
style|object|0|No|Additional styling.

## ✌️ License
[MIT]()
