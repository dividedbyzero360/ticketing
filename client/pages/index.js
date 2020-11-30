import axios from 'axios';
import buildClient from '../api/build-client';

const LandingPage = ({ currentUser }) => {
  console.log('Landing page');
  return currentUser ? (
    <h1>You're signed in</h1>
  ) : (
    <h1>You're not signed in</h1>
  );
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get('/api/users/currentuser');
  return data;
};

/*  Keeping this deadcode for learning purpose
// This getIntialProps won't work if we have a getInitialProps in the _app.js page
// This method is mostly called from next.js server but in one particular scenario
//(When we came to this page by clicking on an url while on the app) it is called from the browser
LandingPage.getInitialProps = async () => {
  if (typeof window === 'undefined') {
    console.log('We are making a request from the server');
    // request should be made to http://SERVICENAME.NAMESPACE.svc.cluster.local
    // We get the url by 1. kubectl get namespace 2. kubectl get services -n ingress-nginx (= ingress-nginx-controller [The one that is of type load balancer])

    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: {
          Host: 'ticketing.dev',
        },
      }
    );
    return data;
  } else {
    console.log('We are making a request from the browser');
    // request should be made with a base url of ''
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};
*/

export default LandingPage;
