import { prisma } from "../lib/prisma";
import type { Prisma } from "../prisma/generated/client";

const createdAt = new Date();
const updatedAt = new Date();

async function main() {
  const circuits: Prisma.CircuitCreateManyInput[] = [
    {
      name: "Bahrain GP",
      slug: "bahrain-gp",
      description: "Bahrein, Sakhir",
      location: "Unknown",
      flag: "bhr",
      createdAt,
    },
    {
      name: "Azerbaijan GP",
      slug: "azerbaijan-gp",
      description: "Baku City Circuit",
      location: "Unknown",
      flag: "aze",
      createdAt,
    },
    {
      name: "Hungarian GP",
      slug: "hungarian-gp",
      description: "Hungaroring, Budapest",
      location: "Unknown",
      flag: "hun",
      createdAt,
    },
    {
      name: "British GP",
      slug: "british-gp",
      description: "Circuit Silverstone",
      location: "Unknown",
      flag: "gbr",
      createdAt,
    },
    {
      name: "Brazilian GP",
      slug: "brazilian-gp",
      description: "Interlagos, São Paulo",
      location: "Unknown",
      flag: "bra",
      createdAt,
    },
    {
      name: "Emilia Romagna GP",
      slug: "emilia-romagna-gp",
      description: "Imola",
      location: "Unknown",
      flag: "ita",
      createdAt,
    },
    {
      name: "Spanish GP",
      slug: "spanish-gp",
      description: "Barcelona",
      location: "Unknown",
      flag: "esp",
      createdAt,
    },
    {
      name: "Dutch GP",
      slug: "dutch-gp",
      description: "Circuit Zandvoort",
      location: "Unknown",
      flag: "nld",
      createdAt,
    },
    {
      name: "Monaco GP",
      slug: "monaco-gp",
      description: "Monte Carlo",
      location: "Unknown",
      flag: "mco",
      createdAt,
    },
    {
      name: "Italian GP",
      slug: "italian-gp",
      description: "Monza",
      location: "Unknown",
      flag: "ita",
      createdAt,
    },
    {
      name: "Russian GP",
      slug: "russian-gp",
      description: "Sochi Autodrom",
      location: "Unknown",
      flag: "rus",
      createdAt,
    },
    {
      name: "Abu Dhabi GP",
      slug: "abu-dhabi-gp",
      description: "Yas Marina Circuit",
      location: "Unknown",
      flag: "are",
      createdAt,
    },
    {
      name: "French GP",
      slug: "french-gp",
      description: "Circuit Paul Ricard, Le Castellet",
      location: "Unknown",
      flag: "fra",
      createdAt,
    },
    {
      name: "Belgian GP",
      slug: "belgian-gp",
      description: "Spa-Francorchamps",
      location: "Unknown",
      flag: "bel",
      createdAt,
    },
    {
      name: "Mexican GP",
      slug: "mexican-gp",
      description: "Autodromo Hermanos Rodriguez",
      location: "Unknown",
      flag: "mex",
      createdAt,
    },
    {
      name: "Portuguese GP",
      slug: "portuguese-gp",
      description: "Portimão",
      location: "Unknown",
      flag: "por",
      createdAt,
    },
    {
      name: "Austrian GP",
      slug: "austrian-gp",
      description: "Red Bull Ring, Spielberg",
      location: "Unknown",
      flag: "aut",
      createdAt,
    },
    {
      name: "United States GP",
      slug: "united-states-gp",
      description: "Austin, Texas",
      location: "Unknown",
      flag: "usa",
      createdAt,
    },
    {
      name: "Saudi Arabian GP",
      slug: "saudi-arabian-gp",
      description: "Jeddah Street Circuit",
      location: "Unknown",
      flag: "sau",
      createdAt,
    },
    {
      name: "Australian GP",
      slug: "australian-gp",
      description: "Melbourne",
      location: "Melbourne",
      flag: "au",
      createdAt,
    },
    {
      name: "Japanese GP",
      slug: "japanese-gp",
      description: "Suzuka Circuit",
      location: "Japan",
      flag: "jap",
      createdAt,
    },
    {
      name: "Chinese GP",
      slug: "chinese-gp",
      description: "Shanghai",
      location: "China",
      flag: "chi",
      createdAt,
    },
    {
      name: "Singapore GP",
      slug: "singapore-gp",
      description: "Marina Bay Street Circuit",
      location: "Unknown",
      flag: "sgp",
      createdAt,
    },
    {
      name: "Canadian GP",
      slug: "canadian-gp",
      description: "Gilles Villeneuve",
      location: "Montreal",
      flag: "can",
      createdAt,
    },
    {
      name: "Miami GP",
      slug: "miami-gp",
      description: "Miami International Autodrome",
      location: "Unknown",
      flag: "usa",
      createdAt,
    },
  ];

  const newCircuits = await prisma.circuit.createMany({
    data: circuits,
    skipDuplicates: true,
  });

  console.log(`Added ${newCircuits.count} circuits`);

  const times: Prisma.TimeCreateManyInput[] = [
    {
      time: "01:17.571",
      gamertag: "CSI-SNIPER",
      circuitId: 1,
      createdAt,
      updatedAt,
    },
    {
      time: "01:16.126",
      gamertag: "nickspaargaren25",
      circuitId: 2,
      createdAt,
      updatedAt,
    },
    {
      time: "01:08.404",
      gamertag: "CSI-SNIPER",
      circuitId: 3,
      createdAt,
      updatedAt,
    },
    {
      time: "01:10.213",
      gamertag: "nickspaargaren25",
      circuitId: 3,
      createdAt,
      updatedAt,
    },
  ];

  const newTimes = await prisma.time.createMany({
    data: times,
    skipDuplicates: true,
  });

  console.log(`Added ${newTimes.count} times`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
