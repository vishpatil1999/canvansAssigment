// import React, {useRef} from 'react';
// import { StyleSheet, View, Button } from 'react-native';
// import SignatureScreen from 'react-native-signature-canvas';

// const Sign = ({onOK}) => {
//   const ref = useRef();
//   console.log("onOK====",onOK)
//   const handleSignature = signature => {
//     console.log("signatayurennrn========",signature);
//      onOK(signature)
//   };

//   const handleClear = () => {
//     console.log("inside this")
//     ref.current.clearSignature();
//   }

//   const handleConfirm = () => {
//     console.log("end");
//     ref.current.readSignature();
//   }

//   const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

//   return (
//     <View style={styles.container}>
//       <SignatureScreen
//           ref={ref}
//           onOK={handleSignature} 
//           webStyle={style}
//       />
//       <View style={styles.row}>
//         <Button
//             title="Clear"
//             onPress={handleClear}
//         />
//         <Button
//           title="Confirm"
//           onPress={handleConfirm}
//         />
//       </View>
//     </View>
//   );
// }

// export default Sign;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 250,
//     padding: 10,
//   },
//   row: {
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: 'space-between',
//     width: '100%',
//     alignItems: 'center',
//   }
// });

import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Signature from "react-native-signature-canvas";

export const Sign = () => {
    const [signature, setSign] = useState(null);
    console.log("signature--------", signature)
    const handleOK = (signature) => {
        console.log(signature);
        setSign(signature);
    };

    const handleEmpty = () => {
        console.log("Empty");
        setSign(null)
    };

    const handleClear = () => {
        console.log("clear success!");
        setSign(null)
    }; 

    const style = `
      .m-signature-pad {
        background-color: blur
        font-size: 10px;
        width: auto;
        height:auto
        min-width: 250px;
        min-height: 600px;
        margin: 0;
        border: 1px solid #e8e8e8;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.08) inset;
      }
     .m-signature-pad--footer {
        position: absolute;
        left: 1px;
        right: 1px;
        bottom: 20px;
        height: 40px;
      }
      .m-signature-pad--footer
      .button {
        background-color: #eb6a2d;
        color: #FFF;
      }
    `;
    return (
        <View style={{ flex: 1 }}>
            <Signature
                onOK={handleOK}
                onEmpty={handleEmpty}
                onClear={handleClear}
                descriptionText="Please Sign here"
                clearText="Clear"
                confirmText="Save"
                webStyle={style}
            />
            {/* {signature ? (
        <View style={{marginTop:100}}>
          <Image
            resizeMode={"contain"}
            style={{ width: 200, height: 100 }}
            source={{ uri: signature }}
          />
          </View>
        ) : null} */}
        </View>
    );
};

const styles = StyleSheet.create({
    preview: {
        width: 400,
        height: 114,
        backgroundColor: "#F8F8F8",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    previewText: {
        color: "#FFF",
        fontSize: 14,
        height: 40,
        lineHeight: 40,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: "#69B2FF",
        width: 120,
        textAlign: "center",
        marginTop: 10,
    },
});