import { Fragment } from 'react';
import Navbar from '../components/Navbar';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
      </Provider>
    </Fragment>
  );
}

export default MyApp;
