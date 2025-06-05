import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import Svg, { Rect, Text as SvgText, Line, G, Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

interface dataFromServerType {
    year: number;
    totalRevenue: number;
    totalBookings: number;
    months: {
        [key: string]: {
            revenue: number;
            bookings: number;
        };
    };
}

interface RevenueType {
    revenue: number;
    bookings: number;
}

interface monthRevenueType {
    [key: string]: RevenueType;
}

// Component hiển thị khi không có dữ liệu
const EmptyRevenueChart = () => {
    return (
        <View style={{
            height: 280,
            backgroundColor: '#f8fafc',
            borderRadius: 16,
            borderWidth: 2,
            borderColor: '#e2e8f0',
            borderStyle: 'dashed',
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
            paddingHorizontal: 20
        }}>
            <Svg width={100} height={80} viewBox="0 0 120 80">
                <Defs>
                    <LinearGradient id="emptyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#e2e8f0" stopOpacity="1" />
                        <Stop offset="100%" stopColor="#cbd5e1" stopOpacity="1" />
                    </LinearGradient>
                </Defs>
                
                {/* Chart bars outline */}
                <Rect x="15" y="50" width="12" height="25" fill="url(#emptyGrad)" rx="3" />
                <Rect x="32" y="35" width="12" height="40" fill="url(#emptyGrad)" rx="3" />
                <Rect x="49" y="45" width="12" height="30" fill="url(#emptyGrad)" rx="3" />
                <Rect x="66" y="25" width="12" height="50" fill="url(#emptyGrad)" rx="3" />
                <Rect x="83" y="55" width="12" height="20" fill="url(#emptyGrad)" rx="3" />
                
                {/* Base line */}
                <Line x1="10" y1="75" x2="100" y2="75" stroke="#cbd5e1" strokeWidth="2" />
                
                {/* Trend line */}
                <Line x1="21" y1="62" x2="89" y2="42" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="3,3" />
            </Svg>
            
            <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#475569',
                marginTop: 16,
                marginBottom: 8,
                textAlign: 'center'
            }}>
                Chưa có dữ liệu doanh thu
            </Text>
            
            <Text style={{
                fontSize: 14,
                color: '#64748b',
                textAlign: 'center',
                lineHeight: 20,
                marginBottom: 16
            }}>
                Không có thông tin doanh thu{'\n'}cho năm đã chọn
            </Text>
            
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#fef3c7',
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: '#f59e0b'
            }}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>📊</Text>
                <Text style={{
                    fontSize: 12,
                    color: '#d97706',
                    fontWeight: '500'
                }}>
                    Dữ liệu sẽ cập nhật theo thời gian thực
                </Text>
            </View>
        </View>
    );
};

// Component Card thống kê
const StatCard = ({ title, value, icon, color, subtitle }: {
    title: string;
    value: string | number;
    icon: string;
    color: string;
    subtitle?: string;
}) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4,
            borderLeftWidth: 4,
            borderLeftColor: color
        }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <Text style={{ fontSize: 24, marginRight: 8 }}>{icon}</Text>
                <Text style={{
                    fontSize: 14,
                    color: '#6b7280',
                    fontWeight: '500',
                    flex: 1
                }}>
                    {title}
                </Text>
            </View>
            <Text style={{
                fontSize: 28,
                fontWeight: 'bold',
                color: color,
                marginBottom: 4
            }}>
                {value}
            </Text>
            {subtitle && (
                <Text style={{
                    fontSize: 12,
                    color: '#9ca3af',
                    fontStyle: 'italic'
                }}>
                    {subtitle}
                </Text>
            )}
        </View>
    );
};

