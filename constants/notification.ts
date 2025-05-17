
export enum NotificationType {
    BOOKING = 'booking',
    PROMOTION = 'promotion',
    REMINDER = 'reminder',
    SYSTEM = 'system',
}

export interface Notification {
    id: string;
    title: string;
    description: string;
    type: NotificationType;
    data: Object;
}

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Xác nhận đặt vé thành công',
    description: 'Bạn đã đặt vé xem phim tại CGV Vincom Nguyễn Chí Thanh lúc 19:00 hôm nay.',
    type: NotificationType.BOOKING,
    data: {
      cinemaId: 'cinema-001',
      filmId: 'film-001',
      showTime: '2023-05-17T19:00:00Z',
    },
  },
  {
    id: 'notif-002',
    title: 'Khuyến mãi đặc biệt cuối tuần!',
    description: 'Mua 1 vé tặng 1 bắp rang tại tất cả rạp Galaxy từ 17-19/5.',
    type: NotificationType.PROMOTION,
    data: {
      promotionId: 'promo-001',
      cinemaId: 'cinema-002',
      startDate: '2023-05-17',
      endDate: '2023-05-19',
    },
  },
  {
    id: 'notif-003',
    title: 'Nhắc nhở xem phim',
    description: 'Phim của bạn sẽ bắt đầu trong 1 giờ nữa. Đừng quên mang theo vé!',
    type: NotificationType.REMINDER,
    data: {
      cinemaId: 'cinema-001',
      filmId: 'film-001',
      showTime: '2023-05-17T19:00:00Z',
    },
  },
  {
    id: 'notif-004',
    title: 'Cập nhật hệ thống',
    description: 'Chúng tôi sẽ bảo trì hệ thống vào lúc 0:00 - 3:00 ngày 17/5. Mong bạn thông cảm.',
    type: NotificationType.SYSTEM,
    data: {
      maintenanceStart: '2023-05-17T00:00:00Z',
      maintenanceEnd: '2023-05-17T03:00:00Z',
    },
  },
];