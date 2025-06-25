// Pricing page screen

import Header from '../components/header';
import Footer from '../components/footer';
import PriceCalculator from '../components/PriceCalculator';

function Pricing() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <PriceCalculator />
      </main>
      <Footer />
    </>
  );
}

export default Pricing; 