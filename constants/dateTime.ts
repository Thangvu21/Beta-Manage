import { v4 as uuidv4 } from 'uuid';
export interface DateTime {
    date: Date;
    cinemaId: string;
    filmId: string;
}

export interface ShowTimes {
    [cinemaName: string]: ShowTime[];
}

export interface ShowTime {
    id: string;
    hour: number;
    minute: number;
    time: string;
}

// 1 ngày
export const sampleShowTimes: ShowTimes[] = [
    {
        "Beta Cinemas Xuân Thủy": [
            { id: "1", hour: 9, minute: 0, time: "2025-05-17T09:00:00.000Z" },
            { id: "2", hour: 11, minute: 30, time: "2025-05-17T11:30:00.000Z" },
            { id: "3", hour: 14, minute: 0, time: "2025-05-17T14:00:00.000Z" },
            { id: "4", hour: 16, minute: 30, time: "2025-05-17T16:30:00.000Z" },
            { id: "5", hour: 19, minute: 0, time: "2025-05-17T19:00:00.000Z" }

        ]
    },
    {
        "Beta Cinemas Tây Sơn": [
            { id: "4", hour: 10, minute: 15, time: "2025-05-17T10:15:00.000Z" },
            { id: "5", hour: 13, minute: 0, time: "2025-05-17T13:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Vĩnh Yên": [
            { id: "6", hour: 12, minute: 0, time: "2025-05-17T12:00:00.000Z" },
            { id: "7", hour: 15, minute: 30, time: "2025-05-17T15:30:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Ung Văn Khiêm": [
            { id: "8", hour: 16, minute: 0, time: "2025-05-17T16:00:00.000Z" },
            { id: "9", hour: 18, minute: 45, time: "2025-05-17T18:45:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Lào Cai": [
            { id: "10", hour: 9, minute: 30, time: "2025-05-17T09:30:00.000Z" },
            { id: "11", hour: 11, minute: 0, time: "2025-05-17T11:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Trần Quang Khải": [
            { id: "12", hour: 10, minute: 45, time: "2025-05-17T10:45:00.000Z" },
            { id: "13", hour: 13, minute: 15, time: "2025-05-17T13:15:00.000Z" }
        ]
    },
    {
        "Beta Cinemas TRMall Phú Quốc": [
            { id: "14", hour: 14, minute: 30, time: "2025-05-17T14:30:00.000Z" },
            { id: "15", hour: 17, minute: 0, time: "2025-05-17T17:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Empire Bình Dương": [
            { id: "16", hour: 15, minute: 45, time: "2025-05-17T15:45:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Quang Trung": [
            { id: "17", hour: 16, minute: 15, time: "2025-05-17T16:15:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Giải Phóng": [
            { id: "18", hour: 18, minute: 0, time: "2025-05-17T18:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Thanh Xuân": [
            { id: "19", hour: 19, minute: 30, time: "2025-05-17T19:30:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Mỹ Đình": [
            { id: "20", hour: 20, minute: 45, time: "2025-05-17T20:45:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Đan Phượng": [
            { id: "21", hour: 21, minute: 15, time: "2025-05-17T21:15:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Thái Nguyên": [
            { id: "22", hour: 22, minute: 0, time: "2025-05-17T22:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Thanh Hóa": [
            { id: "23", hour: 23, minute: 0, time: "2025-05-17T23:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Bắc Giang": [
            { id: "24", hour: 8, minute: 0, time: "2025-05-17T08:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Nha Trang": [
            { id: "25", hour: 9, minute: 15, time: "2025-05-17T09:15:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Biên Hòa": [
            { id: "26", hour: 11, minute: 45, time: "2025-05-17T11:45:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Long Khánh": [
            { id: "27", hour: 13, minute: 0, time: "2025-05-17T13:00:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Hồ Tràm": [
            { id: "28", hour: 15, minute: 30, time: "2025-05-17T15:30:00.000Z" }
        ]
    },
    {
        "Beta Cinemas Tân Uyên": [
            { id: "29", hour: 17, minute: 45, time: "2025-05-17T17:45:00.000Z" }
        ]
    }
];

// 
export const sampleShowDate = [
    { date: new Date('2025-05-17') },
    { date: new Date('2025-05-18') },
    { date: new Date('2025-05-19') },
    { date: new Date('2025-05-20') },
    { date: new Date('2025-05-21') }
]


