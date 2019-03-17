import React, { Suspense } from 'react';
import { unstable_createResource } from 'react-cache';

const API_ENDPOINT = 'https://react-lazy-image-dn2p9ee8rl58.runkit.sh';

const styles = {
  image: {
    width: 'auto',
    height: '100vh'
  }
}

const fetcher = () => fetch(API_ENDPOINT).then(response => response.json());

const imageResource = unstable_createResource(fetcher);

const Img = ({ alt }) => {
  const image = imageResource.read();

  return <img src={image} alt={alt} style={styles.image} />;
}

const Fallback = () => (
  <img
    src="http://placekitten.com/50/50"
    alt="kitten fallback"
    style={styles.image}
  />
);

const App =  () => (
  <div>
    <Suspense fallback={<Fallback />}>
      <Img alt="kitten loaded" />
    </Suspense>
  </div>
);

export default App;
