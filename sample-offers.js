// عروض تجريبية مؤقتة — بتنشال لما نربط قاعدة البيانات في الجزء الجاي
const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

const SAMPLE_OFFERS = [
  {
    id: 101, type: 'villa', city: 'الرياض', district: 'النرجس', direction: 'north',
    price: 2450000, priceDisplay: 'negotiable',
    area: 375, rooms: 5, bathrooms: 4, ageYears: 0, facade: 'شمالية', streetWidth: 20,
    features: ['مجلس رجال', 'غرفة خادمة', 'مصعد', 'حوش', 'مكيفات راكبة', 'مطبخ راكب'],
    description: 'فيلا جديدة بتشطيب فاخر، قريبة من الخدمات والمدارس، ومداخلها مستقلة.',
    adLicense: null, status: 'available', createdAt: daysAgo(1),
    images: ['/samples/villa-exterior.svg', '/samples/living-room.svg', '/samples/kitchen.svg'],
  },
  {
    id: 102, type: 'apartment', city: 'الرياض', district: 'الملقا', direction: 'north',
    price: 1150000, priceDisplay: 'hidden',
    area: 180, rooms: 3, bathrooms: 2, ageYears: 0, facade: 'شمالية', floor: 2,
    features: ['مصعد', 'موقف خاص', 'مكيفات راكبة', 'مطبخ راكب'],
    description: 'شقة جديدة في عمارة حديثة، إطلالة مفتوحة وتشطيب ممتاز.',
    adLicense: null, status: 'available', createdAt: daysAgo(2), images: [],
  },
  {
    id: 103, type: 'villa', city: 'الرياض', district: 'العارض', direction: 'north',
    price: 1150000, priceDisplay: 'show',
    area: 300, rooms: 4, bathrooms: 3, ageYears: 3, facade: 'شرقية', streetWidth: 15,
    features: ['مجلس رجال', 'حوش', 'مطبخ راكب'],
    description: 'فيلا دورين وملحق، حالتها ممتازة.',
    adLicense: null, status: 'sold', createdAt: daysAgo(20),
    images: ['/samples/villa-exterior-2.svg', '/samples/living-room.svg'],
  },
  {
    id: 104, type: 'land', city: 'الرياض', district: 'الياسمين', direction: 'north',
    price: 1800000, priceDisplay: 'show',
    area: 600, facade: 'جنوبية', streetWidth: 25,
    features: ['على شارعين', 'سكني'],
    description: 'أرض سكنية في موقع مميز، قريبة من الطرق الرئيسية.',
    adLicense: null, status: 'available', createdAt: daysAgo(3), images: [],
  },
  {
    id: 105, type: 'apartment', city: 'جدة', district: 'الشاطئ', direction: 'west',
    price: 950000, priceDisplay: 'negotiable',
    area: 150, rooms: 3, bathrooms: 2, ageYears: 2, facade: 'غربية', floor: 4,
    features: ['مصعد', 'موقف خاص', 'مكيفات راكبة'],
    description: 'شقة قريبة من الكورنيش، إضاءة طبيعية ممتازة.',
    adLicense: null, status: 'available', createdAt: daysAgo(4),
    images: ['/samples/apartment-building.svg', '/samples/living-room.svg'],
  },
  {
    id: 106, type: 'villa', city: 'مكة المكرمة', district: 'العوالي', direction: 'south',
    price: 3100000, priceDisplay: 'hidden',
    area: 420, rooms: 6, bathrooms: 5, ageYears: 5, facade: 'شمالية', streetWidth: 18,
    features: ['مجلس رجال', 'غرفة خادمة', 'غرفة سائق', 'حوش', 'مسبح'],
    description: 'فيلا واسعة مع مسبح وحديقة، مناسبة للعوائل الكبيرة.',
    adLicense: null, status: 'available', createdAt: daysAgo(10), images: [],
  },
  {
    id: 107, type: 'apartment', city: 'الرياض', district: 'الملز', direction: 'center',
    price: 620000, priceDisplay: 'show',
    area: 140, rooms: 3, bathrooms: 2, ageYears: 8, facade: 'جنوبية', floor: 1,
    features: ['موقف خاص', 'مطبخ راكب'],
    description: 'شقة في حي هادئ وسط الرياض، قريبة من كل الخدمات.',
    adLicense: null, status: 'available', createdAt: daysAgo(14), images: [],
  },
  {
    id: 108, type: 'land', city: 'جدة', district: 'أبحر الشمالية', direction: 'north',
    price: 3200000, priceDisplay: 'negotiable',
    area: 900, facade: 'شمالية', streetWidth: 30,
    features: ['قريبة من البحر', 'سكني'],
    description: 'أرض كبيرة بالقرب من البحر، مناسبة لبناء فيلا أو استراحة.',
    adLicense: null, status: 'available', createdAt: daysAgo(17),
    images: ['/samples/land.svg'],
  },
  {
    id: 109, type: 'villa', city: 'الرياض', district: 'النسيم الشرقي', direction: 'east',
    price: 1350000, priceDisplay: 'show',
    area: 312, rooms: 5, bathrooms: 4, ageYears: 10, facade: 'غربية', streetWidth: 15,
    features: ['مجلس رجال', 'حوش'],
    description: 'فيلا بحالة جيدة، مناسبة للسكن أو الاستثمار.',
    adLicense: null, status: 'available', createdAt: daysAgo(21), images: [],
  },
  {
    id: 110, type: 'villa', city: 'جدة', district: 'السامر', direction: 'east',
    price: 2100000, priceDisplay: 'negotiable',
    area: 400, rooms: 6, bathrooms: 5, ageYears: 1, facade: 'شرقية', streetWidth: 20,
    features: ['مجلس رجال', 'غرفة خادمة', 'مصعد', 'مكيفات راكبة'],
    description: 'فيلا حديثة بتصميم عصري ومساحات واسعة.',
    adLicense: null, status: 'available', createdAt: daysAgo(5),
    images: ['/samples/villa-exterior-2.svg', '/samples/kitchen.svg'],
  },
  {
    id: 111, type: 'land', city: 'مكة المكرمة', district: 'الشرائع', direction: 'east',
    price: 900000, priceDisplay: 'hidden',
    area: 500, facade: 'شرقية', streetWidth: 20,
    features: ['سكني'],
    description: 'أرض سكنية في مخطط معتمد.',
    adLicense: null, status: 'available', createdAt: daysAgo(25), images: [],
  },
  {
    id: 112, type: 'apartment', city: 'مكة المكرمة', district: 'العزيزية', direction: 'east',
    price: 780000, priceDisplay: 'show',
    area: 160, rooms: 4, bathrooms: 3, ageYears: 4, facade: 'شمالية', floor: 3,
    features: ['مصعد', 'مكيفات راكبة', 'مطبخ راكب'],
    description: 'شقة واسعة قريبة من الطرق الرئيسية.',
    adLicense: null, status: 'available', createdAt: daysAgo(12),
    images: ['/samples/apartment-building.svg', '/samples/kitchen.svg'],
  },
];

// الأحدث أولاً
export const OFFERS = SAMPLE_OFFERS.toSorted(
  (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
);

const OFFERS_BY_ID = new Map(OFFERS.map((o) => [String(o.id), o]));
export const getOffer = (id) => OFFERS_BY_ID.get(String(id)) ?? null;
