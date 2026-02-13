import { Character } from "@/types";
import Papa from "papaparse";

const GOOGLE_SHEET_CSV_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

// Cache for characters to avoid re-fetching
let cachedCharacters: Character[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

interface CSVRow {
  id?: string;
  name?: string;
  class?: string;
  hp?: string;
  mana?: string;
  speed?: string;
  strengthUtility?: string;
  skills?: string;
  spriteUrl?: string;
  shortDescription?: string;
  primaryStatBuff?: string;
}

function parseSkills(
  skillsString: string,
): { name: string; description: string }[] {
  if (!skillsString) return [];
  try {
    // Expects format: "Skill1|Description1,Skill2|Description2"
    return skillsString.split(",").map((skill) => {
      const [name, description] = skill.split("|");
      return {
        name: name?.trim() || "",
        description: description?.trim() || "",
      };
    });
  } catch {
    return [];
  }
}

function parseCharacterRow(row: CSVRow): Character | null {
  if (!row.id || !row.name || !row.class) {
    return null;
  }

  const validClasses = ["Knight", "Archer", "Wizard", "Assassin", "Bard"];
  const trimmedClass = row.class.trim();

  if (!validClasses.includes(trimmedClass)) {
    return null;
  }

  return {
    id: row.id.trim(),
    name: row.name.trim(),
    class: trimmedClass as any,
    hp: parseInt(row.hp || "0", 10),
    mana: parseInt(row.mana || "0", 10),
    speed: parseInt(row.speed || "0", 10),
    strengthUtility: row.strengthUtility?.trim() || "",
    skills: parseSkills(row.skills || ""),
    spriteUrl: row.spriteUrl?.trim(),
    shortDescription: row.shortDescription?.trim() || "",
    primaryStatBuff: row.primaryStatBuff?.trim() || "",
  };
}

export async function fetchCharacters(): Promise<Character[]> {
  if (!GOOGLE_SHEET_CSV_URL) {
    console.error("Google Sheets URL not configured");
    return [];
  }

  // Return cached data if available and fresh
  if (cachedCharacters && Date.now() - cacheTimestamp < CACHE_DURATION) {
    return cachedCharacters;
  }

  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL);
    const csvText = await response.text();

    return new Promise((resolve) => {
      Papa.parse<CSVRow>(csvText, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const characters: Character[] = results.data
            .map(parseCharacterRow)
            .filter((char): char is Character => char !== null);

          // Update cache
          cachedCharacters = characters;
          cacheTimestamp = Date.now();

          resolve(characters);
        },
        error: (error: unknown) => {
          console.error("Error parsing CSV:", error);
          resolve([]);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching characters:", error);
    return [];
  }
}

export function clearCharacterCache(): void {
  cachedCharacters = null;
  cacheTimestamp = 0;
}
