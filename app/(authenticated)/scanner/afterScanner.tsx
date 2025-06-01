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
    seatId: string;
    name: string;
    type: SeatType;
    price: number;
}

interface BonusItem {
    itemId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
interface BookingResponse {
    userId: string;
    showtimeId: string;
    seats: Seat[];
    bonusItem: BonusItem[],
    totalPay: number,
    status: BookingStatus,
    method: PaymentMethod;
}

const AfterScanner = () => {

    const { bookingId } = useLocalSearchParams();

    const [bookingData, setBookingData] = useState<BookingResponse>();

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
        fetchData();
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
                <Text style={styles.sectionTitle}>🪑 Danh sách ghế:</Text>
                {bookingData && bookingData.seats.map((seat, index) => (
                    <View key={index} style={styles.itemRow}>
                        <Text>{seat.name} ({seat.type.toUpperCase()})</Text>
                        <Text>{formatCurrency(seat.price)}</Text>
                    </View>
                ))}
            </View>

            {bookingData && bookingData.bonusItem.length > 0 && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🍿 Combo đi kèm:</Text>
                    {bookingData.bonusItem.map((item, index) => (
                        <View key={index} style={styles.bonusItem}>
                            <Image source={{ uri: item.image }} style={styles.itemImage} />
                            <View style={styles.itemInfo}>
                                <Text>{item.name} x{item.quantity}</Text>
                                <Text>{formatCurrency(item.price)}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            )}

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>💰 Tổng thanh toán:</Text>
                <Text style={styles.total}>{formatCurrency(bookingData.totalPay)}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>💳 Phương thức thanh toán:</Text>
                <Text>{bookingData.method}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>📌 Trạng thái:</Text>
                {bookingData && bookingData.status && <Text style={{
                    color: bookingData.status === BookingStatus.CONFIRMED ? 'green' : bookingData.status === BookingStatus.PENDING ? 'orange' : 'red',
                    fontWeight: 'bold'
                }}>
                    {bookingData.status.toUpperCase()}
                </Text>
                }
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
    bonusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 6,
        marginRight: 10,
    },
    itemInfo: {
        flex: 1,
    },
    total: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e53935',
    }
});


export default AfterScanner;