const Revenue = () => {
    // Dữ liệu demo (sẽ thay bằng dữ liệu động sau)
    const allYears = ['2020', '2021', '2022', '2023', '2024', '2025'];

    // lấy về từ server
    const dataFromServer = {
        year: 2025,
        totalRevenue: 705,
        totalBookings: 115,
        months: {
            'Tháng 1': { revenue: 135, bookings: 25 },
            'Tháng 2': { revenue: 150, bookings: 15 },
            'Tháng 3': { revenue: 200, bookings: 45 },
            'Tháng 4': { revenue: 120, bookings: 10 },
            'Tháng 5': { revenue: 100, bookings: 20 },
        },
    };

    const [selectedYear, setSelectedYear] = useState<string>("2025");
    const [dataServer, setDataServer] = useState<dataFromServerType>(dataFromServer);
    const [monthRevenueData, setMonthRevenueData] = useState<monthRevenueType>(dataFromServer.months);
    const [loading, setLoading] = useState<boolean>(false);

    // Tính toán dữ liệu cho chart
    const monthLabels = Object.keys(monthRevenueData);
    const monthRevenue = Object.values(monthRevenueData).map(item => item.revenue);
    const hasRevenueData = monthRevenue.some(val => val > 0);

    // Format số tiền
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN').format(amount);
    };

    const fetchData = async (yearSelected: string) => {
        setLoading(true);
        try {
            const response = await axiosClient.get(API.getAnalystFilm, {
                params: {
                    year: yearSelected,
                },
            });

            if (response.data && Object.keys(response.data.months || {}).length > 0) {
                setDataServer(response.data);
                setMonthRevenueData(response.data.months);
            } else {
                // Nếu không có dữ liệu từ server, reset về empty
                setDataServer({
                    year: parseInt(yearSelected),
                    totalRevenue: 0,
                    totalBookings: 0,
                    months: {}
                });
                setMonthRevenueData({});
            }
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            // Fallback to demo data on error
            setDataServer(dataFromServer);
            setMonthRevenueData(dataFromServer.months);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectedYear = (year: string) => {
        setSelectedYear(year);
        fetchData(year);
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f1f5f9' }}>
            <ScrollView 
                contentContainerStyle={{ 
                    padding: 16, 
                    paddingBottom: 100 
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 24,
                    paddingHorizontal: 4
                }}>
                    <Text style={{
                        fontSize: 28,
                        fontWeight: 'bold',
                        color: '#1e293b',
                        flex: 1
                    }}>
                        📊 Báo cáo doanh thu
                    </Text>
                    <View style={{
                        backgroundColor: '#3b82f6',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 12
                    }}>
                        <Text style={{
                            color: 'white',
                            fontWeight: '600',
                            fontSize: 16
                        }}>
                            {dataServer.year || selectedYear}
                        </Text>
                    </View>
                </View>

                {/* Stats Cards */}
                <View style={{ 
                    flexDirection: 'row', 
                    gap: 12, 
                    marginBottom: 24 
                }}>
                    <StatCard
                        title="Tổng doanh thu"
                        value={`${formatCurrency(dataServer.totalRevenue || 0)}`}
                        icon="💰"
                        color="#10b981"
                        subtitle="triệu đồng"
                    />
                    <StatCard
                        title="Tổng đơn hàng"
                        value={dataServer.totalBookings || 0}
                        icon="🎫"
                        color="#3b82f6"
                        subtitle="lượt đặt vé"
                    />
                </View>

                {/* Year Selector */}
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 16,
                    marginBottom: 24,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4
                }}>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#374151',
                        marginBottom: 12
                    }}>
                        📅 Chọn năm xem báo cáo
                    </Text>
                    <View style={{
                        backgroundColor: '#f8fafc',
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: '#e2e8f0'
                    }}>
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) => handleSelectedYear(itemValue.toString())}
                            mode="dropdown"
                            style={{
                                color: '#374151'
                            }}
                        >
                            {allYears.map((year, index) => (
                                <Picker.Item 
                                    key={index} 
                                    label={`Năm ${year}`} 
                                    value={year}
                                    style={{ fontSize: 16 }}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* Revenue Chart */}
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 16,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 4,
                    marginBottom: 20
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 16
                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: '600',
                            color: '#1e293b',
                            flex: 1
                        }}>
                            📈 Doanh thu theo tháng
                        </Text>
                        {loading && (
                            <ActivityIndicator size="small" color="#3b82f6" />
                        )}
                    </View>

                    {loading ? (
                        <View style={{
                            height: 280,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <ActivityIndicator size="large" color="#3b82f6" />
                            <Text style={{
                                marginTop: 12,
                                color: '#6b7280',
                                fontSize: 14
                            }}>
                                Đang tải dữ liệu...
                            </Text>
                        </View>
                    ) : hasRevenueData ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <BarChart
                                data={{
                                    labels: monthLabels,
                                    datasets: [{ 
                                        data: monthRevenue,
                                        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`
                                    }],
                                }}
                                width={Math.max(screenWidth - 64, monthLabels.length * 80)}
                                height={260}
                                yAxisSuffix=" tr"
                                yAxisLabel=""
                                fromZero
                                chartConfig={{
                                    backgroundGradientFrom: '#ffffff',
                                    backgroundGradientTo: '#ffffff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                                    labelColor: () => '#374151',
                                    barPercentage: 0.7,
                                    fillShadowGradient: '#10b981',
                                    fillShadowGradientOpacity: 0.8,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                verticalLabelRotation={20}
                                style={{
                                    borderRadius: 12,
                                    marginVertical: 8,
                                }}
                                showValuesOnTopOfBars={true}
                            />
                        </ScrollView>
                    ) : (
                        <EmptyRevenueChart />
                    )}
                </View>

                {/* Quick Stats */}
                {hasRevenueData && (
                    <View style={{
                        backgroundColor: 'white',
                        borderRadius: 16,
                        padding: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.1,
                        shadowRadius: 8,
                        elevation: 4
                    }}>
                        <Text style={{
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#1e293b',
                            marginBottom: 16
                        }}>
                            📊 Thống kê nhanh
                        </Text>
                        
                        <View style={{ flexDirection: 'row', gap: 12 }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>
                                    Tháng cao nhất
                                </Text>
                                <Text style={{ 
                                    fontSize: 16, 
                                    fontWeight: 'bold', 
                                    color: '#10b981' 
                                }}>
                                    {monthLabels[monthRevenue.indexOf(Math.max(...monthRevenue))]}
                                </Text>
                                <Text style={{ 
                                    fontSize: 14, 
                                    color: '#6b7280' 
                                }}>
                                    {formatCurrency(Math.max(...monthRevenue))} tr
                                </Text>
                            </View>
                            
                            <View style={{ flex: 1 }}>
                                <Text style={{ color: '#6b7280', fontSize: 14, marginBottom: 4 }}>
                                    Trung bình/tháng
                                </Text>
                                <Text style={{ 
                                    fontSize: 16, 
                                    fontWeight: 'bold', 
                                    color: '#3b82f6' 
                                }}>
                                    {formatCurrency(Math.round(monthRevenue.reduce((a, b) => a + b, 0) / monthRevenue.length))} tr
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Revenue;