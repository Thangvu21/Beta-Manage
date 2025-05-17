

export enum LocationType {
  Point = 'Point',
}

export interface Location {
  type: LocationType.Point;
  coordinates: number[];
}

export interface Address {
  street: string;
  ward: string;
  district: string;
  city: string;
  full: string;
}

export interface Cinema {
  id: string;
  name: string;
  address: Address;
  phone: string;
  location: Location;
  avatar: string;
}

export const sampleNameCinemas: string[] = [
  "Beta Cinemas Xuân Thủy",
  "Beta Cinemas Tây Sơn",
  "Beta Cinemas Vĩnh Yên",
  "Beta Cinemas Ung Văn Khiêm",
  "Beta Cinemas Lào Cai",
  "Beta Cinemas Trần Quang Khải",
  "Beta Cinemas TRMall Phú Quốc",
  "Beta Cinemas Empire Bình Dương",
  "Beta Cinemas Quang Trung",
  "Beta Cinemas Giải Phóng",
  "Beta Cinemas Thanh Xuân",
  "Beta Cinemas Mỹ Đình",
  "Beta Cinemas Đan Phượng",
  "Beta Cinemas Thái Nguyên",
  "Beta Cinemas Thanh Hóa",
  "Beta Cinemas Bắc Giang",
  "Beta Cinemas Nha Trang",
  "Beta Cinemas Biên Hòa",
  "Beta Cinemas Long Khánh",
  "Beta Cinemas Hồ Tràm",
  "Beta Cinemas Tân Uyên"
];

export const sampleCinemas: Cinema[] = [
  {
    id: 'cinema-001',
    name: 'Beta Thanh Xuân',
    address: {
      street: '123 Trường Chinh',
      ward: 'Phương Liệt',
      district: 'Thanh Xuân',
      city: 'Hà Nội',
      full: '123 Trường Chinh, Phương Liệt, Thanh Xuân, Hà Nội',
    },
    phone: '0987654321',
    location: {
      type: LocationType.Point,
      coordinates: [105.807, 21.002],
    },
    avatar: 'https://i.imgur.com/2nCt3Sb.jpg',
  },
  {
    id: 'cinema-002',
    name: 'CGV Aeon Mall Tân Phú',
    address: {
      street: '30 Bờ Bao Tân Thắng',
      ward: 'Bình Hưng Hòa',
      district: 'Tân Phú',
      city: 'TP.HCM',
      full: '30 Bờ Bao Tân Thắng, Bình Hưng Hòa, Tân Phú, TP.HCM',
    },
    phone: '0934567890',
    location: {
      type: LocationType.Point,
      coordinates: [106.6276, 10.8002],
    },
    avatar: 'https://i.imgur.com/HN0Z2fS.jpg',
  },
  {
    id: 'cinema-003',
    name: 'Lotte Cinema Đống Đa',
    address: {
      street: '1 Đường Lê Duẩn',
      ward: 'Phường Tràng Tiền',
      district: 'Hoàn Kiếm',
      city: 'Hà Nội',
      full: '1 Đường Lê Duẩn, Phường Tràng Tiền, Hoàn Kiếm, Hà Nội',
    },
    phone: '0968881122',
    location: {
      type: LocationType.Point,
      coordinates: [105.8235, 21.0096],
    },
    avatar: 'https://i.imgur.com/8Km9tLL.jpg',
  },
  {
    id: 'cinema-004',
    name: 'Galaxy Nguyễn Du',
    address: {
      street: '116 Nguyễn Du',
      ward: 'Bến Nghé',
      district: 'Quận 1',
      city: 'TP.HCM',
      full: '116 Nguyễn Du, Bến Nghé, Quận 1, TP.HCM',
    },
    phone: '0911223344',
    location: {
      type: LocationType.Point,
      coordinates: [106.6967, 10.7769],
    },
    avatar: 'https://i.imgur.com/k7NVFbt.jpeg',
  }
];

