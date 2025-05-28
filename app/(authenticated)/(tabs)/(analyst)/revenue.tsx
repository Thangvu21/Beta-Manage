import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width;

const Statistics = () => {
    // Dữ liệu demo (sẽ thay bằng dữ liệu động sau)
    const allData = {
        '2025': {
            'Tháng 1': { revenue: 0, bookings: 0 },
            'Tháng 2': { revenue: 500000, bookings: 20 },
            'Tháng 3': { revenue: 1200000, bookings: 32 },
            'Tháng 4': { revenue: 900000, bookings: 28 },
        },
        '2024': {
            'Tháng 1': { revenue: 1500000, bookings: 45 },
            'Tháng 2': { revenue: 1000000, bookings: 35 },
        }
    };

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

    const monthLabels = Object.keys(dataFromServer.months);
    const monthRevenue = Object.values(dataFromServer.months).map(item => item.revenue);

    const hasRevenueData = monthRevenue.some(val => val > 0);

    const [selectedYear, setSelectedYear] = useState<number>();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosClient.get(API.getAnalystRevenue, {
                    params: {
                        year: selectedYear, // Thay đổi năm nếu cần
                    },
                })
            } catch (error) {
                console.error('Error fetching revenue data:', error);

            }
        }
    }, [selectedYear]);

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                <Text className="text-3xl font-bold text-black mb-4">📊 Báo cáo doanh thu {dataFromServer.year}</Text>

                {/* Tổng quan */}
                <View className="flex-row justify-between gap-3 mb-4">
                    <View className="flex-1 bg-white shadow rounded-xl p-4">
                        <Text className="text-2xl text-gray-500">Tổng doanh thu</Text>
                        <Text className="text-2xl font-bold text-green-600">
                            {dataFromServer.totalRevenue.toLocaleString()} triệu đ
                        </Text>
                    </View>
                    <View className="flex-1 bg-white shadow rounded-xl p-4">
                        <Text className="text-2xl text-gray-500">Tổng đơn hàng</Text>
                        <Text className="text-2xl font-bold text-blue-600">
                            {dataFromServer.totalBookings}
                        </Text>
                    </View>
                </View>

                {/* Bar Chart */}
                <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 20 }}>
                    <Text className="text-3xl font-semibold mb-2">📈 Doanh thu theo tháng</Text>
                    {hasRevenueData ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <BarChart
                                data={{
                                    labels: monthLabels,
                                    datasets: [{ data: monthRevenue }],
                                }}
                                width={screenWidth - 32}
                                height={260}
                                yAxisSuffix="đ"
                                yAxisLabel=""
                                fromZero
                                chartConfig={{
                                    backgroundGradientFrom: '#fff',
                                    backgroundGradientTo: '#fff',
                                    decimalPlaces: 0,
                                    color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
                                    labelColor: () => '#333',
                                    barPercentage: 0.6,
                                    style: {
                                        borderRadius: 16,
                                    },
                                }}
                                verticalLabelRotation={30}
                                style={{ borderRadius: 16, marginBottom: 16 }}
                            />
                        </ScrollView>
                    ) : (
                        <View className="items-center justify-center h-40 bg-white rounded-xl shadow mb-4">
                            <Text className="text-gray-400 text-center text-2xl">
                                📉 Chưa có dữ liệu doanh thu trong các tháng
                            </Text>
                        </View>
                    )}
                </ScrollView>


                <View className="flex-row gap-4 mb-4">
                    {/* <View className="flex-1 bg-white p-2 rounded-lg shadow">
                        <Text className="text-xs text-gray-500 mb-1">Chọn tháng</Text>
                        <Picker
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            dropdownIconColor="#000"
                            mode="dropdown"
                        >
                            {monthOptions.map((month, index) => (
                                <Picker.Item key={index} label={month} value={month} />
                            ))}
                        </Picker>
                    </View> */}

                    <View className="flex-1 bg-white p-2 rounded-lg shadow">
                        <Text className="text-3xl text-gray-500 mb-1">Chọn năm</Text>
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            mode="dropdown"
                        >
                            {Object.keys(allData).map((year, index) => (
                                <Picker.Item key={index} label={year} value={year} />
                            ))}
                        </Picker>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Statistics;
