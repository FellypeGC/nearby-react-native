import { prisma } from "@/database/prisma"

async function seed() {
  await prisma.category.createMany({
    data: [
      { id: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d", name: "Food" },
      { id: "52e81585-f71a-44cd-8bd0-49771e45da44", name: "Shopping" },
      { id: "57d6e5ff-35f6-4d21-a521-84f23d511d25", name: "Lodging" },
      { id: "826910d4-187d-4c15-88f4-382b7e056739", name: "Cinema" },
      { id: "abce52cf-b33b-4b3c-8972-eb72c66c83e4", name: "Bakery" },
    ],
  })

  await prisma.market.createMany({
    data: [
      // FOOD
      {
        id: "012576ea-4441-4b8a-89e5-d5f32104c7c4",
        categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
        name: "Flavor Grill",
        description:
          "Steakhouse with premium cuts and a varied buffet. A complete experience for meat lovers.",
        latitude: -23.55974230991911,
        longitude: -46.65814845249887,
        coupons: 10,
        address: "Av. Paulista - Bela Vista",
        phone: "(11) 94567-1212",
        cover:
          "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&h=300",
      },
      {
        id: "2bc11e34-5f30-4ba0-90fa-c1c98f649281",
        categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
        name: "Central Café",
        description:
          "Cozy café with snacks and craft drinks. Perfect for a break.",
        latitude: -23.559457108504436,
        longitude: -46.66252581753144,
        coupons: 10,
        address: "Alameda Jaú - Jardim Paulista",
        phone: "(12) 3456-7890",
        cover:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300",
      },
      {
        id: "4197b830-aa9c-40d4-a22e-c05043588a77",
        categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
        name: "Burger Up",
        description:
          "Gourmet burgers made fresh to order. Fresh ingredients and unique combos.",
        latitude: -23.56011117635681,
        longitude: -46.65636680690605,
        coupons: 10,
        address: "Rua Peixoto Gomide - Jardim Paulista",
        phone: "(13) 98765-4321",
        cover:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=400&h=300",
      },
      {
        id: "4209c72f-9d14-410c-91af-c24d08f177cc",
        categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
        name: "Sweet & Delight",
        description:
          "Bakery with amazing cakes and desserts. Display cakes and craft specialties.",
        latitude: -23.562559674925577,
        longitude: -46.6529362971225,
        coupons: 10,
        address: "Rua Treze de Maio - Jardim Paulista",
        phone: "(14) 2345-6789",
        cover:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300",
      },
      {
        id: "4e6dd864-f04a-4711-9db2-e5624fd32b8e",
        categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
        name: "Green Life",
        description:
          "Vegan restaurant with healthy, tasty dishes. Natural food in a cozy setting.",
        latitude: -23.563839021677836,
        longitude: -46.65801352185607,
        coupons: 10,
        address: "Alameda Jaú - Jardim Paulista",
        phone: "(15) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300",
      },
      // SHOPPING
      {
        id: "6dbf1cd5-c20a-4e6a-bc9a-a26069825d2c",
        categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
        name: "Nova Store",
        description:
          "Modern clothes and accessories for everyday life. Casual style at great prices.",
        latitude: -23.564580184943406,
        longitude: -46.66202724389377,
        coupons: 10,
        address: "Rua José Maria Lisboa - Jardim Paulista",
        phone: "(16) 3456-7890",
        cover:
          "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=400&h=300",
      },
      {
        id: "756b1d53-cc5b-4995-8ebd-8eee3dae01af",
        categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
        name: "Tech Plus",
        description:
          "Electronics store with next-generation products. Gadgets and accessories for everyone.",
        latitude: -23.56183474903135,
        longitude: -46.66355095952655,
        coupons: 10,
        address: "Alameda Franca - Cerqueira César",
        phone: "(17) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300",
      },
      {
        id: "77a5d5eb-bcfa-4457-916d-a5b6fe7aa183",
        categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
        name: "Lux Home",
        description:
          "Sophisticated décor for home and office. Exclusive products for elegant spaces.",
        latitude: -23.55870738391179,
        longitude: -46.66172705741049,
        coupons: 10,
        address: "Alameda Santos - Jardim Paulista",
        phone: "(18) 2345-6789",
        cover:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300",
      },
      {
        id: "78806cca-cfb0-45bc-8dc3-c57a42f0da01",
        categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
        name: "BookMart",
        description:
          "Bookstore specializing in best-sellers and classics. A cozy space for reading.",
        latitude: -23.556376883488902,
        longitude: -46.65941413229616,
        coupons: 10,
        address: "Rua Luís Coelho - Consolação",
        phone: "(19) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300",
      },
      {
        id: "78ced7b1-436b-42ca-9c66-747f2b671321",
        categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
        name: "Green Market",
        description:
          "Organic, healthy products for your daily life. Fresh, sustainable food.",
        latitude: -23.55473446617852,
        longitude: -46.65859874077045,
        coupons: 10,
        address: "Rua Matias Aires - Consolação",
        phone: "(11) 8765-4321",
        cover:
          "https://images.unsplash.com/photo-1556740749-887f6717d7e4?w=400&h=300",
      },
      // LODGING
      {
        id: "7be85f5b-533f-4974-8c9e-75cae740041c",
        categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
        name: "Blue Sky Hotel",
        description:
          "Modern hotel with cozy rooms. Perfect for relaxing.",
        latitude: -23.554120626142016,
        longitude: -46.65203378772091,
        coupons: 10,
        address: "Rua Dr. Penaforte Mendes - Bela Vista ",
        phone: "(12) 1234-5678",
        cover:
          "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=400&h=300",
      },
      {
        id: "806c7934-037b-4dcd-99bb-c0fc6f2c5a45",
        categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
        name: "Serene House",
        description:
          "Charming inn in the heart of the city, with a calm atmosphere and personalized service.",
        latitude: -23.55165437523632,
        longitude: -46.649795512210524,
        coupons: 10,
        address: "Rua Frei Caneca - Consolação",
        phone: "(13) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300",
      },
      {
        id: "8cf0433e-68de-4c2a-9fff-c0c2941ec521",
        categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
        name: "Urban Suites",
        description:
          "Sophisticated downtown accommodation. Perfect for business or leisure trips.",
        latitude: -23.55466938453421,
        longitude: -46.65173990250655,
        coupons: 10,
        address: "R. Dr. Penaforte Mendes - Bela Vista, São Paulo",
        phone: "(14) 2345-6789",
        cover:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300",
      },
      {
        id: "b2c3014d-64bd-4c01-95e9-7f408e12ff6f",
        categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
        name: "Encanto Villa",
        description:
          "Rustic cottages in a quiet area. An exclusive stay with total privacy.",
        latitude: -23.56516128294298,
        longitude: -46.66117774949042,
        coupons: 10,
        address: "Rua José Maria Lisboa - Jardins",
        phone: "(15) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300",
      },
      {
        id: "b3a4dab2-1b83-4015-ba95-22f5770c6108",
        categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
        name: "Royal Inn",
        description:
          "Boutique hotel with classic design and excellent service. A luxurious, comfortable stay.",
        latitude: -23.56210372033115,
        longitude: -46.65926304595067,
        coupons: 10,
        address: "Alameda Jaú - Jardim Paulista",
        phone: "(16) 3456-7890",
        cover:
          "https://images.unsplash.com/photo-1558979158-65a1eaa08691?w=400&h=300",
      },
      // CINEMA
      {
        id: "bde73364-95c5-46e4-8084-79a7ca3824c4",
        categoryId: "826910d4-187d-4c15-88f4-382b7e056739",
        name: "CineStar",
        description:
          "Modern cinema with comfortable rooms and state-of-the-art technology.",
        latitude: -23.548482381146595,
        longitude: -46.659142416446386,
        coupons: 10,
        address: "Av. Angélica - Consolação",
        phone: "(17) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300",
      },
      {
        id: "c5271f4e-6058-4eda-8b08-0e7fb0b73a0d",
        categoryId: "826910d4-187d-4c15-88f4-382b7e056739",
        name: "MovieLand",
        description:
          "Cultural venue with a varied selection of films and exclusive festivals.",
        latitude: -23.544459765576214,
        longitude: -46.639557261292346,
        coupons: 10,
        address: "R. 24 de Maio - República",
        phone: "(11) 2345-6789",
        cover:
          "https://images.unsplash.com/photo-1497493292307-31c376b6e479?w=400&h=300",
      },
      {
        id: "d21b8cad-8d01-4ffd-8117-a34d613cdcf5",
        categoryId: "826910d4-187d-4c15-88f4-382b7e056739",
        name: "MaxScreen",
        description:
          "Neighborhood cinema with a cozy atmosphere, classic films and new releases.",
        latitude: -23.545525145028346,
        longitude: -46.641431974786606,
        coupons: 10,
        address: "Rua Sete de Abril - República",
        phone: "(19) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300",
      },
      // BAKERY
      {
        id: "def71683-e89f-4c3b-a652-868a02f54ae9",
        categoryId: "abce52cf-b33b-4b3c-8972-eb72c66c83e4",
        name: "Golden Grain",
        description:
          "Famous for its croissants and naturally leavened breads.",
        latitude: -23.54000232292889,
        longitude: -46.64680389012777,
        coupons: 10,
        address: "Av. Duque de Caxias  - Santa Ifigênia",
        phone: "(11) 5432-1098",
        cover:
          "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400&h=300",
      },
      {
        id: "e4949574-a579-4b07-a005-3fc4b7339752",
        categoryId: "abce52cf-b33b-4b3c-8972-eb72c66c83e4",
        name: "Bread & Co.",
        description:
          "Craft bakery with fresh breads and homemade treats every day.",
        latitude: -23.523537811033677,
        longitude: -46.62669283245777,
        coupons: 10,
        address: "Rua Guaporé - Luz ",
        phone: "(11) 8765-4321",
        cover:
          "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=400&h=300",
      },
      {
        id: "ea097b60-d0fb-41aa-ad44-a7ed850c9ecd",
        categoryId: "abce52cf-b33b-4b3c-8972-eb72c66c83e4",
        name: "Sweet Dough",
        description:
          "Specialized in sweets and snacks, with full breakfast options.",
        latitude: -23.529972517386824,
        longitude: -46.62928337478692,
        coupons: 10,
        address: "Rua Alfredo Maia - Luz",
        phone: "(11) 1234-5678",
        cover:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300",
      },
      {
        id: "ebfecf67-fe4d-4137-90f0-b7083fd58da1",
        categoryId: "abce52cf-b33b-4b3c-8972-eb72c66c83e4",
        name: "City Bakery",
        description:
          "Neighborhood bakery with rustic, traditional breads baked fresh.",
        latitude: -23.534594559751564,
        longitude: -46.63463225944563,
        coupons: 10,
        address: "Praça da Luz - Bom Retiro",
        phone: "(11) 9876-5432",
        cover:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300",
      },
    ],
  })

  await prisma.rules.createMany({
    data: [
      {
        marketId: "012576ea-4441-4b8a-89e5-d5f32104c7c4",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "2bc11e34-5f30-4ba0-90fa-c1c98f649281",
        description: "Available until 01/15/2027",
      },
      {
        marketId: "4197b830-aa9c-40d4-a22e-c05043588a77",
        description: "Available until 01/20/2027",
      },
      {
        marketId: "4209c72f-9d14-410c-91af-c24d08f177cc",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "4e6dd864-f04a-4711-9db2-e5624fd32b8e",
        description: "Available until 01/15/2027",
      },
      {
        marketId: "6dbf1cd5-c20a-4e6a-bc9a-a26069825d2c",
        description: "Available until 01/20/2027",
      },
      {
        marketId: "756b1d53-cc5b-4995-8ebd-8eee3dae01af",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "77a5d5eb-bcfa-4457-916d-a5b6fe7aa183",
        description: "Available until 01/10/2027",
      },
      {
        marketId: "78806cca-cfb0-45bc-8dc3-c57a42f0da01",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "78ced7b1-436b-42ca-9c66-747f2b671321",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "7be85f5b-533f-4974-8c9e-75cae740041c",
        description: "Available until 01/15/2027",
      },
      {
        marketId: "806c7934-037b-4dcd-99bb-c0fc6f2c5a45",
        description: "Available until 01/20/2027",
      },
      {
        marketId: "8cf0433e-68de-4c2a-9fff-c0c2941ec521",
        description: "Available until 01/07/2027",
      },
      {
        marketId: "b2c3014d-64bd-4c01-95e9-7f408e12ff6f",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "b3a4dab2-1b83-4015-ba95-22f5770c6108",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "bde73364-95c5-46e4-8084-79a7ca3824c4",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "c5271f4e-6058-4eda-8b08-0e7fb0b73a0d",
        description: "Available until 01/15/2027",
      },
      {
        marketId: "d21b8cad-8d01-4ffd-8117-a34d613cdcf5",
        description: "Available until 01/20/2027",
      },
      {
        marketId: "def71683-e89f-4c3b-a652-868a02f54ae9",
        description: "Available until 12/31/2026",
      },
      {
        marketId: "e4949574-a579-4b07-a005-3fc4b7339752",
        description: "Available until 01/15/2027",
      },
      {
        marketId: "ea097b60-d0fb-41aa-ad44-a7ed850c9ecd",
        description: "Available until 02/25/2027",
      },
      {
        marketId: "ebfecf67-fe4d-4137-90f0-b7083fd58da1",
        description: "Available until 02/01/2027",
      },
      {
        marketId: "012576ea-4441-4b8a-89e5-d5f32104c7c4",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "2bc11e34-5f30-4ba0-90fa-c1c98f649281",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "4197b830-aa9c-40d4-a22e-c05043588a77",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "4209c72f-9d14-410c-91af-c24d08f177cc",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "4e6dd864-f04a-4711-9db2-e5624fd32b8e",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "6dbf1cd5-c20a-4e6a-bc9a-a26069825d2c",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "756b1d53-cc5b-4995-8ebd-8eee3dae01af",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "77a5d5eb-bcfa-4457-916d-a5b6fe7aa183",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "78806cca-cfb0-45bc-8dc3-c57a42f0da01",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "78ced7b1-436b-42ca-9c66-747f2b671321",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "7be85f5b-533f-4974-8c9e-75cae740041c",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "806c7934-037b-4dcd-99bb-c0fc6f2c5a45",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "8cf0433e-68de-4c2a-9fff-c0c2941ec521",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "b2c3014d-64bd-4c01-95e9-7f408e12ff6f",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "b3a4dab2-1b83-4015-ba95-22f5770c6108",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "bde73364-95c5-46e4-8084-79a7ca3824c4",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "c5271f4e-6058-4eda-8b08-0e7fb0b73a0d",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "d21b8cad-8d01-4ffd-8117-a34d613cdcf5",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "def71683-e89f-4c3b-a652-868a02f54ae9",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "e4949574-a579-4b07-a005-3fc4b7339752",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "ea097b60-d0fb-41aa-ad44-a7ed850c9ecd",
        description: "Valid for on-site consumption only",
      },
      {
        marketId: "ebfecf67-fe4d-4137-90f0-b7083fd58da1",
        description: "Valid for on-site consumption only",
      },
    ],
  })
}

seed().then(() => {
  console.log("Database seeded!")
  prisma.$disconnect()
})
