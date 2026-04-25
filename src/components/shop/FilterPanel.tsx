import React, { useState, useMemo } from 'react';

export default function FilterPanel({ products, brands, categories, locations }) {
  // Estados para los filtros
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeBrand, setActiveBrand] = useState("Todas");
  const [activeLocation, setActiveLocation] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("Más recientes");

  // Lógica de Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "Todas" || p.category === activeCategory;
        const matchesBrand = activeBrand === "Todas" || p.brand === activeBrand;
        const matchesLocation = activeLocation === "Todas" || p.locations.includes(activeLocation);

        return matchesSearch && matchesCategory && matchesBrand && matchesLocation;
      })
      .sort((a, b) => {
        if (sortOrder === "Precio: Bajo a Alto") return a.price - b.price;
        if (sortOrder === "Precio: Alto a Bajo") return b.price - a.price;
        return 0; // "Más recientes" (orden por defecto del index)
      });
  }, [search, activeCategory, activeBrand, activeLocation, sortOrder, products]);

  return (
    <div className="space-y-12">
      {/* Buscador y Filtros */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-4 shadow-sm">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full px-6 py-4 rounded-2xl border-none focus:ring-2 focus:ring-orange-500/20 text-xl text-gray-700 placeholder:text-gray-300 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-6 py-2 border-t border-gray-50 mt-2">
            <FilterDropdown
              label="Categorías"
              options={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <FilterDropdown
              label="Sedes"
              options={locations}
              active={activeLocation}
              onChange={setActiveLocation}
            />
            <FilterDropdown
              label="Marcas"
              options={brands}
              active={activeBrand}
              onChange={setActiveBrand}
            />
            <FilterDropdown
              label="Ordenar por"
              options={["Más recientes", "Precio: Bajo a Alto", "Precio: Alto a Bajo"]}
              active={sortOrder}
              onChange={setSortOrder}
            />
          </div>
        </div>
      </div>

      {/* Grid de Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div key={product.id} className="animate-in fade-in duration-500">
            <ProductCardReact product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p class="text-gray-400 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}

// Sub-componente de Dropdown con estado
function FilterDropdown({ label, options, active, onChange }) {
  return (
    <div className="group relative py-2">
      <div className="flex items-center gap-2 cursor-pointer">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">{label}:</span>
        <span className="text-sm font-bold text-gray-900">{active}</span>
        <svg className="w-4 h-4 text-gray-400 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>

      {/* Menú Desplegable */}
      <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
        <button
          onClick={() => onChange("Todas")}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active === "Todas" ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 text-gray-600'}`}
        >
          Todas
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active === opt ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 text-gray-600'}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// Replicación de la tarjeta estética en React para que el buscador funcione sin recargar
function ProductCardReact({ product }) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const saving = hasDiscount ? Math.round(product.price - product.salePrice) : 0;

  return (
    <article className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-500 h-full relative">
      {hasDiscount && (
        <div className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-full text-xs font-black tracking-wide mb-4 border border-orange-100">
          Te ahorras {saving} S/
        </div>
      )}

      <h3 className="font-satoshi text-3xl font-black text-[#1a202c] mb-2 leading-tight">
        {product.title}
      </h3>

      <p className="text-gray-400 text-sm mb-6 line-clamp-2 max-w-[250px]">
        {product.brand} — {product.category}
      </p>

      <div className="flex items-baseline justify-center gap-3 mb-8">
        <span className="text-2xl font-black text-[#1a202c]">S/ {product.salePrice || product.price}</span>
        {hasDiscount && (
          <span className="text-gray-400 line-through text-sm">S/ {product.price}</span>
        )}
      </div>

      <div className="flex gap-3 w-full mb-10 relative z-10">
        <button className="flex-1 bg-[#0f172a] text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all active:scale-95">
          Comprar
        </button>
        <a href={`/productos/${product.id}`} className="flex-1 bg-[#ff4f00] text-white py-4 rounded-2xl font-bold text-sm flex items-center justify-center hover:bg-orange-700 transition-all active:scale-95">
          Detalles
        </a>
      </div>

      <div className="relative w-full aspect-square mt-auto overflow-hidden pointer-events-none">
        <img
          src={product.images?.[0] || "/uploads/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
        />
      </div>
    </article>
  );
}