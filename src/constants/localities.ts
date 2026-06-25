export const MUMBAI_LOCALITIES = [
  "Bandra",
  "Andheri",
  "Juhu",
  "Powai",
  "Colaba",
  "Worli",
  "Lower Parel",
  "Malad",
  "Borivali",
  "Thane",
  "Goregaon",
  "Khar",
  "Santa Cruz",
  "Chembur",
  "Dadar",
  "Churchgate",
  "Versova",
  "Lokhandwala",
  "Kandivali",
  "Navi Mumbai",
] as const;

export type MumbaiLocality = (typeof MUMBAI_LOCALITIES)[number];
