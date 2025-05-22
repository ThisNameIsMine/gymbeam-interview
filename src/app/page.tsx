import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="text-center">
      {/* Hero Section */}
      <section className="py-16 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-5xl font-bold text-neutral-800 mb-4">
          Welcome to <span className="text-orange-600">GymBeam</span>
        </h1>
        <p className="text-xl text-neutral-600 mb-8">
          Your peak performance starts here. Discover top-quality supplements and gear.
        </p>
        <Link
          href="/login" // This will eventually lead to product page or login if not auth
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-150 ease-in-out"
        >
          Explore Products & Login
        </Link>
      </section>

      {/* Featured Products Section (Placeholder) */}
      <section className="py-16">
        <h2 className="text-3xl font-semibold text-neutral-700 mb-8">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product cards will go here later */}
          <div className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded animate-pulse"></div> {/* Placeholder for image */}
            <h3 className="text-xl font-semibold mb-2">Product Title Placeholder</h3>
            <p className="text-lg text-orange-600 font-bold mb-4">$0.00</p>
            <button className="w-full bg-neutral-700 hover:bg-neutral-800 text-white py-2 px-4 rounded">
              View Details (Login Required)
            </button>
          </div>
          <div className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded animate-pulse"></div>
            <h3 className="text-xl font-semibold mb-2">Product Title Placeholder</h3>
            <p className="text-lg text-orange-600 font-bold mb-4">$0.00</p>
            <button className="w-full bg-neutral-700 hover:bg-neutral-800 text-white py-2 px-4 rounded">
              View Details (Login Required)
            </button>
          </div>
          <div className="border p-4 rounded-lg shadow hover:shadow-xl transition-shadow">
            <div className="bg-gray-200 h-48 w-full mb-4 rounded animate-pulse"></div>
            <h3 className="text-xl font-semibold mb-2">Product Title Placeholder</h3>
            <p className="text-lg text-orange-600 font-bold mb-4">$0.00</p>
            <button className="w-full bg-neutral-700 hover:bg-neutral-800 text-white py-2 px-4 rounded">
              View Details (Login Required)
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}