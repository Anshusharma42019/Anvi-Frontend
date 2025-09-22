import React from "react";
import { Link } from "react-router-dom";

const PorcelainTiles = () => {
  const porcelainProducts = [
    { id: 6, name: "Porcelain Stone Look", price: "₹110/sq ft", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7", size: "60x60 cm" },
    { id: 18, name: "Porcelain Marble Effect", price: "₹120/sq ft", img: "https://images.unsplash.com/photo-1596079890748-5b0f45a0fbe6", size: "60x120 cm" },
    { id: 19, name: "Porcelain Wood Grain", price: "₹115/sq ft", img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43", size: "20x120 cm" },
    { id: 20, name: "Porcelain Concrete Look", price: "₹105/sq ft", img: "https://images.unsplash.com/photo-1626784372680-55ce49963cf0", size: "60x60 cm" }
  ];

  return (
    <div className="pt-20">
      <section className="py-16 px-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <Link to="/catalog" className="text-blue-300 hover:text-blue-200 mb-4 inline-block">← Back to Catalog</Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Porcelain Tiles</h1>
          <p className="text-lg sm:text-xl">High-performance porcelain tiles for modern living</p>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {porcelainProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <img src={product.img} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-600 font-bold">{product.price}</span>
                    <span className="text-gray-500 text-sm">{product.size}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PorcelainTiles;