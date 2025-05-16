
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
    userId: string;
    data: any;
}

export const sampleNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Xác nhận đặt vé thành công',
    description: 'Bạn đã đặt vé xem phim tại CGV Vincom Nguyễn Chí Thanh lúc 19:00 hôm nay.',
    type: NotificationType.BOOKING,
    userId: 'user-123',
    data: {
      bookingId: 'booking-001',
      cinema: 'CGV Vincom',
      time: '2025-05-16T19:00:00Z',
    },
  },
  {
    id: 'notif-002',
    title: 'Khuyến mãi đặc biệt cuối tuần!',
    description: 'Mua 1 vé tặng 1 bắp rang tại tất cả rạp Galaxy từ 17-19/5.',
    type: NotificationType.PROMOTION,
    userId: 'user-123',
    data: {
      code: 'WEEKENDPROMO',
      validUntil: '2025-05-19T23:59:59Z',
    },
  },
  {
    id: 'notif-003',
    title: 'Nhắc nhở xem phim',
    description: 'Phim của bạn sẽ bắt đầu trong 1 giờ nữa. Đừng quên mang theo vé!',
    type: NotificationType.REMINDER,
    userId: 'user-123',
    data: {
      movieTitle: 'Avengers: Endgame',
      seat: 'D12',
      time: '2025-05-16T20:00:00Z',
    },
  },
  {
    id: 'notif-004',
    title: 'Cập nhật hệ thống',
    description: 'Chúng tôi sẽ bảo trì hệ thống vào lúc 0:00 - 3:00 ngày 17/5. Mong bạn thông cảm.',
    type: NotificationType.SYSTEM,
    userId: 'user-123',
    data: null,
  },
];