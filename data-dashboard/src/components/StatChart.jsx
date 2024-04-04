/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { BarChart, Bar } from "recharts";

export default function StatChart({ books }) {
    const [languageFrequencies, setLanguageFrequencies] = useState([]); // used for getting all the languages in the books list and showing in the chart
    // this will show a chart from recharts showcasing a bar chart for the languages of the filtered books
    
      useEffect(() => { 
        if(!books || !books.docs){
            return;
        }
        const frequencies = {};
        books.docs.forEach((book) => {
          const language = book.language;
          if (frequencies[language]) {
            frequencies[language].count += 1;
          } else {
            frequencies[language] = { language, count: 1 };
          }
        });
        setLanguageFrequencies(Object.values(frequencies));
      }, [books]);

  return (
    <BarChart width={150} height={40} data={languageFrequencies}>
      <Bar dataKey="count" fill="#8884d8" />
    </BarChart>
  );
}
