import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event';
import Province from '../models/Province';
import connectDB from '../config/db';

dotenv.config();

// Helper to create a future date easily
const futureDate = (monthOffset: number, day: number = 15) => {
    const d = new Date();
    d.setFullYear(2026); // Explicitly 2026 for now
    d.setMonth(d.getMonth() + monthOffset);
    d.setDate(day);
    return d;
};

const provincesData: any = {
    "cordoba": {
      nombre: "Córdoba", // Frontend likely requests "Córdoba" or we need to handle slug map
      descripcion: "Tierra de sierras, fernet y buena música.",
      heroImage: "https://i.ytimg.com/vi/FkkXBD2tinQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDDkGJeZmofvosyFrgX0taLT6eWzA",
      eventos: [
        {
          titulo: "Festival Internacional de Jazz",
          fecha: futureDate(1, 24), // Next month
          lugar: "Paseo del Buen Pastor",
          precio: 15000,
          categoria: "Música",
          imagen: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=600"
        },
        {
            titulo: "Cosquín Rock 2026",
            fecha: futureDate(2, 10), // 2 months from now
            lugar: "Santa María de Punilla",
            precio: 85000,
            categoria: "Festival",
            imagen: "https://urbanaplayfm.com/file/2024/02/20240211_203707-scaled-e1707778371834.jpeg"
        },
        {
            titulo: "Concierto de Folklore",
            fecha: futureDate(3, 15),
            lugar: "Teatro del Libertador",
            precio: 20000,
            categoria: "Música",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWoyelvKwhNxXvtYzY9RKab0jkKOueoSE-Ng&s"
        },
        {
            titulo: "Fiesta de la Vendimia",
            fecha: futureDate(4, 20),
            lugar: "Villa Carlos Paz",
            precio: 30000,
            categoria: "Festival",
            imagen: "https://fiestasnacionales.org/ArchivosCliente/202102170913531118_Fiesta-de-la-Vendimia.jpg"
        },
        {
            titulo: "Feria de Sabores Serranos",
            fecha: futureDate(5, 18),
            lugar: "Santa Rosa de Calamuchita",
            precio: 0,
            categoria: "Gastronomía",
            imagen: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600"
        }
      ]
    },
    "buenos-aires": {
      nombre: "Buenos Aires",
      descripcion: "La ciudad que nunca duerme. Tango, fútbol y vida nocturna.",
      heroImage: "https://ba-h.com.ar/wp-content/uploads/2018/10/bs-as_4.jpg",
      eventos: [
        {
            titulo: "Teatro Colón: Ópera",
            fecha: futureDate(1, 25),
            lugar: "Teatro Colón",
            precio: 15000,
            categoria: "Teatro",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZNOeTXH30ZALsv9h4YqVfKKJ3IgoGYB_WRA&s"
        },
        {
            titulo: "Boca Juniors vs River Plate",
            fecha: futureDate(2, 5),
            lugar: "La Bombonera",
            precio: 25000,
            categoria: "Deportes",
            imagen: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=600"
        },
        {
            titulo: "Festival de Jazz en San Telmo",
            fecha: futureDate(0, 28), // This month
            lugar: "Barrio San Telmo",
            precio: 12000,
            categoria: "Música",
            imagen: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=600"
        },
        {
            titulo: "Exposición de Fotografía",
            fecha: futureDate(3, 10),
            lugar: "Museo de Arte Moderno",
            precio: 8000,
            categoria: "Arte",
            imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIYHh6zTJtoo0ZN-rlscVfUqKzlqYYCAo4Tg&s"
        }
      ]
    },
    "santa-fe": {
      nombre: "Santa Fe",
      descripcion: "Cuna de la bandera, el río Paraná y grandes artistas.",
      heroImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFHm2BTnMuQO3WVowknh75_x-O5WnD2ahLxg&s",
      eventos: [
        { 
        titulo: "Fiesta Provincial del Trigo",
        fecha: futureDate(1, 26),
        lugar: "San Genaro",
        precio: 0,
        categoria: "Música",
        imagen: "https://www.santafe.gob.ar/noticias/media/cache/thumb_no_full/recursos/fotos/2024/12/2024-12-30NID_282024O_1.jpeg"
      },
      {
          titulo: "Fiesta Provincial de la Carne",
          fecha: futureDate(2, 10),
          lugar: "Localidad de Nelson",
          precio: 5000,
          categoria: "Festival",
          imagen: "https://www.santafe.gob.ar/ms/operativo-verano/wp-content/uploads/sites/65/2024/12/avellaneda-asado-a-la-estaca.jpg"
      },
      {
          titulo: "Regata Internacional",
          fecha: futureDate(3, 15),
          lugar: "Río Paraná",
          precio: 10000,
          categoria: "Deportes",
          imagen: "https://www.santafe.gob.ar/noticias/recursos/fotos/2025/10/2025-10-03NID_284247O_1.jpeg"
      },
      {
          titulo: "Festival de Teatro Callejero",
          fecha: futureDate(0, 20),
          lugar: "Centro Histórico",
          precio: 0,
          categoria: "Teatro",
          imagen: "https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&q=80&w=600"
      }
    ]
    },
    "jujuy": {
      nombre: "Jujuy",
      descripcion: "La tierra de los colores, la Pachamama y el carnaval.",
      heroImage: "https://grupovierci.brightspotcdn.com/dims4/default/e561102/2147483647/strip/true/crop/4624x2603+0+0/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk2-prod-grupo-vierci.s3.us-east-1.amazonaws.com%2Fbrightspot%2F58%2F06%2F557397564c2a8be5e74d66fafc32%2Fjujuy-turismo.jpeg",
      eventos: [
        { 
        titulo: "Carnaval de la Quebrada",
        fecha: futureDate(0, 26),
        lugar: "Tilcara y Purmamarca",
        precio: 10000,
        categoria: "Música y Baile",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSW1ER4_VtwZra4is4SsYnYTJpn5HiegOyQ&s"
      },
      {
          titulo: "Procesion de la Virgen Punta Corral",
          fecha: futureDate(1, 10),
          lugar: "Tumbaya y Tilcara",
          precio: 0,
          categoria: "Festival",
          imagen: "https://media.todojujuy.com/p/85b9fcb8072a82c06d7d59796cad1582/adjuntos/227/imagenes/003/216/0003216954/790x0/smart/virgen-copacabana-punta-corral.jpg",
      },
      {
          titulo: "Fiesta de la Pachamama",
          fecha: futureDate(6, 1),
          lugar: "Quebrada de Humahuaca",
          precio: 5000,
          categoria: "Cultural",
          imagen: "https://fiestasnacionales.org/img/GestionFiesta/Pachamama-en-Jujuy-portada.jpg"
      },
      {
          titulo: "Trekking en las Salinas Grandes",
          fecha: futureDate(2, 10),
          lugar: "Salinas Grandes",
          precio: 15000,
          categoria: "Aventura",
          imagen: "https://adntravel.com.ar/wp-content/uploads/2022/04/salinas-grandes-jujuy-argentina.jpg"
      }
    ]
    },
    "formosa": {
      nombre: "Formosa",
      descripcion: "Naturaleza virgen, el Bañado La Estrella y cultura litoraleña.",
      heroImage: "https://www.elcomercial.com.ar/content/bucket/3/18403w850h566c.jpg.webp",
      eventos: [
        { 
          titulo: "Fiesta Nacional del Pomelo",
          fecha: futureDate(7, 13),
          lugar: "Laguna Blanca",
          precio: 0,
          categoria: "Festival",
          imagen: "https://guauformosa-s3.cdn.net.ar/s3i233/2023/10/guauformosa/images/31/03/310310_6fec18ea12ebeeed2bb0e8b90e60a96d0874d98b2ded08e831644f34ecf0f989/md.webp"
        },
        { 
          titulo: "Fiesta Nacional de la Corvina",
          fecha: futureDate(0, 11),
          lugar: "Herradura",
          precio: 0,
          categoria: "Festival",
          imagen: "https://www.noticiasformosa.com.ar/wp-content/uploads/2024/02/IMG_3577-e1708901264189.jpg"
        },
        {
          titulo: "Festival río, mate y tereré",
          fecha: futureDate(0, 15),
          lugar: "Formosa Capital",
          precio: 8000,
          categoria: "Festival",
          imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC_Ow06S_hGWGknXQQGs9QxSoY48DC4clR8g&s"
        },
        {
          titulo: "Excursión al Bañado La Estrella",
          fecha: futureDate(1, 1),
          lugar: "Bañado La Estrella",
          precio: 12000,
          categoria: "Naturaleza",
          imagen: "https://www.larutanatural.gob.ar/panel/public/uploads/rutas-naturales/originals/340e4972-f440-4ca4-8ea8-833919ad937d.jpg"
        }
      ]
    }
};

