"use client";

import { useState } from "react";
import type { Product, ProductInput } from "@/lib/types";

type Props = {
  onSubmit: (data: ProductInput) => void;
  editing: Product | null;
  onCancelEdit: () => void;
};

const STEP = 500;

export function ProductForm({ onSubmit, editing, onCancelEdit }: Props) {
  const [nama, setNama] = useState(editing?.nama ?? "");
  const [deskripsi, setDeskripsi] = useState(editing?.deskripsi ?? "");
  const [harga, setHarga] = useState(editing ? String(editing.harga) : "");

  function increment() {
    const current = Number(harga) || 0;
    setHarga(String(current + STEP));
  }

  function decrement() {
    const current = Number(harga) || 0;
    const next = current - STEP;
    setHarga(String(next < 0 ? 0 : next));
  }

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
    <div className="rounded-lg border border-border bg-white p-4 shadow-sm sm:p-6">
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
          <div className="mt-1.5 flex items-stretch overflow-hidden rounded-md border border-border bg-white focus-within:border-fg">
            <input
              type="number"
              value={harga}
              onChange={(e) => setHarga(e.target.value)}
              placeholder="0"
              min={0}
              className="flex-1 bg-transparent px-3 py-2 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
            />
            <div className="flex w-9 flex-col border-l border-border">
              <button
                type="button"
                onClick={increment}
                aria-label="Tambah 500"
                className="flex flex-1 items-center justify-center text-fg-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 1L9 7H1L5 1Z" fill="currentColor" />
                </svg>
              </button>
              <button
                type="button"
                onClick={decrement}
                aria-label="Kurang 500"
                className="flex flex-1 items-center justify-center border-t border-border text-fg-muted transition-colors hover:bg-surface hover:text-fg"
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 9L1 3H9L5 9Z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>
          <p className="mt-1 text-xs text-fg-subtle">
            Klik ▲▼ untuk naik/turun Rp 500
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-1 sm:flex-row">
          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-hover sm:w-auto"
          >
            {editing ? "Update" : "Simpan"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="w-full rounded-md border border-border bg-white px-4 py-2 text-sm font-medium text-fg transition-colors hover:bg-surface sm:w-auto"
            >
              Batal
            </button>
          )}
        </div>
      </form>
    </div>
  );
}