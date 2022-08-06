import "../bootstrap.min.css";
import "../index.css";
import "../styles/Profile.css";
import "../styles/Image.css";
import wrapper from "../redux/store";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  );
}

export default wrapper.withRedux(MyApp);
