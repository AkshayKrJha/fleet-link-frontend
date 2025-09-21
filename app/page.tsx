"use client";
import styles from "./page.module.css";
import AddVehicleForm from "./components/vehicles/AddVehicleForm";
import SearchVehicles from "./components/search-and-book/SearchVehicles";

export default function Home() {
  return (
    <div className="container p-4">
      {/* <AddVehicleForm /> */}
      <SearchVehicles />
    </div>
  );
}
