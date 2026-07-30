'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const CATEGORIES = [
  { value: 'disenador', label: 'Diseñador' },
  { value: 'arabe', label: 'Árabe' },
  { value: 'nicho', label: 'Nicho' }
];

const CONCENTRATIONS = ['Eau de Parfum', 'Parfum', 'Eau de Toilette', 'Extrait'];

const input =
  'w-full border border-ivory/20 bg-noir-800 px-4 py-2.5 text-sm text-ivory placeholder:text-smoke focus:border-gold focus:outline-none';

const labelCls = 'mb-1.5 block text-[11px] uppercase tracking-wide2 text-smoke';

export interface ProductInitial {
  id: string;
  name: string;
  brand: string;
  categorySlug: string;
  price: number;
  volumeMl: number;
  concentration: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  notesTop: string;
  notesHeart: string;
  notesBase: string;
  featured: boolean;
  stock: number;
}

export function ProductForm({ initialProduct }: { initialProduct?: ProductInitial }) {
  const router = useRouter();
  const isEdit = !!initialProduct;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: initialProduct?.name ?? '',
    brand: initialProduct?.brand ?? '',
    categorySlug: initialProduct?.categorySlug ?? 'disenador',
    price: initialProduct ? String(initialProduct.price) : '',
    volumeMl: initialProduct ? String(initialProduct.volumeMl) : '',
    concentration: initialProduct?.concentration ?? 'Eau de Parfum',
    shortDescription: initialProduct?.shortDescription ?? '',
    description: initialProduct?.description ?? '',
    imageUrl: initialProduct?.imageUrl ?? '',
    notesTop: initialProduct?.notesTop ?? '',
    notesHeart: initialProduct?.notesHeart ?? '',
    notesBase: initialProduct?.notesBase ?? '',
    featured: initialProduct?.featured ?? false,
    stock: initialProduct ? String(initialProduct.stock) : '10'
  });

  function set(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const url = isEdit
      ? `/api/admin/products/${initialProduct!.id}`
      : '/api/admin/products';

    const res = await fetch(url, {
      method: isEdit ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        volumeMl: Number(form.volumeMl),
        stock: Number(form.stock)
      })
    });

    setLoading(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? 'Error al guardar el producto');
      return;
    }

    router.push('/admin/productos');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <div className="border border-red-500/30 bg-red-950/20 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Nombre</label>
          <input className={input} required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej: Sauvage EDP" />
        </div>
        <div>
          <label className={labelCls}>Marca</label>
          <input className={input} required value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Ej: Dior" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className={labelCls}>Categoría</label>
          <select className={input} value={form.categorySlug} onChange={(e) => set('categorySlug', e.target.value)}>
            {CATEGORIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Concentración</label>
          <select className={input} value={form.concentration} onChange={(e) => set('concentration', e.target.value)}>
            {CONCENTRATIONS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className={labelCls}>Volumen (ml)</label>
          <input type="number" className={input} required min={1} value={form.volumeMl} onChange={(e) => set('volumeMl', e.target.value)} placeholder="100" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={labelCls}>Precio (COP)</label>
          <input type="number" className={input} required min={1} value={form.price} onChange={(e) => set('price', e.target.value)} placeholder="480000" />
        </div>
        <div>
          <label className={labelCls}>Stock (unidades)</label>
          <input type="number" className={input} required min={0} value={form.stock} onChange={(e) => set('stock', e.target.value)} placeholder="10" />
        </div>
      </div>

      <div>
        <label className={labelCls}>URL de la imagen</label>
        <input type="url" className={input} required value={form.imageUrl} onChange={(e) => set('imageUrl', e.target.value)} placeholder="https://fimgs.net/mdimg/perfume/375x500.12345.jpg" />
        <p className="mt-1 text-[11px] text-smoke">Pega la URL directa de la imagen del producto</p>
      </div>

      <div>
        <label className={labelCls}>Descripción corta</label>
        <input className={input} required maxLength={120} value={form.shortDescription} onChange={(e) => set('shortDescription', e.target.value)} placeholder="Una línea descriptiva para la tarjeta del producto" />
      </div>

      <div>
        <label className={labelCls}>Descripción completa</label>
        <textarea
          className={`${input} min-h-[100px] resize-y`}
          required
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          placeholder="Descripción detallada que aparece en la página del producto…"
        />
      </div>

      <div className="space-y-3">
        <p className={labelCls}>Pirámide olfativa <span className="normal-case text-smoke">(separadas por comas)</span></p>
        <div>
          <label className="mb-1 block text-[11px] text-smoke">Notas de salida (top)</label>
          <input className={input} value={form.notesTop} onChange={(e) => set('notesTop', e.target.value)} placeholder="Bergamota, Pimienta, Limón" />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-smoke">Notas de corazón (heart)</label>
          <input className={input} value={form.notesHeart} onChange={(e) => set('notesHeart', e.target.value)} placeholder="Jazmín, Rosa, Iris" />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-smoke">Notas de fondo (base)</label>
          <input className={input} value={form.notesBase} onChange={(e) => set('notesBase', e.target.value)} placeholder="Sándalo, Vetiver, Almizcle" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <input
          id="featured"
          type="checkbox"
          checked={form.featured}
          onChange={(e) => set('featured', e.target.checked)}
          className="h-4 w-4 accent-gold"
        />
        <label htmlFor="featured" className="text-sm text-smoke-light">
          Mostrar como producto destacado en la página principal
        </label>
      </div>

      <div className="flex items-center gap-4 border-t border-ivory/10 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="bg-gold px-8 py-3 text-xs uppercase tracking-wide2 text-noir transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          {loading ? 'Guardando…' : isEdit ? 'Guardar cambios' : 'Agregar perfume'}
        </button>
        <a href="/admin/productos" className="text-sm text-smoke hover:text-gold transition-colors">
          Cancelar
        </a>
      </div>
    </form>
  );
}
