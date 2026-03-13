import type { City } from "@/types";
import { jerusalemData } from "./jerusalem";
import { jaffaData } from "./jaffa";
import { gazaData } from "./gaza";
import { nablusData } from "./nablus";
import { hebronData } from "./hebron";

const cities: Record<string, City> = {
  jerusalem: jerusalemData,
  jaffa: jaffaData,
  gaza: gazaData,
  nablus: nablusData,
  hebron: hebronData,
};

export async function getCityData(cityId: string): Promise<City | null> {
  return cities[cityId] || null;
}

export function getAllCities(): City[] {
  return Object.values(cities);
}

export function getCityIds(): string[] {
  return Object.keys(cities);
}
