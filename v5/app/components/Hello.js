import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import AppID from 'ibmcloud-appid-js';
import {
  readItems,
  queryItems,
  createItem,
  deleteItem
} from './BackendAccessor';

const Hello = () => {
  //. AppID
  const appID = React.useMemo( () => {
    return new AppID()
  }, [] );

  const [itemsData, setItemsData] = useState([]);

  const onInit = async () => {
    try{
      const results = await readItems();
      setItemsData( results );
    }catch( err ){
      console.log( err );
    }
  };

  ( async () => {
    try{
      onInit().then( () => {} );

      await appID.init({
        //. 環境変数を取得して指定する
        clientId: process.env.REACT_APP_APPID_CLIENTID,
        discoveryEndpoint: process.env.REACT_APP_APPID_ENDPOINT
      });
    }catch( e ){
      //setErrorState( true );
      //setErrorMessage( e.message );
    }
  })();
  /*
  ( async() => {
    try{
      await onInit();
    }catch( e ){
      console.log( e );
    }
  });
  */
  /*
  onInit().then( () => {} );
  */
  /*
  onInit();
  */

  const [loginButtonDisplayState, setLoginButtonDisplayState] = React.useState( true );
  const [userName, setUserName] = React.useState( '' );
  const loginAction = async () => {
    try{
      const tokens = await appID.signin();
      //setErrorState( false );
      setLoginButtonDisplayState( false );
      setUserName( tokens.idTokenPayload.name );
    }catch( e ){
      //setErrorState( true );
      //setErrorMessage( e.message );
    }
  };
  const logoutAction = async () => {
    try{
      await appID.signout();
      //setErrorState( false );
      setLoginButtonDisplayState( true );
      setUserName( '' );
    }catch( e ){
      //setErrorState( true );
      //setErrorMessage( e.message );
    }
  };


  const [inputKey, setInputKey] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputPrice, setInputPrice] = useState(0);
  const onPressQuery = async () => {
    try{
      const results = await queryItems( inputKey );
      console.log( results );
      setItemsData( results );  //. ?
    }catch( err ){
      console.log( err );
    }
  };
  const onPressCreate = async () => {
    try{
      const result = await createItem( inputName, inputPrice, userName );
      setInputName( '' );
      setInputPrice( 0 );
      onInit();
    }catch( err ){
      console.log( err );
    }
  };
  const onPressDelete = async (id) => {
    try{
      const result = await deleteItem( id );
      onInit();
    }catch( err ){
      console.log( err );
    }
  };

  return (
    <View style={styles.container}>
      <View style={{textAlign: 'right'}}>
        {loginButtonDisplayState && <button onClick={loginAction} id="login" style={{fontSize: '24px', backgroundColor: 'skyblue', border: 'none', cursor: 'pointer'}}>Login</button>}
        {!loginButtonDisplayState && <button onClick={logoutAction} id="logout" style={{fontSize: '24px', backgroundColor: 'skyblue', border: 'none', cursor: 'pointer'}}>Logout</button>}
      </View>
      <View style={styles.row}>
        <TextInput
          label="検索キー"
          value={inputKey}
          style={styles.input}
          onChangeText={text => setInputKey(text)}
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={ () => onPressQuery()}
        >
          検索
        </Button>
      </View>

      <View style={styles.row}>
      <div>
        <table border="1">
          <thead>
            <th>#</th><th>name</th><th>price</th><th>username</th><th>action</th>
          </thead>
          <tbody>
            {itemsData.map( (item) => 
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>{item.username}</td>
              <td>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={ () => onPressDelete(item.id)}
                >
                  削除 
                </Button>
              </td>
            </tr>
            )}
            <tr>
              <td> - </td>
              <td>
                <TextInput
                  label="商品名"
                  value={inputName}
                  style={styles.input}
                  onChangeText={text => setInputName(text)}
                />
              </td>
              <td>
                <TextInput
                  label="価格"
                  value={inputPrice}
                  style={styles.input}
                  onChangeText={text => setInputPrice(parseInt(text))}
                />
              </td>
              <td>{userName}</td>
              <td>
                <Button
                  mode="contained"
                  style={styles.button}
                  onPress={() => onPressCreate()}
                >
                  追加
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '5px'
  },
  inputText: {
    margin: 10,
    padding: 10,
    maxWidth: 600,
    backgroundColor: 'lightgreen',
    borderRadius: 5
  },
  input: {
    margin: '5px'
  },
  button: {
    margin: '5px'
  }
});

export default Hello;
