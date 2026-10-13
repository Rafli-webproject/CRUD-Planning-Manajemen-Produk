"use client";

import { useState } from "react";
import type { Product, ProductInput } from "@/lib/types";

type Props = {
  onSubmit: (data: ProductInput) => void;
  editing: Product | null;
  onCancelEdit: () => void;
};

export function ProductForm({ onSubmit, editing, onCancelEdit }: Props) {
  const [nama, setNama] = useState(editing?.nama ?? "");
  const [deskripsi, setDeskripsi] = useState(editing?.deskripsi ?? "");
  const [harga, setHarga] = useState(editing ? String(editing.harga) : "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!nama.trim()) return;
    onSubmit({
      nama: nama.trim(),
      deskripsi: deskripsi.trim(),
      harga: Number(harga) || 0,
    });
    if (!editing) {
      setNama("");
      setDeskripsi("");
      setHarga("");
    }
  }

  return (
    <div className="rounded-lg border border-border bg-white p-6 shadow-sm">
      <h2 className="text-base font-semibold text-fg">
        {editing ? "Edit Produk" : "Tambah Produk Baru"}
      </h2>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        <div>
          <label className="block text-sm font-medium text-fg">
            Nama Produk
          </label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Misal: Kopi Susu"
            required
            className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-fg">Deskripsi</label>
          <textarea
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            placeholder="Deskripsi singkat produk (opsional)"
            rows={3}
            className="mt-1.5 w-full resize-none rounded-md border border-border bg-white px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-fg">
            Harga (Rp)
          </label>
          <input
            type="number"
            value={harga}
            onChange={(e) => setHarga(e.target.value)}
            placeholder="0"
            min={0}
            className="mt-1.5 w-full rounded-md border border-border bg-white px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:border-fg focus:outline-none"
          />
        </div>

        <div className="flex gap-2 pt-1">
          <button
            type="submit"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            {editing ? "Update" : "Simpan"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}