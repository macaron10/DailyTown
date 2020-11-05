import * as Google from 'expo-google-app-auth';
import * as SecureStore from 'expo-secure-store';
import * as env from '../env';

export async function logout() {
  const accessToken = await SecureStore.getItemAsync('access_token')
  await Google.logOutAsync({ accessToken, androidClientId: env.AND_KEY}); // 나중에 따로 config 설정해줘야함
  // ------------------------ access token 만료 확인용 -------------------------------
  // let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
  //   headers: { Authorization: `Bearer ${accessToken}` },
  // })
  // .then(
  //   res => res.json()
  // )
  // .then(
  //   json => {console.log(json)}
  // );
  await SecureStore.deleteItemAsync('token')
  await SecureStore.deleteItemAsync('access_token')
}