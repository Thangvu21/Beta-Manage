

export enum LocationType {
    Point = 'Point',
}

export interface Location {
    type: LocationType.Point;
    coordinates: number[];
}



export interface Cinema {
    id: string;
    name: string;
    address: string;
    phone: string;
    location: Location;
    avatar: string;
}


export const sampleCinemas: Cinema[] = [
  {
    id: 'cinema-001',
    name: 'Beta Thanh Xuân',
    address: 'Tầng 3, TTTM Hapulico, 1 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội',
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
    address: '30 Bờ Bao Tân Thắng, Tân Phú, TP.HCM',
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
    address: '229 Tây Sơn, Ngã Tư Sở, Đống Đa, Hà Nội',
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
    address: '116 Nguyễn Du, Quận 1, TP.HCM',
    phone: '0911223344',
    location: {
      type: LocationType.Point,
      coordinates: [106.6967, 10.7769],
    },
    avatar: 'https://i.imgur.com/k7NVFbt.jpeg',
  }
];