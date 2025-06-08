import { API } from "@/constants/api";
import axiosClient from "@/constants/axiosClient";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            bonusItems: [
                {
                    id: "1",
                    name: "Bắp rang bơ lớn",
                    price: 50000,
                    quantity: 1,
                    image: "https://example.com/popcorn.jpg"
                },
                {
                    id: "2",
                    name: "Nước ngọt lớn",
                    price: 30000,
                    quantity: 2,
                    image: "https://example.com/drink.jpg"
                }
            ],
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
        qrcode: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATRSURBVO3BQY4jRxAEwfAC//9l1xxTlwIanVyNFmGGP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtA/iQ1TwB5Qs0EZFJzA2RSMwGZ1NwA+ZPUvHFSteikatFJ1aJPlqnZBGSTmgnIBGRSMwG5UTMBmdRMQCY1N2o2Adl0UrXopGrRSdWiT74MyBNqngAyqZnUPKHmm4BMat4A8oSabzqpWnRSteikatEnfxkgN2pugExqngByo2YCMqn5PzupWnRSteikatEnfzk1T6iZgExq3gAyqfmbnFQtOqladFK16JMvU/ObqZmATGomIJOaCciNmk1qfpOTqkUnVYtOqhZ9sgzIf0nNBGRSMwGZ1ExAJjUTkEnNBOQGyKTmBshvdlK16KRq0UnVok9eUvObAJnUTEAmNTdqNgF5Qs3/yUnVopOqRSdVi/BHXgAyqZmAbFJzA2STmgnIpGYCcqPmCSCb1HzTSdWik6pFJ1WLPvll1LyhZgLyhJobNROQSc0NkBs1N2omIE8AuVHzxknVopOqRSdVi/BHXgByo2YCcqNmAnKj5gkgk5oJyKRmAvKEmhsgT6i5AXKj5ptOqhadVC06qVr0yUtqJiATkDfU3AB5A8ik5gk1TwCZ1ExAngByo2YCcqPmjZOqRSdVi06qFn3yEpBvAnKjZgIyqXkCyBNAnlDzhJobNTdAbtRsOqladFK16KRqEf7IIiCTmgnIE2omIJOaCcgTaiYgN2reAPKGmgnIJjVvnFQtOqladFK16JOXgHwTkCfUTEAmNROQSc0EZAIyqXlCzQ2QSc0mNd90UrXopGrRSdWiT15ScwPkDTUTkBsgk5oJyCYgk5pNQN5QMwG5UfPGSdWik6pFJ1WLPnkJyI2aN4DcAHlDzY2aCcgNkEnNDZAbNW8AuVGz6aRq0UnVopOqRZ98GZA31ExAbtRMQJ4AMqmZ1DwB5EbNDZAn1DwBZFLzxknVopOqRSdVi/BHXgAyqbkBcqNmAjKpmYA8oeYGyBNqJiCTmk1ANqnZdFK16KRq0UnVIvyRF4BMap4AcqPmDSA3aiYgk5oJyI2aCcgmNTdAJjU3QCY1b5xULTqpWnRSteiTPwzIE0AmNTdAbtRMQCY1E5AbNROQGzUTkCeA3KiZgPxJJ1WLTqoWnVQt+uQlNU+o2QTkm9TcALlR84SaJ4A8oWYCsumkatFJ1aKTqkWfvATkT1IzqbkBcqPmCSCTmhsgbwCZ1NwAmdTcqNl0UrXopGrRSdWiT5ap2QTkBsiNmgnIjZoJyBtqJiBPqNkEZFKz6aRq0UnVopOqRZ98GZAn1LyhZgLyhpobIDdqJjUTkAnIG2omIDdAJjVvnFQtOqladFK16JP6FyA3aiY1N0DeUHMDZALyXzqpWnRSteikatEnfxkgN2omIJOaGyCTmifUPAHkCTUTkBs1m06qFp1ULTqpWvTJl6n5JjW/mZoJyCY1E5BJzQTkm06qFp1ULTqpWoQ/8gKQP0nNBGRS8waQb1JzA2RSMwG5UTMBmdR800nVopOqRSdVi/BHqpacVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi/4BdmY6Mn5p264AAAAASUVORK5CYII="
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axiosClient.get(`${API.scanBooking}=${bookingId}`)
                console.log("Response from AfterScanner:", response.data);
                
                if (!response.data || !response.data.booking) {
                    setError("Không tìm thấy thông tin vé này");
                    return;
                }
                
                setBookingData(response.data);
            } catch (error: any) {
                console.error("Error in AfterScanner:", error);
                if (error.response?.status === 404) {
                    setError("Mã vé không tồn tại hoặc đã hết hạn");
                } else if (error.response?.status === 400) {
                    setError("Mã vé không hợp lệ");
                } else {
                    setError("Có lỗi xảy ra khi tải thông tin vé. Vui lòng thử lại");
                }
            } finally {
                setLoading(false);
            }
        }
    
        if (bookingId) {
            fetchData();
            console.log("Fetching booking data for ID:", bookingData);
            // setBookingData(sampleBookingData); 
            setLoading(false)// For testing, remove this line when using real API
        } else {
            setError("Mã vé không hợp lệ");
            setLoading(false);
        }
        
        // For testing - comment out the line below when using real API
        // setBookingData(sampleBookingData);
        // setLoading(false);
    }, [bookingId]);

    const formatCurrency = (amount: number) =>
        amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });

    const formatDateTime = (dateTime: string) => {
        const date = new Date(dateTime);
        const timeString = date.toLocaleTimeString('vi-VN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        const dateString = date.toLocaleDateString('vi-VN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return { timeString, dateString };
    };

    const getSeatTypeColor = (type: SeatType) => {
        switch (type) {
            case SeatType.VIP:
                return '#FFD700';
            case SeatType.COUPLE:
                return '#FF69B4';
            default:
                return '#4CAF50';
        }
    };

    const getStatusColor = (status: BookingStatus) => {
        switch (status) {
            case BookingStatus.CONFIRMED:
                return '#4CAF50';
            case BookingStatus.PENDING:
                return '#FF9800';
            case BookingStatus.CANCELLED:
                return '#F44336';
            default:
                return '#757575';
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.loadingCard}>
                    <Text style={styles.loadingIcon}>⏳</Text>
                    <Text style={styles.loadingTitle}>Đang tải thông tin vé...</Text>
                    <Text style={styles.loadingSubtitle}>Vui lòng đợi trong giây lát</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.errorCard}>
                    <Text style={styles.errorIcon}>❌</Text>
                    <Text style={styles.errorTitle}>Không thể tải thông tin vé</Text>
                    <Text style={styles.errorMessage}>{error}</Text>
                    <View style={styles.errorActions}>
                        <Text style={styles.errorSuggestion}>Vui lòng:</Text>
                        <Text style={styles.errorStep}>• Kiểm tra lại mã QR</Text>
                        <Text style={styles.errorStep}>• Đảm bảo kết nối internet ổn định</Text>
                        <Text style={styles.errorStep}>• Liên hệ nhân viên rạp nếu vấn đề vẫn tiếp tục</Text>
                    </View>
                </View>
            </View>
        );
    }

    if (!bookingData) {
        return (
            <View style={styles.centerContainer}>
                <View style={styles.emptyCard}>
                    <Text style={styles.emptyIcon}>📝</Text>
                    <Text style={styles.emptyTitle}>Không có dữ liệu</Text>
                    <Text style={styles.emptyMessage}>Không tìm thấy thông tin vé</Text>
                </View>
            </View>
        );
    }

    const { timeString, dateString } = formatDateTime(bookingData.showtime.time);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={true}>
            {/* Header Success */}
            <View style={styles.headerContainer}>
                <View style={styles.successIcon}>
                    <Text style={styles.successEmoji}>✅</Text>
                </View>
                <Text style={styles.successTitle}>Quét mã thành công!</Text>
                <Text style={styles.successSubtitle}>Vé đã được xác thực</Text>
                <View style={styles.bookingIdContainer}>
                    <Text style={styles.bookingIdLabel}>Mã đặt vé</Text>
                    <Text style={styles.bookingIdValue}>{bookingId}</Text>
                </View>
            </View>

            {/* Movie Info Card */}
            <View style={styles.movieCard}>
                <View style={styles.movieHeader}>
                    <Image source={{ uri: bookingData.film.poster }} style={styles.moviePoster} />
                    <View style={styles.movieInfo}>
                        <Text style={styles.movieTitle}>{bookingData.film.title}</Text>
                        <View style={styles.movieDetails}>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🎬</Text>
                                <Text style={styles.detailText}>{bookingData.showtime.type}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>🕐</Text>
                                <Text style={styles.detailText}>{timeString}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailIcon}>📅</Text>
                                <Text style={styles.detailText}>{dateString}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                
                <View style={styles.cinemaInfo}>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailIcon}>🏢</Text>
                        <Text style={styles.cinemaName}>{bookingData.cinema.name}</Text>
                    </View>
                    <View style={styles.detailRow}>
                        <Text style={styles.detailIcon}>📍</Text>
                        <Text style={styles.cinemaAddress}>{bookingData.cinema.address}</Text>
                    </View>
                </View>
            </View>

            {/* Customer Info */}
            <View style={styles.customerCard}>
                <Text style={styles.sectionTitle}>👤 Thông tin khách hàng</Text>
                <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{bookingData.booking.user}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bookingData.booking.status) }]}>
                        <Text style={styles.statusText}>
                            {bookingData.booking.status.toUpperCase()}
                        </Text>
                    </View>
                </View>
            </View>

            {/* Seats Info */}
            <View style={styles.seatsCard}>
                <Text style={styles.sectionTitle}>🪑 Thông tin ghế</Text>
                {bookingData.booking.seats.map((seat, index) => (
                    <View key={index} style={styles.seatItem}>
                        <View style={styles.seatInfo}>
                            <View style={[styles.seatBadge, { backgroundColor: getSeatTypeColor(seat.type) }]}>
                                <Text style={styles.seatName}>{seat.name}</Text>
                            </View>
                            <Text style={styles.seatType}>
                                {seat.type.charAt(0).toUpperCase() + seat.type.slice(1)}
                            </Text>
                        </View>
                        <Text style={styles.seatPrice}>{formatCurrency(seat.price)}</Text>
                    </View>
                ))}
            </View>

            {/* Bonus Items */}
            {bookingData.booking.bonusItems.length > 0 && (
                <View style={styles.bonusCard}>
                    <Text style={styles.sectionTitle}>🍿 Combo đi kèm</Text>
                    {bookingData.booking.bonusItems.map((item, index) => (
                        <View key={index} style={styles.bonusItem}>
                            <Image source={{ uri: item.image }} style={styles.bonusImage} />
                            <View style={styles.bonusInfo}>
                                <Text style={styles.bonusName}>{item.name}</Text>
                                <Text style={styles.bonusQuantity}>Số lượng: {item.quantity}</Text>
                            </View>
                            <Text style={styles.bonusPrice}>{formatCurrency(item.price)}</Text>
                        </View>
                    ))}
                </View>
            )}

            {/* Total Payment */}
            <View style={styles.totalCard}>
                <Text style={styles.sectionTitle}>💰 Tổng thanh toán</Text>
                <Text style={styles.totalAmount}>{formatCurrency(bookingData.booking.totalPay)}</Text>
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f7fa',
        paddingBottom: 220,
        paddingBlockEnd: 100
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f7fa',
        padding: 20,
        paddingBottom: 80
    },
    loadingCard: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        minWidth: width * 0.8,
    },
    loadingIcon: {
        fontSize: 50,
        marginBottom: 20,
    },
    loadingTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        textAlign: 'center',
    },
    loadingSubtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    errorCard: {
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        minWidth: width * 0.85,
        borderLeftWidth: 4,
        borderLeftColor: '#f44336',
    },
    errorIcon: {
        fontSize: 50,
        marginBottom: 20,
    },
    errorTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f44336',
        marginBottom: 12,
        textAlign: 'center',
    },
    errorMessage: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },
    errorActions: {
        width: '100%',
        backgroundColor: '#fff8f8',
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ffebee',
    },
    errorSuggestion: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 10,
    },
    errorStep: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        lineHeight: 20,
    },
    emptyCard: {
        backgroundColor: '#fff',
        padding: 40,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        minWidth: width * 0.8,
        borderLeftWidth: 4,
        borderLeftColor: '#ff9800',
    },
    emptyIcon: {
        fontSize: 50,
        marginBottom: 20,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ff9800',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyMessage: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    headerContainer: {
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingBottom: 30,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 20,
    },
    successIcon: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#e8f5e8',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    successEmoji: {
        fontSize: 40,
    },
    successTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 5,
    },
    successSubtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },
    bookingIdContainer: {
        backgroundColor: '#f0f8ff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#e3f2fd',
    },
    bookingIdLabel: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
    bookingIdValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1976d2',
        textAlign: 'center',
    },
    movieCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    movieHeader: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    moviePoster: {
        width: 80,
        height: 120,
        borderRadius: 12,
        marginRight: 15,
    },
    movieInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        lineHeight: 24,
    },
    movieDetails: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    detailIcon: {
        fontSize: 16,
        marginRight: 8,
        width: 20,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    cinemaInfo: {
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        paddingTop: 15,
        gap: 8,
    },
    cinemaName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        flex: 1,
    },
    cinemaAddress: {
        fontSize: 14,
        color: '#666',
        flex: 1,
        lineHeight: 20,
    },
    customerCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    customerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    customerName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#fff',
    },
    seatsCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    seatItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
    },
    seatInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seatBadge: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    seatName: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    seatType: {
        fontSize: 14,
        color: '#666',
        textTransform: 'capitalize',
    },
    seatPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e91e63',
    },
    bonusCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    bonusItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    bonusImage: {
        width: 50,
        height: 50,
        borderRadius: 8,
        marginRight: 12,
    },
    bonusInfo: {
        flex: 1,
    },
    bonusName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    bonusQuantity: {
        fontSize: 14,
        color: '#666',
    },
    bonusPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#e91e63',
    },
    totalCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 60,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 2,
        borderColor: '#e91e63',
        
    },
    totalAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#e91e63',
        textAlign: 'center',
    },
    qrCard: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginBottom: 32,
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    qrContainer: {
        alignItems: 'center',
    },
    qrCode: {
        width: 200,
        height: 200,
        borderRadius: 12,
        marginBottom: 15,
    },
    qrNote: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default AfterScanner;