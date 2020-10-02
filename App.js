import React from "react";
import { Text,StyleSheet ,View, TextInput, Button, Alert,label } from "react-native";
import FilePickerManager from 'react-native-file-picker';
import axios from "axios";
import FormData from 'form-data';
var RNFS = require('react-native-fs');

var data = {
  url:null,
  correo:null,
  video:null
}

const showPicker = ()=>{  
  FilePickerManager.showFilePicker(null, (response) => {
      console.log('Response = ', response);     
      if (response.didCancel) {
        console.log('User cancelled file picker');
      }
      else if (response.error) {
        console.log('FilePickerManager Error: ', response.error);
      }
      else {
        data.video=response.path;
        return response.path;
      }
  }); 
}

const onSubmit = () => {
  const file = {
    uri: data.video,           
    name: 'video.mp4',          
    type :'video/mp4'          
  }
  var formdata = new FormData();
  formdata.append("video", file);
  formdata.append("correo", data.correo);  
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };  
  fetch(`http://${data.url}:3000`, requestOptions)
  .then((response) => {
      Alert.alert(
        "Competado",
        "enviado con exito",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    }).catch((error) => {
      console.log(error)
      Alert.alert(
        "ocurrio un error",
        "un error inesperadisimo ocurio (la verdad no sirvio :( )",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false }
      );
    });

  // const data = new FormData()
  // data.append('video', file);
  // data.append('correo', 'jhon.rodriguez04@uptc.edu.co');

  // var config = {
  //   method: 'post',
  //   url: `http://${data.url}:3000`,
  //   headers: { 
  //     ...data.getHeaders()
  //   },
  //   data : data
  // };
  // axios(config)
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  // body.append('correo', data.correo);
  // body.append('video', file); 
  
  // fetch(`http://${data.url}:3000`, {
  //   method: 'POST',
  //   headers: { 
  //     ...body.getHeaders()
  //   },
  //   body:body
  // }).then((response) => {
  //   Alert.alert(
  //     "Competado",
  //     "dasdasdasd*******",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   );
  // }).catch((error) => {
  //   console.log(error)
  //   Alert.alert(
  //     "ocurrio un error",
  //     "dasdasdasdad",
  //     [
  //       {
  //         text: "Cancel",
  //         onPress: () => console.log("Cancel Pressed"),
  //         style: "cancel"
  //       },
  //       { text: "OK", onPress: () => console.log("OK Pressed") }
  //     ],
  //     { cancelable: false }
  //   );
  // });
}


export default function App() {  
  
  return (
    <View style={{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
      <Text style={styles.title} >Direccion ip</Text>             
      <TextInput
        style={styles.input}     
        onChangeText={value => data.url=value}
        keyboardType='number-pad'
        placeholder= '162.168...'        
      />   
      <Text style={styles.title} >Correo</Text>               
      <TextInput
        style={styles.input}    
        onChangeText={value => data.correo=value}
        keyboardType='email-address'
        placeholder= 'user@example.com'
      />       
      <Text style={styles.title} >video</Text>               
      <Button style={styles.button} title="selecionar archivo" onPress={()=>showPicker()} />     
      <Button style={styles.button} title="enviar" onPress={()=>onSubmit()} />           
    </View>    
  );
}

const styles = StyleSheet.create({
  label:{},
  input:{
    borderWidth: 2,
    borderColor: "#20232a",
    borderRadius: 6,
    margin:10,
    marginTop:20,
    marginBottom:5
  },
  button:{
    marginLeft:30,
    color: "#eaeaea"
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 0,
    paddingVertical: 8,    
    borderRadius: 6,    
    color: "#20232a",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
  }
});
