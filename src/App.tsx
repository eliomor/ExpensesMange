import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider} from 'react-redux';

import {store} from '~/redux/store';
import Router from '~/router';

const App: React.FC = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <Router />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
