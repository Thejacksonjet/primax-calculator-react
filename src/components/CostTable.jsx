// src/components/CostTable.jsx
import React, { useRef } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { itemTranslations } from "../utils/translations";

const CostTable = ({ data, language, chickenType, numberOfChickens }) => {
  const tableRef = useRef(null);

  const downloadPDF = () => {
    if (!data || !data.items) return;

    const weeks = Math.floor(data.estimatedDurationDays / 7);

    const documentDefinition = {
      content: [
        {
          text:
            language === "English"
              ? `Cost Breakdown for ${numberOfChickens} ${chickenType} kept for ${data.estimatedDurationDays} days (${weeks} weeks)`
              : `Mchanganuo wa Gharama kwa ${numberOfChickens} ${chickenType} kwa siku ${data.estimatedDurationDays} (wiki ${weeks})`,
          style: "header",
          alignment: "center",
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "auto", "auto"],
            body: [
              [
                {
                  text: language === "English" ? "Item" : "Bidhaa",
                  style: "tableHeader",
                },
                {
                  text: language === "English" ? "Quantity" : "Kiasi",
                  style: "tableHeader",
                },
                {
                  text: language === "English" ? "Cost (TZS)" : "Gharama (TZS)",
                  style: "tableHeader",
                },
              ],
              ...data.items.map((item) => [
                { text: itemTranslations[item.item]?.[language] || item.item, style: "tableCell" },
                {
                  text: item.quantity.toString(),
                  style: "tableCell",
                  alignment: "center",
                },
                {
                  text: item.cost.toLocaleString(),
                  style: "tableCell",
                  alignment: "right",
                },
              ]),
              [
                {
                  text: language === "English" ? "Total" : "Jumla",
                  style: "totalCell",
                  bold: true,
                },
                { text: "", style: "totalCell" },
                {
                  text: data.total.toLocaleString(),
                  style: "totalCell",
                  bold: true,
                  alignment: "right",
                },
              ],
            ],
          },
          layout: {
            fillColor: (rowIndex, node, columnIndex) => {
              if (rowIndex === 0) return "#4CAF50";
              if (rowIndex === node.table.body.length - 1) return "#f3f4f6";
              return rowIndex % 2 === 0 ? "#FFFFFF" : "#f9fafb";
            },
            hLineWidth: (i, node) =>
              i === 0 || i === node.table.body.length ? 1 : 0.5,
            vLineWidth: () => 0, // Remove vertical lines in PDF
            hLineColor: () => "#D3D3D3",
            vLineColor: () => "#D3D3D3",
            paddingLeft: (i) => 10,
            paddingRight: (i) => 10,
            paddingTop: (i) => 8,
            paddingBottom: (i) => 8,
          },
        },
        {
          text:
            language === "English"
              ? "The following costs are not accounted for because they vary for different places: labor, water, transport, drugs, antibiotics etc"
              : "Gharama zifuatazo hazijajumuishwa kwa sababu zinatofautiana kwa maeneo tofauti: kazi, maji, usafiri, dawa, antibiotiki, n.k.",
          style: "noteText",
          margin: [0, 15, 0, 0],
          italics: true,
        },
        {
          text: "Made by Primax at www.primaxtz.com",
          style: "footer",
          alignment: "center",
          margin: [0, 30, 0, 0],
        },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 20],
        },
        tableHeader: {
          fontSize: 12,
          bold: true,
          color: "#FFFFFF",
        },
        tableCell: {
          fontSize: 10,
        },
        noteText: {
          fontSize: 9,
          color: "#666666",
          italics: true,
        },
        footer: {
          fontSize: 10,
          bold: true,
          color: "#4CAF50",
        },
      },
      defaultStyle: {
        font: "Roboto",
      },
    };

    pdfMake
      .createPdf(documentDefinition)
      .download(`${chickenType}-${numberOfChickens}-cost-breakdown.pdf`);
  };

  if (!data || !data.items) return null;

  const weeks = Math.floor(data.estimatedDurationDays / 7);

  return (
    <div className="max-sm:p-2 p-4 max-w-full mx-auto bg-white rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg text-gray-700 font-semibold">
          {language === "English"
            ? `The estimation for ${numberOfChickens} ${chickenType} kept for ${data.estimatedDurationDays} days (${weeks} weeks)`
            : `Makadirio ya kuku ${numberOfChickens} ${
                chickenType === "Broilers"
                  ? "kuku wa nyama"
                  : chickenType === "Layers"
                  ? "kuku wa mayai"
                  : chickenType === "Hybrid"
                  ? "chotara"
                  : chickenType
              } kwa siku ${data.estimatedDurationDays} (wiki ${weeks})`}
        </h2>
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200 w-full sm:w-auto"
        >
          {language === "English" ? "Download PDF" : "Pakua PDF"}
        </button>
      </div>
      <div ref={tableRef} className="overflow-x-auto my-4">
        <table className="w-full min-w-[320px]"> {/* Removed border-collapse */}
          <thead>
            <tr className="bg-green-400">
              <th className="border-t border-b border-gray-100 p-3 text-left font-semibold text-gray-100 whitespace-nowrap rounded-tl-lg">
                {language === "English" ? "Item" : "Bidhaa"}
              </th>
              <th className="border-t border-b border-gray-100 p-3 text-center font-semibold text-gray-100 whitespace-nowrap">
                {language === "English" ? "Quantity" : "Kiasi"}
              </th>
              <th className="border-t border-b border-gray-100 p-3 text-center font-semibold text-gray-100 whitespace-nowrap rounded-tr-lg">
                {language === "English" ? "Cost (TZS)" : "Gharama (TZS)"}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "bg-white hover:bg-gray-100"
                    : "bg-gray-50 hover:bg-gray-100"
                }
              >
                <td className="border-t border-b border-gray-400 p-3 text-gray-700">
                  {itemTranslations[item.item]?.[language] || item.item}
                </td>
                <td className="border-t border-b border-gray-400 p-3 text-center text-gray-700">
                  {item.quantity}
                </td>
                <td className="border-t border-b border-gray-400 p-3 text-center text-gray-700">
                  {item.cost.toLocaleString()}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="border-t border-b border-gray-400 p-3 text-gray-800 rounded-bl-lg">
                {language === "English" ? "Total" : "Jumla"}
              </td>
              <td className="border-t border-b border-gray-400 p-3 text-center"></td>
              <td className="border-t border-b border-gray-400 p-3 text-center text-gray-800 rounded-br-lg">
                {data.total.toLocaleString()}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CostTable;
