"use client";

import { useState } from "react";

interface DataRow {
  product: string;
  region: string;
  month: string;
  sales: number;
}

export function PivotTableLiveDemo() {
  const [rowField, setRowField] = useState<string>("region");
  const [columnField, setColumnField] = useState<string>("product");
  const [valueField, setValueField] = useState<string>("sum");
  const [showPivot, setShowPivot] = useState(false);

  const data: DataRow[] = [
    { product: "Laptop", region: "Nord", month: "Jan", sales: 1200 },
    { product: "Maus", region: "Süd", month: "Jan", sales: 450 },
    { product: "Laptop", region: "Süd", month: "Jan", sales: 1100 },
    { product: "Tastatur", region: "Nord", month: "Jan", sales: 320 },
    { product: "Maus", region: "Nord", month: "Feb", sales: 380 },
    { product: "Laptop", region: "Nord", month: "Feb", sales: 1350 },
    { product: "Tastatur", region: "Süd", month: "Feb", sales: 290 },
    { product: "Maus", region: "Süd", month: "Feb", sales: 510 },
  ];

  const generatePivotTable = () => {
    const pivotMap = new Map<string, Map<string, number>>();

    data.forEach((row) => {
      const rowKey = row[rowField as keyof DataRow] as string;
      const colKey = row[columnField as keyof DataRow] as string;

      if (!pivotMap.has(rowKey)) {
        pivotMap.set(rowKey, new Map());
      }

      const rowData = pivotMap.get(rowKey)!;
      const currentValue = rowData.get(colKey) || 0;
      rowData.set(colKey, currentValue + row.sales);
    });

    return pivotMap;
  };

  const pivotData = generatePivotTable();
  const uniqueColumns = Array.from(
    new Set(data.map((row) => row[columnField as keyof DataRow] as string))
  ).sort();
  const uniqueRows = Array.from(pivotData.keys()).sort();

  const calculateTotal = (rowKey: string) => {
    const rowData = pivotData.get(rowKey)!;
    return Array.from(rowData.values()).reduce((sum, val) => sum + val, 0);
  };

  const calculateColumnTotal = (colKey: string) => {
    let total = 0;
    pivotData.forEach((rowData) => {
      total += rowData.get(colKey) || 0;
    });
    return total;
  };

  const grandTotal = uniqueRows.reduce((sum, rowKey) => sum + calculateTotal(rowKey), 0);

  return (
    <div className="relative w-full bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg p-6">
      <div className="space-y-6">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
            🎮 Live Demo: Pivot-Tabelle erstellen
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Konfiguriere deine Pivot-Tabelle und sieh das Ergebnis in Echtzeit!
          </p>
        </div>

        {/* Raw Data Table */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-3xl">
          <div className="bg-slate-500 text-white px-3 py-2 text-sm font-semibold">
            📋 Rohdaten ({data.length} Zeilen)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-100 dark:bg-slate-700">
                <tr>
                  <th className="px-4 py-2 text-left">Produkt</th>
                  <th className="px-4 py-2 text-left">Region</th>
                  <th className="px-4 py-2 text-left">Monat</th>
                  <th className="px-4 py-2 text-left">Umsatz</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 4).map((row, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="px-4 py-2">{row.product}</td>
                    <td className="px-4 py-2">{row.region}</td>
                    <td className="px-4 py-2">{row.month}</td>
                    <td className="px-4 py-2 font-mono">{row.sales}€</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-slate-50 dark:bg-slate-700 px-3 py-2 text-xs text-slate-600 dark:text-slate-400 text-center">
            ... und {data.length - 4} weitere Zeilen
          </div>
        </div>

        {/* Configuration */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4">
          <h4 className="text-lg font-semibold mb-4 text-slate-800 dark:text-slate-100">
            ⚙️ Pivot konfigurieren:
          </h4>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Row Field */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Zeilenfelder
              </label>
              <select
                value={rowField}
                onChange={(e) => setRowField(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500 dark:bg-slate-700"
              >
                <option value="region">Region</option>
                <option value="product">Produkt</option>
                <option value="month">Monat</option>
              </select>
            </div>

            {/* Column Field */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Spaltenfelder
              </label>
              <select
                value={columnField}
                onChange={(e) => setColumnField(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500 dark:bg-slate-700"
              >
                <option value="product">Produkt</option>
                <option value="region">Region</option>
                <option value="month">Monat</option>
              </select>
            </div>

            {/* Value Field */}
            <div>
              <label className="block text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                Werte
              </label>
              <select
                value={valueField}
                onChange={(e) => setValueField(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-indigo-500 dark:bg-slate-700"
              >
                <option value="sum">Summe von Umsatz</option>
                <option value="count">Anzahl</option>
                <option value="average">Durchschnitt</option>
              </select>
            </div>
          </div>

          <div className="mt-4">
            <button
              onClick={() => setShowPivot(!showPivot)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              {showPivot ? "✓ Pivot anzeigen" : "Pivot erstellen"}
            </button>
          </div>
        </div>

        {/* Pivot Table Result */}
        {showPivot && (
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden mx-auto max-w-3xl animate-in fade-in slide-in-from-bottom">
            <div className="bg-purple-500 text-white px-3 py-2 text-sm font-semibold">
              📊 Pivot-Tabelle (Ergebnis)
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-purple-50 dark:bg-purple-900">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold">
                      {rowField === "region"
                        ? "Region"
                        : rowField === "product"
                        ? "Produkt"
                        : "Monat"}
                    </th>
                    {uniqueColumns.map((col) => (
                      <th key={col} className="px-4 py-2 text-left">
                        {col}
                      </th>
                    ))}
                    <th className="px-4 py-2 text-left bg-purple-100 dark:bg-purple-800 font-semibold">
                      Gesamt
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uniqueRows.map((rowKey) => (
                    <tr key={rowKey} className="border-t">
                      <td className="px-4 py-2 font-semibold">{rowKey}</td>
                      {uniqueColumns.map((colKey) => {
                        const value = pivotData.get(rowKey)?.get(colKey) || 0;
                        return (
                          <td key={colKey} className="px-4 py-2 font-mono">
                            {valueField === "sum"
                              ? `${value}€`
                              : valueField === "count"
                              ? data.filter(
                                  (r) =>
                                    r[rowField as keyof DataRow] === rowKey &&
                                    r[columnField as keyof DataRow] === colKey
                                ).length
                              : `${Math.round(value / data.filter(
                                  (r) =>
                                    r[rowField as keyof DataRow] === rowKey &&
                                    r[columnField as keyof DataRow] === colKey
                                ).length)}€`}
                          </td>
                        );
                      })}
                      <td className="px-4 py-2 font-mono bg-purple-50 dark:bg-purple-900 font-semibold">
                        {calculateTotal(rowKey)}€
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-purple-300 dark:border-purple-700 bg-purple-100 dark:bg-purple-800">
                    <td className="px-4 py-2 font-semibold">Gesamt</td>
                    {uniqueColumns.map((colKey) => (
                      <td key={colKey} className="px-4 py-2 font-mono font-semibold">
                        {calculateColumnTotal(colKey)}€
                      </td>
                    ))}
                    <td className="px-4 py-2 font-mono font-semibold text-lg">
                      {grandTotal}€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {showPivot && (
          <div className="bg-indigo-50 dark:bg-indigo-950 border border-indigo-300 dark:border-indigo-700 rounded-lg p-4 animate-in fade-in">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              <strong>✓ Pivot erstellt!</strong> Aus {data.length} Rohdaten-Zeilen → {uniqueRows.length} zusammengefasste Zeilen
            </p>
          </div>
        )}

        {/* Hint */}
        {!showPivot && (
          <div className="bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
            <p className="text-sm text-indigo-800 dark:text-indigo-200">
              <strong>💡 Tipp:</strong> Probiere verschiedene Kombinationen aus!
            </p>
            <ul className="text-xs text-indigo-700 dark:text-indigo-300 mt-2 space-y-1">
              <li>• <strong>Zeilen:</strong> Welche Kategorien willst du untereinander sehen?</li>
              <li>• <strong>Spalten:</strong> Welche Kategorien nebeneinander vergleichen?</li>
              <li>• <strong>Werte:</strong> Was soll berechnet werden?</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
