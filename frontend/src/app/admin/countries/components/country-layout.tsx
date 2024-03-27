"use client";
import React from "react";
import { DataTable } from "./data-table";
import countryColumns from "./country-columns";
import useCountries from "../../hooks/useCountry";
import cuid2 from "@paralleldrive/cuid2";

function CountryLayout() {
  const cuid = cuid2.createId();
  const { data: countries, isLoading, error } = useCountries();
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;
  if (!countries) return "No data";

  return (
    <div className="container-sm py-10">
      <DataTable data={countries} columns={countryColumns} key={cuid} />;
    </div>
  );
}

export default CountryLayout;
