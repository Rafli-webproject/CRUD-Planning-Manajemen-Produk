"use client";

import type { Product } from "@/lib/types";

type Props = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (id: number) => void;
};

function formatRupiah(n: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(n);
}

export function ProductTable({ products, onEdit, onDelete }: Props) {
  if (products.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-white p-10 text-center shadow-sm">
        <p className="text-sm text-fg-muted">Belum ada produk.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-fg text-left">
            <th className="px-4 py-3 font-medium text-white">Nama</th>
            <th className="px-4 py-3 font-medium text-white">Deskripsi</th>
            <th className="px-4 py-3 font-medium text-white">Harga</th>
            <th className="px-4 py-3 text-right font-medium text-white">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b border-border last:border-0">
              <td className="px-4 py-3 font-medium text-fg">{p.nama}</td>
              <td className="px-4 py-3 text-fg-muted">{p.deskripsi ?? "-"}</td>
              <td className="px-4 py-3 text-fg">{formatRupiah(p.harga)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => onEdit(p)}
                    className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:bg-surface"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(p.id)}
                    className="rounded-md border border-border bg-white px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-danger hover:text-danger"
                  >
                    Hapus
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}