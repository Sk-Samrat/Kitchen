import React, {useState, useEffect} from 'react';
import constants from '../utils/constants';
import {WebView} from 'react-native-webview';
import {apiKeys} from '../services/serviceConstants';
import {getValue, userLog} from '../common/action/actions';
import {Loader} from '../common/components/customComponents';
import commonStyles from '../common/components/commonStyles';
const MODULE_NAME = 'TnC';
export const TnC = ({navigation}) => {
  useEffect(() => {
    _onLoad();
  }, []);
  const [loader, setLoader] = useState(false);
  const [policy, setPolicy] = useState('');
  const _onLoad = async () => {
    try {
      setLoader(true);
      let param = {
        [apiKeys.KEY_NAME]: 'tnc',
      };
      const response = await getValue(param);
      if (
        response.status &&
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        setPolicy(response.data.results[0]?.langValue);
        setLoader(false);
      } else {
        ShowErrorToast(constants.ERROR.GEN);
        setLoader(false);
        navigation.popToTop();
      }
    } catch (error) {
      await userLog(error.toString(), MODULE_NAME, 'user/getKeyValue');
      setLoader(false);
      ShowErrorToast(constants.ERROR.GEN);
      navigation.popToTop();
    }
  };
  return (
    <React.Fragment>
      <Loader isLoading={loader} />

      <WebView
        style={commonStyles.container}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{html: policy}}
      />
    </React.Fragment>
  );
};
export default TnC;
