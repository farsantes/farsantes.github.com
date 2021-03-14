import Vue from "@/libraries/vue";
import postsStore from "@/store/posts";

const explicaciones = [
  {
    id: "kztr30",
    name: "Chemtrails",
    image: "https://preview.redd.it/b8gvrcvemac61.jpg?width=940&format=pjpg&auto=webp&s=19002e7c46012d57d5b046e65c5c9e1566ba8c49",
    tags: ["chemtrails"]
  },
  {
    id: "l0mknu",
    name: "Llegó el hombre a la luna?",
    image: "https://preview.redd.it/rf4oqugx9bc61.jpg?width=1200&format=pjpg&auto=webp&s=2587b1bcb49a1c18ea3865092faf75a67fa798cb",
    tags: ["conspiracion-alunizaje"]
  },
  {
    id: "l0mcbu",
    name: "covid-19, un arma biológica?",
    image: "https://preview.redd.it/ywedvd6n7bc61.png?width=690&format=png&auto=webp&s=aab1e202dbbae04f887b4ae298e8d61da3de28af",
    tags: ["covid-arma-biologica"]
  },
  {
    id: "l0kdaz",
    name: "Bitcoin, invento de la élite?",
    image: "https://preview.redd.it/4iqgwi10pac61.jpg?width=1200&format=pjpg&auto=webp&s=be11004b52b3bc6836a9653dfda914a7d6be6332",
    tags: ["control-del-bitcoin"]
  },
  {
    id: "l0kebv",
    name: "MMS",
    image: "https://preview.redd.it/0kmwd86eqac61.jpg?width=672&format=pjpg&auto=webp&s=a6d732de64622fb86e4e4dab3e7cfe4cc969153b",
    tags: ["mms"]
  },
  {
    id: "l0khgi",
    name: "Nieve de plástico?",
    image: "https://preview.redd.it/p6oc7vekqac61.jpg?width=1008&format=pjpg&auto=webp&s=2a5657acd71e06c3e2cb231aece1e8ce45082685",
    tags: ["nieve-plastico"]
  },
  {
    id: "l0kjyv",
    name: "PCR, dice el creador que no sirven?",
    image: "https://preview.redd.it/q2c41wd7rac61.jpg?width=840&format=pjpg&auto=webp&s=0d608a7e551f4a8c6d6851289fdde6f7de4f3756",
    tags: ["pcr-no-sirve"]
  },
  {
    id: "l0klfx",
    name: "Es la tierra plana?",
    image: "https://preview.redd.it/ki8882dnrac61.jpg?width=1280&format=pjpg&auto=webp&s=dde2f76c044a77f40fce2073d91aa83e99d66ebb",
    tags: ["terraplanismo"]
  },
  // https://chequeado.com/el-explicador/son-falsas-varias-afirmaciones-del-medico-luis-martinez-que-circulan-en-videos-virales/
  // https://chequeado.com/verificacionfb/es-falso-que-la-nueva-vacuna-contra-el-coronavirus-tiene-arn-digitalizable-que-se-activa-mediante-el-5g-y-puede-reactivar-el-virus/
  // https://www.reuters.com/article/uk-factcheck-espanol-vacuna-ogm/declaracin-falsa-una-vacuna-contra-la-enfermedad-covid-19-modificar-genticamente-a-los-humanos-idUSKBN22Y2UJ
  // { name: "Las vacunas pueden cambiar el ADN?" },
  {
    id: "l0knnj",
    name: "Vacunas se hacen con fetos?",
    image: "https://preview.redd.it/h63jdlqwrac61.jpg?width=1280&format=pjpg&auto=webp&s=083f7f413bfce398f86f2dbfb11892e813bb9b7f",
    tags: ["vacunas-con-fetos"]
  },
];

