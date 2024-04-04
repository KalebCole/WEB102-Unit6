import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function StatChart({ books }) {
  const [languageFrequencies, setLanguageFrequencies] = useState([]);

  useEffect(() => {
    // Directly check if books is an array and has length
    if (!Array.isArray(books) || books.length === 0) {
      return;
    }
    const frequencies = {};
    books.forEach((book) => {
      // Assuming languages is an array. Adjust if your data structure is different.
      const { languages } = book;
      if (languages) {
        languages.forEach((language) => {
          if (frequencies[language]) {
            frequencies[language].count += 1;
          } else {
            frequencies[language] = { language, count: 1 };
          }
        });
      }
    });
    setLanguageFrequencies(Object.values(frequencies));
  }, [books]);

  return (
    <BarChart width={500} height={300} data={languageFrequencies}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="language" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#82ca9d" />
    </BarChart>
  );
}
