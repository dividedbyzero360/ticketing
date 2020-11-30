import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  console.log('Inside _app.js', Object.keys(appContext));
  console.log(appContext.Component);

  const client = buildClient(appContext.ctx);
  const { data } = await client.get('/api/users/currentuser');
  // Commenting to test if doesn't work out uncomment it

  // let pageProps = {};
  // if (appContext.Component.getInitialProps) {
  //   pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  // }
  // return {
  //   pageProps,
  //   ...data,
  // };

  return {
    pageProps: { ...data },
    ...data,
  };
};

export default AppComponent;
