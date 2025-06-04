import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

enum SeatType {
    REGULAR = "regular",
    VIP = "vip",
    COUPLE = "couple",
}

enum BookingStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
}

enum PaymentMethod {
    COD = "COD",
    BANK = "BANK",
    MOMO = "MOMO",
}
interface Seat {
    id: string;
    name: string;
    type: SeatType;
    price: number;
}

interface BonusItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface BookingResponse {
    booking: {
        user: string;
        seats: Seat[];
        bonusItems: BonusItem[];
        totalPay: number;
        status: BookingStatus;
    };
    film: {
        title: string;
        poster: string;
    };
    showtime: {
        time: string;
        type: string;
    };
    cinema: {
        name: string;
        address: string;
    };
    qrcode: string;
}


const AfterScanner = () => {

    const { bookingId } = useLocalSearchParams();

    const [bookingData, setBookingData] = useState<BookingResponse>();

    const sampleBookingData: BookingResponse = {
        booking: {
            user: "Pham Quan",
            seats: [
                {
                    id: "683f0bded94e9b3f054d7f8c",
                    name: "A1",
                    type: SeatType.REGULAR,
                    price: 70000,
                }
            ],
            bonusItems: [],
            totalPay: 70000,
            status: BookingStatus.CONFIRMED
        },
        film: {
            title: "Địa Đạo: Mặt Trời Trong Bóng Tối",
            poster: "https://files.betacorp.vn/media%2fimages%2f2025%2f03%2f31%2f400x633%2D24%2D165808%2D310325%2D29.jpg"
        },
        showtime: {
            time: "2025-06-03T23:30:00.000Z",
            type: "2D"
        },
        cinema: {
            name: "Beta Cinemas Xuân Thủy",
            address: "Tầng 4, toà Aeon Xuân Thuỷ, 124 Đ. Xuân Thủy, phường Dịch Vọng Hậu, quận Cầu Giấy, Hà Nội"
        },
        qrcode: "https://example.com/qrcode.png"
    };



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(`${API.scanBooking}/${bookingId}`)
                console.log("Response from AfterScanner:", response.data);
                setBookingData(response.data);
            } catch (error) {
                console.error("Error in AfterScanner:", error);
            }
        }
        // fetchData();
        setBookingData(sampleBookingData); // Use sample data for testing
    }, []);

    const formatCurrency = (amount: number) =>
        amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    if (!bookingData) {
        return (
            <View style={styles.center}>
                <Text>Đang tải dữ liệu vé...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.successText}>🎉 Quét mã thành công!</Text>
            <Text style={styles.bookingId}>Mã đặt vé: {bookingId}</Text>

            <View style={styles.section}>
                <Image source={{ uri: bookingData.film.poster }} style={styles.poster} />
                <Text style={styles.title}>{bookingData.film.title}</Text>
                <Text>{bookingData.showtime.type} - {new Date(bookingData.showtime.time).toLocaleString('vi-VN')}</Text>
                <Text>{bookingData.cinema.name}</Text>
                <Text>{bookingData.cinema.address}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>🪑 Danh sách ghế:</Text>
                {bookingData.booking.seats.map((seat, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text>{seat.name} ({seat.type.toUpperCase()})</Text>
                        <Text>{formatCurrency(seat.price)}</Text>
                    </View>
                ))}
            </View>

            {bookingData.booking.bonusItems.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🍿 Combo đi kèm:</Text>
                    {bookingData.booking.bonusItems.map((item, index) => (
                        <View key={index} style={styles.bonusItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View>
                                <Text>{item.name}</Text>
                                <Text>Số lượng: {item.quantity}</Text>
                                <Text>Giá: {formatCurrency(item.price)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>💳 Tổng thanh toán:</Text>
                <Text>{formatCurrency(bookingData.booking.totalPay)}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📱 Mã QR:</Text>
                <Image source={{ uri: bookingData.qrcode }} style={{ width: 200, height: 200 }} />
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f8f8f8',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    successText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2e7d32',
        textAlign: 'center',
        marginBottom: 12,
    },
    bookingId: {
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 16,
        color: '#555',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    sectionTitle: {
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 10,
    },
    itemRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    itemInfo: {
        flex: 1,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53935',
    },
    poster: {
        width: 120,
        height: 180,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    bonusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    itemImage: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 6,
    },
});


export default AfterScanner;