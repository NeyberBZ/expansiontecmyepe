// src/components/shop/FilterPanel.tsx
import { useState, useMemo, useTransition } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  salePrice: number | null;
  brand: string;
  brandId: string;
  category: string;
  categoryId: string;
  locations: string[];
  images: string[];
  inStock: boolean;
  featured: boolean;
  tags: string[];
};

type Props = {
  products: Product[];
  brands: string[];
  categories: string[];
  locations: string[];
  maxPrice: number;
};

export default function FilterPanel({ products, brands, categories, locations, maxPrice }: Props) {
  const [isPending, startTransition] = useTransition();
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState("");
  const [brand,    setBrand]    = useState("");
  const [location, setLocation] = useState("");
  const [price,    setPrice]    = useState(maxPrice || 9999);
  const [onlyStock, setOnlyStock] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() =>
    products.filter(p => {
      if (onlyStock && !p.inStock) return false;
      if (category && p.categoryId !== category && p.category !== category) return false;
      if (brand && p.brandId !== brand && p.brand !== brand) return false;
      if (location && !p.locations.includes(location)) return false;
      if (p.price > price) return false;
      if (search) {
        const q = search.toLowerCase();
        return p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
      }
      return true;
    }),
  [products, category, brand, location, price, onlyStock, search]);

  const activeFilters = [category, brand, location, onlyStock ? "Solo en stock" : ""].filter(Boolean).length;

  function resetFilters() {
    setCategory(""); setBrand(""); setLocation("");
    setPrice(maxPrice); setOnlyStock(false); setSearch("");
  }

  const selectStyle = {
    width: "100%", padding: "8px 10px", borderRadius: "6px",
    border: "1px solid var(--color-border)", background: "var(--color-surface)",
    color: "var(--color-text)", fontSize: "0.875rem", cursor: "pointer",
  };

  const labelStyle = {
    display: "block", fontSize: "0.75rem", fontWeight: "600",
    color: "var(--color-text-muted)", marginBottom: "6px", textTransform: "uppercase" as const, letterSpacing: "0.05em",
  };

  return (
    <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>

      {/* Sidebar Filtros */}
      <aside style={{
        width: "240px", minWidth: "240px", flexShrink: 0,
        background: "var(--color-surface)", border: "1px solid var(--color-border)",
        borderRadius: "12px", padding: "1.25rem",
        display: "none", // ocultado en mobile por defecto — se controla por JS
      }} id="filter-sidebar">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem" }}>
          <span style={{ fontWeight: "700", fontSize: "0.95rem", color: "var(--color-text)" }}>Filtros</span>
          {activeFilters > 0 && (
            <button onClick={resetFilters} style={{ fontSize: "0.75rem", color: "var(--color-primary)", background: "none", border: "none", cursor: "pointer" }}>
              Limpiar ({activeFilters})
            </button>
          )}
        </div>

        {/* Categoría */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Categoría</label>
          <select value={category} onChange={e => startTransition(() => setCategory(e.target.value))} style={selectStyle}>
            <option value="">Todas</option>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        {/* Marca */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Marca</label>
          <select value={brand} onChange={e => startTransition(() => setBrand(e.target.value))} style={selectStyle}>
            <option value="">Todas</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>

        {/* Sucursal */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Sucursal</label>
          <select value={location} onChange={e => startTransition(() => setLocation(e.target.value))} style={selectStyle}>
            <option value="">Todas</option>
            {locations.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>

        {/* Precio */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={labelStyle}>Precio máx: S/ {price}</label>
          <input
            type="range" min={0} max={maxPrice || 9999} value={price}
            onChange={e => startTransition(() => setPrice(Number(e.target.value)))}
            style={{ width: "100%", accentColor: "var(--color-primary)" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--color-text-faint)", marginTop: "4px" }}>
            <span>S/ 0</span><span>S/ {maxPrice}</span>
          </div>
        </div>

        {/* En stock */}
        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "0.875rem", color: "var(--color-text)" }}>
          <input
            type="checkbox" checked={onlyStock}
            onChange={e => startTransition(() => setOnlyStock(e.target.checked))}
            style={{ accentColor: "var(--color-primary)", width: "16px", height: "16px" }}
          />
          Solo en stock
        </label>
      </aside>

      {/* Contenido principal */}
      <div style={{ flex: 1, minWidth: 0 }}>

        {/* Barra superior */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "1.5rem", alignItems: "center" }}>
          <input
            type="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={e => startTransition(() => setSearch(e.target.value))}
            style={{
              flex: 1, padding: "9px 14px", borderRadius: "8px",
              border: "1px solid var(--color-border)", background: "var(--color-surface)",
              color: "var(--color-text)", fontSize: "0.875rem",
            }}
          />
          <button
            id="toggle-filters-btn"
            style={{
              padding: "9px 16px", borderRadius: "8px",
              border: "1px solid var(--color-border)", background: "var(--color-surface)",
              color: "var(--color-text-muted)", fontSize: "0.875rem", cursor: "pointer",
              whiteSpace: "nowrap" as const,
            }}
          >
            ⚙ Filtros {activeFilters > 0 && `(${activeFilters})`}
          </button>
        </div>

        {/* Resultados */}
        <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
          {isPending ? "Filtrando..." : `${filtered.length} resultado${filtered.length !== 1 ? "s" : ""}`}
        </p>

        {/* Grid de productos */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "4rem 2rem", color: "var(--color-text-muted)" }}>
            <p style={{ fontSize: "2rem", marginBottom: "1rem" }}>🔍</p>
            <p style={{ fontWeight: "600", marginBottom: "0.5rem" }}>Sin resultados</p>
            <p style={{ fontSize: "0.875rem" }}>Intenta con otros filtros</p>
            <button onClick={resetFilters} style={{ marginTop: "1rem", padding: "8px 20px", borderRadius: "8px", background: "var(--color-primary)", color: "white", border: "none", cursor: "pointer", fontSize: "0.875rem" }}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))",
            gap: "1rem",
            opacity: isPending ? 0.6 : 1,
            transition: "opacity 180ms ease",
          }}>
            {filtered.map(p => (
              <a
                key={p.id}
                href={`/tienda/${p.id}`}
                style={{ textDecoration: "none", display: "block" }}
              >
                <article style={{
                  background: "var(--color-surface)", border: "1px solid var(--color-border)",
                  borderRadius: "12px", overflow: "hidden",
                  transition: "box-shadow 180ms ease, transform 180ms ease",
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px oklch(0.2 0.01 80 / 0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
                >
                  {/* Imagen */}
                  <div style={{ aspectRatio: "4/3", background: "var(--color-surface-offset)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    {p.images[0] ? (
                      <img src={p.images[0]} alt={p.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "2.5rem" }}>📦</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1rem" }}>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginBottom: "4px" }}>{p.brand} · {p.category}</p>
                    <h2 style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--color-text)", marginBottom: "8px", lineHeight: "1.3" }}>{p.title}</h2>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {p.salePrice ? (
                        <>
                          <span style={{ fontWeight: "700", color: "var(--color-primary)" }}>S/ {p.salePrice}</span>
                          <span style={{ fontSize: "0.8rem", color: "var(--color-text-faint)", textDecoration: "line-through" }}>S/ {p.price}</span>
                        </>
                      ) : (
                        <span style={{ fontWeight: "700", color: "var(--color-text)" }}>S/ {p.price}</span>
                      )}
                    </div>
                    {!p.inStock && (
                      <span style={{ display: "inline-block", marginTop: "8px", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "999px", background: "var(--color-surface-offset)", color: "var(--color-text-faint)" }}>
                        Sin stock
                      </span>
                    )}
                  </div>
                </article>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}