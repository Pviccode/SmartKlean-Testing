import HomeBanner from "../components/HomeBanner";
import About from "../components/About";
import Services from "../components/Services";
import TrustReasons from "../components/TrustReasons";
import Blog from "../components/Blog";
import Footer from "../components/Footer";

export default function HomePage() {

  return (
    <>
      <HomeBanner />

      <About />

      <Services />

      <TrustReasons />

      <Blog />

      <Footer />
    </>

  )
}


// The user state can have three possible values:
// null: The authentication status is unknown (e.g., still checking).
// true: The user is authenticated.
// false: The user is not authenticated, i.e. The app has confirmed the user is not logged in