const nationalTrends = [
  {
    titulo: "Lollapalooza Argentina 2026",
    fecha: futureDate(1, 20),
    lugar: "Hipódromo SI",
    precio: 120000,
    categoria: "Festival",
    imagen: "https://images.unsplash.com/photo-1459749411177-0473ef7161a8?auto=format&fit=crop&q=80&w=600"
  },
  {
    titulo: "Cosquín Rock 2026",
    fecha: futureDate(2, 10),
    lugar: "Punilla, Cba",
    precio: 85000,
    categoria: "Rock",
    imagen: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600"
  },
  {
    titulo: "Carnaval Gualeguaychú 2026",
    fecha: futureDate(0, 15),
    lugar: "Entre Ríos",
    precio: 15000,
    categoria: "Carnaval",
    imagen: "https://images.unsplash.com/photo-1565593845686-350742f9e422?auto=format&fit=crop&q=80&w=600"
  },
  {
    titulo: "Fiesta Vendimia 2026",
    fecha: futureDate(1, 5),
    lugar: "Mendoza",
    precio: 25000,
    categoria: "Cultura",
    imagen: "https://images.unsplash.com/photo-1599077638157-c57c74318624?auto=format&fit=crop&q=80&w=600"
  }
];

const seedDB = async () => {
    try {
        await connectDB();
        
        await Event.deleteMany({});
        await Province.deleteMany({});
        console.log('Eventos y Provincias anteriores eliminados...');

        // Seed Provinces
        for (const [key, data] of Object.entries(provincesData)) {
            const provinceName = (data as any).nombre;
            const events = (data as any).eventos;

            // Seed Province
            const newProvince = new Province({
                name: provinceName,
                slug: key,
                description: (data as any).descripcion,
                heroImage: (data as any).heroImage
            });
            await newProvince.save();

            for (const event of events) {
                const newEvent = new Event({
                    title: event.titulo,
                    description: `Disfruta de ${event.titulo} en ${event.lugar}.`,
                    date: event.fecha,
                    location: event.lugar,
                    province: provinceName, // Linking by name for now
                    category: event.categoria,
                    imageUrl: event.imagen,
                    price: event.precio
                });
                await newEvent.save();
            }
        }
        console.log('Provincias y eventos provinciales cargados...');

        // Seed National Trends
        for (const trend of nationalTrends) {
             const newEvent = new Event({
                title: trend.titulo,
                description: `Evento destacado nacional: ${trend.titulo}`,
                date: trend.fecha,
                location: trend.lugar,
                province: "Nacional", // Distinguishing category
                category: trend.categoria,
                imageUrl: trend.imagen,
                price: trend.precio
            });
            await newEvent.save();
        }
        console.log('Tendencias nacionales cargadas...');

        console.log('¡Base de datos poblada con éxito!');
        process.exit();
    } catch (error) {
        console.error('Error al poblar la base de datos:', error);
        process.exit(1);
    }
};

seedDB();
