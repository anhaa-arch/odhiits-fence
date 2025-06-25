// 404 Not Found page screen

import Header from '../components/header';
import Footer from '../components/footer';

function NotFound() {
  return (
    <>
      <Header />
      <main>
        <h1>404 - Page Not Found</h1>
        {/* Not found content goes here */}
      </main>
      <Footer />
    </>
  );
}

export default NotFound; 