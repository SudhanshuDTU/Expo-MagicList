import { useEffect } from "react";
import { createTable } from "./db/database";
import { Slot } from "expo-router";


export default function App() {
  useEffect(() => {
    const initializeDatabase = () => {
      try {
         createTable(); // Initialize the database tables
         console.log("table created successfully in App.js");
      } catch (error) {
        console.error("Error creating tables:", error);
      }
    };

    initializeDatabase();
  }, []);

  return <Slot/>;
}
