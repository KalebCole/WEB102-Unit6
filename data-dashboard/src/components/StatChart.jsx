/* eslint-disable react/prop-types */
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
  const [languageFrequencies, setLanguageFrequencies] = useState([]); // used for getting all the languages in the books list and showing in the chart
  // this will show a chart from recharts showcasing a bar chart for the languages of the filtered books

  useEffect(() => {
    if (!books || !books.docs) {
      return;
    }
    const frequencies = {};
    books.docs.forEach((book) => {
      const languages = book.language;
      if(languages){
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
  console.log(languageFrequencies);

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
