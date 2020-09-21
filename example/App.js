import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";

import Rotary from "react-native-rotary";

export default function App() {
  const [index, setIndex] = useState(1);
  const [data, setData] = useState([
    'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F929108%252F46c9313d-32d0-4da8-8d41-f5e50936a926.png%252Ffull-fit-in__950x534.png?signature=_R0yeIihD3oDvF1bulncd718gR0=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
    'https://cdn-01.independent.ie/incoming/article34131003.ece/bcec2/AUTOCROP/w620/Hugging%20Face.png',
    'https://i2.wp.com/www.emojifoundation.com/wp-content/uploads/2017/07/Thinking_Face_Emoji.png',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Unamused_Face_Emoji_761d8bf8-c78c-45b1-80b1-a86a80d2452d_grande.png?v=1480481058',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Cold_Sweat_Emoji_grande.png?v=1480481051',
    'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidphelan%2Ffiles%2F2017%2F07%2Femoji_update_2017_10.jpg',
    'https://cdn.shopify.com/s/files/1/1061/1924/products/Face_with_Cold_Sweat_Emoji_grande.png?v=1480481052',
    'https://www.dictionary.com/e/wp-content/uploads/2018/03/Upside-Down_Face_Emoji.png',
  ]);

  // XXX: Test dynamic loading.
  //useEffect(
  //  () => {
  //    setTimeout(
  //      () => setData([
  //        'https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F929108%252F46c9313d-32d0-4da8-8d41-f5e50936a926.png%252Ffull-fit-in__950x534.png?signature=_R0yeIihD3oDvF1bulncd718gR0=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com',
  //        'https://cdn-01.independent.ie/incoming/article34131003.ece/bcec2/AUTOCROP/w620/Hugging%20Face.png',
  //        'https://i2.wp.com/www.emojifoundation.com/wp-content/uploads/2017/07/Thinking_Face_Emoji.png',
  //        'https://cdn.shopify.com/s/files/1/1061/1924/products/Unamused_Face_Emoji_761d8bf8-c78c-45b1-80b1-a86a80d2452d_grande.png?v=1480481058',
  //        'https://cdn.shopify.com/s/files/1/1061/1924/products/Cold_Sweat_Emoji_grande.png?v=1480481051',
  //        'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fdavidphelan%2Ffiles%2F2017%2F07%2Femoji_update_2017_10.jpg',
  //        'https://cdn.shopify.com/s/files/1/1061/1924/products/Face_with_Cold_Sweat_Emoji_grande.png?v=1480481052',
  //        'https://www.dictionary.com/e/wp-content/uploads/2018/03/Upside-Down_Face_Emoji.png',
  //      ]),
  //      1000,
  //    ); 
  //  },
  //  [setData],
  //);

  return (
    <View style={StyleSheet.absoluteFill}>
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
    </View>
  );
}
