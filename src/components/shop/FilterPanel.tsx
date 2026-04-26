import React, { useState, useMemo } from 'react';

export default function FilterPanel({ products, brands, categories, locations }: any) {
  // Estados para los filtros
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [activeBrand, setActiveBrand] = useState("Todas");
  const [activeLocation, setActiveLocation] = useState("Todas");
  const [sortOrder, setSortOrder] = useState("Más recientes");

  // Lógica de Filtrado y Ordenamiento
  const filteredProducts = useMemo(() => {
    return products
      .filter((p: any) => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "Todas" || p.category === activeCategory;
        const matchesBrand = activeBrand === "Todas" || p.brand === activeBrand;
        const matchesLocation = activeLocation === "Todas" || p.locations.includes(activeLocation);

        return matchesSearch && matchesCategory && matchesBrand && matchesLocation;
      })
      .sort((a: any, b: any) => {
        if (sortOrder === "Precio: Bajo a Alto") return a.price - b.price;
        if (sortOrder === "Precio: Alto a Bajo") return b.price - a.price;
        return 0; // "Más recientes" (orden por defecto del index)
      });
  }, [search, activeCategory, activeBrand, activeLocation, sortOrder, products]);

  return (
    <div className="space-y-12">
      {/* Buscador y Filtros */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full px-6 py-4 rounded-lg border border-orange-200 focus:ring-2 focus:ring-orange-600/50 text-xl text-gray-700 placeholder:text-gray-300 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 px-6 py-2 mt-2">
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
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product:any) => (
          <div key={product.id} className="animate-in fade-in duration-500">
            <ProductCardReact product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No se encontraron productos que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  );
}

// Sub-componente de Dropdown con estado
function FilterDropdown({ label, options, active, onChange }: any) {
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
      <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-2">
        <button
          onClick={() => onChange("Todas")}
          className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${active === "Todas" ? 'bg-orange-50 text-orange-600' : 'hover:bg-gray-50 text-gray-600'}`}
        >
          Todas
        </button>
        {options.map((opt: any) => (
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
function ProductCardReact({ product }: any) {
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const saving = hasDiscount ? Math.round(product.price - product.salePrice) : 0;

  return (
    <article className="group relative bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-full w-full flex flex-col">
        <div className="relative p-4 flex flex-col items-center justify-items-start gap-1 min-h-36">
          <div className="w-full flex justify-start mb-4">
            <div className="bg-green-50 text-green-600 px-3 py-1.5 rounded-md text-xs font-medium tracking-normal border border-green-600">
              {product.category}
            </div>
            {hasDiscount && (
            <div className="bg-orange-50 text-orange-600 px-3 py-1.5 rounded-md text-xs font-medium tracking-normal border border-orange-600 ml-2">
              Te ahorras S/{saving}
            </div>
            )}
          </div>

          <h3 className="font-black text-center text-base sm:text-xl text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-2">
            {product.title}
          </h3>

          <p className="text-gray-400 text-sm line-clamp-2 max-w-[250px]">
            {product.shortDescription}
          </p>

          <div className="flex items-baseline justify-center gap-3">
            <span className="text-base font-medium text-gray-900">S/ {product.salePrice || product.price}</span>
            {hasDiscount && (
              <span className="text-xs font-medium text-gray-900 line-through">S/ {product.price}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-end items-center p-4" >
          {/*  Botones  */}
          <div className="flex items-center space-y-1 gap-2">
            <a href={`/productos/${product.id}`} className="justify-center bg-gray-700 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-gray-900 transition-colors tracking-normal">
              Comprar ahora
            </a>
            <a href={`/productos/${product.id}`} className="justify-center border border-orange-600 text-orange-600 text-xs font-bold px-4 py-2 rounded-xl hover:text-orange-400 hover:border-orange-400 transition-colors tracking-normal">
              Más información
            </a>
          </div>
        </div>

        <div className="relative w-full aspect-square mt-auto overflow-hidden pointer-events-none">
          <img
            src={product.images?.[0] || "/uploads/placeholder.jpg"}
            alt={product.title}
            width={300}
            height={300}
            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
          />
        </div>
      </div>

    </article>
  );
}