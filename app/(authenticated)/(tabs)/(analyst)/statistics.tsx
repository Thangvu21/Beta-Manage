import { API } from '@/constants/api';
import axiosClient from '@/constants/axiosClient';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    ScrollView as ScrollViewHorizontal
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Statistics = () => {
    const movieSales = [
        { title: 'Avatar 2', price: 320 },
        { title: 'Endgame', price: 280 },
        { title: 'Fast X', price: 220 },
        { title: 'Barbie', price: 150 },
        { title: 'Oppenheimer', price: 180 },
        { title: 'Mario', price: 100 },
        { title: 'Avengers', price: 350 },
        { title: 'Dune 2', price: 270 },
    ];

    const labels = movieSales.map((item) => item.title);
    const dataValues = movieSales.map((item) => item.price);

    const chartData = {
        labels,
        datasets: [{ data: dataValues }],
    };

    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const months = [
        'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
        'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
    ];

    const [selectedYear, setSelectedYear] = useState<string>('2025');
    const [selectedMonth, setSelectedMonth] = useState<string>('Tháng 1');


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
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 90 }}>
                <Text className="text-2xl font-bold mb-4">📊 Báo cáo doanh thu</Text>

                {/* Horizontal Scrollable Chart */}
                <ScrollViewHorizontal horizontal showsHorizontalScrollIndicator={false}>
                    <BarChart
                        data={chartData}
                        width={700} // Each bar ~60px
                        height={280}
                        fromZero

                        yAxisSuffix=" vnd"
                        yAxisLabel=''
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
                        style={{
                            marginVertical: 8,
                            borderRadius: 16,
                        }}
                        verticalLabelRotation={20}
                    />
                </ScrollViewHorizontal>

                {/* Bộ lọc thời gian */}
                <View className="mt-6 space-y-4">
                    <View className="bg-gray-100 p-3 rounded-lg">
                        <Text className="text-base font-medium text-gray-600 mb-1">Chọn năm</Text>
                        <Picker
                            selectedValue={selectedYear}
                            onValueChange={(itemValue) => setSelectedYear(itemValue)}
                            mode="dropdown"
                        >
                            {years.map((year, index) => (
                                <Picker.Item key={index} label={year} value={year} />
                            ))}
                        </Picker>
                    </View>

                    <View className="bg-gray-100 p-3 rounded-lg">
                        <Text className="text-base font-medium text-gray-600 mb-1">Chọn tháng</Text>
                        <Picker
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            mode="dropdown"
                        >
                            {months.map((month, index) => (
                                <Picker.Item key={index} label={month} value={month} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity className="bg-blue-600 p-3 rounded-lg items-center">
                        <Text className="text-white font-semibold text-base">🔍 Tìm theo thời gian</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Statistics;
