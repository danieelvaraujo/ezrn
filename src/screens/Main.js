import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, ScrollView } from "react-native";

const MainScreen = ({ navigation, route }) => {
  const { photos } = route.params;

  const [fotos, setFotos] = useState([]);

  useEffect(() => {
    if (photos) {
      setFotos(photos);
    }
  }, [photos]);

  const renderImage = (item, i) => {
    return (
      <Image
        style={{ height: 100, width: 100, margin: 3 }}
        source={{ uri: item.uri }}
        key={i}
      />
    );
  };

  return (
    <View>
      <Button
        title="Open image browser"
        onPress={() => {
          navigation.navigate("ImageBrowser");
        }}
      />
      <ScrollView>
        <View style={{ flexDirection: "row", padding: 10 }}>
          {fotos.map((item, i) => renderImage(item, i))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MainScreen;

// export default class MainScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       photos: [],
//     };
//   }

//   componentDidUpdate() {
//     const { params } = this.props.route;
//     if (params) {
//       const { photos } = params;
//       if (photos) this.setState({ photos });
//       delete params.photos;
//     }
//   }

//   renderImage(item, i) {
//     return (
//       <Image
//         style={{ height: 100, width: 100 }}
//         source={{ uri: item.uri }}
//         key={i}
//       />
//     );
//   }

//   render() {
//     const { navigate } = this.props.navigation;

//     return (
//       <View>
//         <Button
//           title="Open image browser"
//           onPress={() => {
//             navigate("ImageBrowser");
//           }}
//         />
//         <ScrollView>
//           <View style={{ flexDirection: "row", padding: 10 }}>
//             {this.state.photos.map((item, i) => this.renderImage(item, i))}
//           </View>
//         </ScrollView>
//       </View>
//     );
//   }
// }

// import React, { useState, useEffect } from "react";
// import { View, Text, Button, Image, ScrollView } from "react-native";

// const MainScreen = ({ navigation, route }) => {
//   const { params } = route;
//   console.log(params);

//   const [fotos, setFotos] = useState([]);

//   useEffect(() => {
//     if (params.photos) {
//       setFotos(params.photos);
//     } else {
//       return;
//     }
//   }, [params]);

//   const renderImage = (item, i) => {
//     return (
//       <Image
//         style={{ height: 100, width: 100 }}
//         source={{ uri: item.uri }}
//         key={i}
//       />
//     );
//   };

//   return (
//     <View style={{ flex: 1 }}>
//       <Button
//         title="Open image browser"
//         onPress={() => navigation.navigate("ImageBrowser")}
//       />
//       <ScrollView>{fotos.map((item, i) => renderImage(item, i))}</ScrollView>
//     </View>
//   );
// };

// export default MainScreen;