const fuentes = [
  // { name: "Alberto Zangrillo" }, //el médico de Berlusconi
  {
    id: "l0l2iv",
    name: "Andreas Kalcker",
    description: "Medicina Alternativa y Biofísica Natural",
    image: "https://sdestendhal.com/wp-content/uploads/2019/05/El_MMS_Pegarle_un_poquito_a_la_lej%C3%ADa_no_cura_el_autismo.jpg",
    // audience: "5.259 (lbry.tv)"",
    // audience: "5.885 (twitter)"",
    audience: "515.400 (youtube Misión Vida)",
    tags: ["mms"]
  },
  // { name: "Bartomeu Payeras" }, //covid-5g
  // {
  //   id: "l0l5ql",
  //   name: "Cardenal Cañizares",
  //   image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Card._Canizares_%2830279529724%29.jpg/245px-Card._Canizares_%2830279529724%29.jpg",
  //   audience: "200.000 (firmas contra la reprobación)",
  //   tags: ["vacunas-con-fetos"]
  // },
  // { name: "Carrie Madej" }, //osteopata/vaccine modfifies DNA
  {
    id: "l0l8z8",
    name: "Chinda Brandolino",
    image: "https://pbs.twimg.com/profile_images/1271300763441156096/QCRlA606_400x400.jpg",
    audience: "1.300.000 (youtube GQ Radio)",
    tags: ["vacunas-con-fetos"]
  },
  {
    id: "l0kpeb",
    name: "Daniel Estulín",
    image: "https://preview.redd.it/d0d347gltac61.jpg?width=1400&format=pjpg&auto=webp&s=abc151d19e7465623b8b8d1ff98588ca29a108d4",
    audience: "73.000 (youtube video)",
    tags: ["control-del-bitcoin", "covid-arma-biologica"]
  },
  // { name: "Dietrich Klinghardt" },
  // { name: "Eladio Fernandez" }, //https://eladiofernandez.wordpress.com
  // { name: "Fernando Lopez Mirones" }, //nosotros mismos seamos un ser transgénico
  // { name: "Fox News" },
  {
    id: "l0ktb0",
    name: "Guardacielos.org",
    image: "https://preview.redd.it/ajc1ardttac61.png?width=940&format=png&auto=webp&s=fb3cdc105a0ff9bbfa7e0eab680392b4e976f3ac",
    audience: "24.000 (youtube entrevista)",
    tags: ["chemtrails"]
  },
  {
    id: "l0ku8k",
    name: "Javier Villamor",
    image: "https://preview.redd.it/ktec38v2uac61.jpg?width=747&format=pjpg&auto=webp&s=918d8c5c76bed45a181c8b8bcf604f0e361c8466",
    audience: "17.300 (youtube canal)",
    tags: ["covid-arma-biologica"]
  },
  {
    id: "l0kv3c",
    name: "Jim Humble",
    image: "https://preview.redd.it/58oq1nb9uac61.jpg?width=400&format=pjpg&auto=webp&s=8515c1a13d7dcae1e79de60db9065d50fa78f11b",
    audience: "6.000 (pacientes)",
    tags: ["mms"]
  },
  // { name: "Jose Antonio Campoy" },Director de la revista científica Discovery Salud / Estudios: Ciencias de la información (sección periodismo)
  {
    id: "l0kvzz",
    name: "Li Meng Yan",
    image: "https://preview.redd.it/sn7nymuiuac61.jpg?width=624&format=pjpg&auto=webp&s=ca717fc73312427aa6a1647ff99983c64d009b2a",
    audience: "2.907.000 (TV)",
    tags: ["covid-arma-biologica"]
  },
  // { name: "Miguel Bose" },
  {
    id: "m4t9ru",
    name: "John Magufuli (Presidente de Tanzania)",
    image: "https://preview.redd.it/618vzjxp7zm61.jpg?width=860&format=pjpg&auto=webp&s=ff309d131400c8f1ecee0a4fb04e18cea5fd3e80",
    audience: "55.966.030 (Población Tanzania)",
    tags: ["pcr-no-sirve"]
  },
  {
    id: "l0kxsx",
    name: "Josep Pàmies",
    image: "https://preview.redd.it/71d327ryuac61.jpg?width=300&format=pjpg&auto=webp&s=51e8b1eaf5e2bd49a0028db90f06a616667867d4",
    audience: "330.000 (facebook)", //https://www.facebook.com/aleixpamies/posts/728149144206603/
    tags: ["mms", "vacunas-con-fetos"]
  },
  // { name: "Pilar Baselga" }, //nomoriridiota.blogspot.com
  {
    id: "l0kybl",
    name: "Rashid Buttar",
    image: "https://preview.redd.it/kbri2315vac61.jpg?width=400&format=pjpg&auto=webp&s=a0c120f7b3028328c2da3d7229f8e67b33ee0886",
    audience: "500.000 (youtube canal)",
    tags: ["covid-arma-biologica"]
  },
  {
    id: "l0kz4x",
    name: "Ricardo Delgado Martin (La Quinta Columna TV5)",
    image: "https://preview.redd.it/lth3k5lbvac61.png?width=678&format=png&auto=webp&s=e3c0007f57ac33cd42fefaf1ce95eca969c48118",
    audience: "137.000 (La Quinta Columna youtube video)",
    tags: ["covid-arma-biologica"] //5G-covid
  },
]

const posts = { explicaciones, fuentes }

const confirmsStore = new Vue({
  name: "PostsStore",
  data() {
    return {
      posts
    }
  },
  computed: {
    tags(): string[] {
      const tags: string[] = [];

      for (const group in postsStore.posts) {
        for (const post of postsStore.posts[group]) {
          if (!post.id) continue;
          tags.push(...post.tags);
        }
      }

      return [...new Set(tags)];
    },
  }
});

export default confirmsStore;