import { data2024, data2025 } from '@/constants/analyst';
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
import Svg, { Rect, Text as SvgText, Line, G } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;

export interface MovieRevenue {
    filmName: string;
    price: number;
    seats: number;
    bookings: number;
}

interface GroupedBarChartProps {
    data: MovieRevenue[];
    width: number;
    height: number;
}

const GroupedBarChart: React.FC<GroupedBarChartProps> = ({ data, width, height }) => {
    const padding = 50;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    
    // Tính toán giá trị max để scale
    const maxPrice = Math.max(...data.map(d => d.price));
    const maxSeats = Math.max(...data.map(d => d.seats));
    const maxBookings = Math.max(...data.map(d => d.bookings));
    const maxValue = Math.max(maxPrice, maxSeats, maxBookings);
    
    const barGroupWidth = chartWidth / data.length;
    const barWidth = Math.max((barGroupWidth - 30) / 3, 15); // 3 bars per group, minimum 15px width
    const colors = ['#22c55e', '#3b82f6', '#ea580c']; // Green, Blue, Orange
    const labels = ['Doanh thu đơn vị triệu đồng', 'Số ghế', 'Lượt đặt'];
    
    // Tạo grid lines
    const gridLines = [];
    for (let i = 0; i <= 5; i++) {
        const ratio = i / 5;
        const y = padding + chartHeight * ratio;
        gridLines.push(
            <Line
                key={`grid-${i}`}
                x1={padding}
                y1={y}
                x2={padding + chartWidth}
                y2={y}
                stroke="#e5e7eb"
                strokeWidth="1"
                opacity={0.5}
            />
        );
    }
    
    // Tạo Y-axis labels
    const yAxisLabels = [];
    for (let i = 0; i <= 5; i++) {
        const ratio = i / 5;
        const value = Math.round(maxValue * ratio);
        const y = padding + chartHeight * (1 - ratio);
        yAxisLabels.push(
            <SvgText
                key={`y-label-${i}`}
                x={padding - 10}
                y={y + 5}
                fontSize="12"
                fill="#666"
                textAnchor="end"
            >
                {value}
            </SvgText>
        );
    }
    
    return (
        <View>
            <Svg width={width} height={height}>
                {/* Background */}
                <Rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="#ffffff"
                />
                
                {/* Grid lines */}
                {gridLines}
                
                {/* Y-axis */}
                <Line
                    x1={padding}
                    y1={padding}
                    x2={padding}
                    y2={padding + chartHeight}
                    stroke="#374151"
                    strokeWidth="2"
                />
                
                {/* X-axis */}
                <Line
                    x1={padding}
                    y1={padding + chartHeight}
                    x2={padding + chartWidth}
                    y2={padding + chartHeight}
                    stroke="#374151"
                    strokeWidth="3"
                />
                
                {/* Y-axis labels */}
                {yAxisLabels}
                
                {/* Bars */}
                {data.map((item, groupIndex) => {
                    const groupX = padding + groupIndex * barGroupWidth;
                    const groupCenterX = groupX + barGroupWidth / 2;
                    const startX = groupCenterX - (3 * barWidth) / 2;
                    
                    const values = [item.price, item.seats, item.bookings];
                    
                    return (
                        <G key={`group-${groupIndex}`}>
                            {values.map((value, barIndex) => {
                                const barHeight = maxValue > 0 ? (value / maxValue) * chartHeight : 0;
                                const barX = startX + barIndex * barWidth + barIndex * 4; // 4px spacing between bars
                                const barY = padding + chartHeight - barHeight;
                                
                                return (
                                    <G key={`bar-${groupIndex}-${barIndex}`}>
                                        <Rect
                                            x={barX}
                                            y={barY}
                                            width={barWidth}
                                            height={Math.max(barHeight, 1)}
                                            fill={colors[barIndex]}
                                            rx={3}
                                            ry={3}
                                        />
                                        {/* Value labels on top of bars */}
                                        {barHeight > 20 && (
                                            <SvgText
                                                x={barX + barWidth / 2}
                                                y={barY - 5}
                                                fontSize="10"
                                                fill="#333"
                                                textAnchor="middle"
                                                fontWeight="bold"
                                            >
                                                {value}
                                            </SvgText>
                                        )}
                                    </G>
                                );
                            })}
                            
                            {/* X-axis label (film name) */}
                            <SvgText
                                x={groupCenterX}
                                y={height - 15}
                                fontSize="11"
                                fill="#333"
                                textAnchor="middle"
                                fontWeight="600"
                                transform={`rotate(-10, ${groupCenterX}, ${height - 15})`}
                            >
                                {item.filmName}
                            </SvgText>
                        </G>
                    );
                })}
                
                {/* Chart title */}
                <SvgText
                    x={width / 2}
                    y={25}
                    fontSize="16"
                    fill="#1f2937"
                    textAnchor="middle"
                    fontWeight="bold"
                >
                    Biểu đồ thống kê doanh thu phim
                </SvgText>
            </Svg>
            
            {/* Legend */}
            <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'center', 
                marginTop: 15,
                paddingHorizontal: 20
            }}>
                {labels.map((label, index) => (
                    <View 
                        key={index} 
                        style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            marginHorizontal: 15,
                            backgroundColor: '#f9fafb',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 15,
                            borderWidth: 1,
                            borderColor: '#e5e7eb'
                        }}
                    >
                        <View 
                            style={{ 
                                width: 14, 
                                height: 14, 
                                backgroundColor: colors[index], 
                                marginRight: 6,
                                borderRadius: 3
                            }} 
                        />
                        <Text style={{ 
                            fontSize: 12, 
                            color: '#374151',
                            fontWeight: '600'
                        }}>
                            {label}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
};

const Statistics = () => {
    const movieSales = [
        { filmName: 'Avatar 2', price: 320, seats: 150, bookings: 50 },
        { filmName: 'Endgame', price: 280, seats: 150, bookings: 50 },
        { filmName: 'Fast X', price: 220, seats: 150, bookings: 50 },
        { filmName: 'Barbie', price: 150, seats: 150, bookings: 50 },
        { filmName: 'Oppenheimer', price: 180, seats: 150, bookings: 50 },
        { filmName: 'Mario', price: 100, seats: 150, bookings: 50 },
        { filmName: 'Avengers', price: 350, seats: 150, bookings: 50 },
        { filmName: 'Dune 2', price: 270, seats: 150, bookings: 50 },
    ];

    

    const years = ['2020', '2021', '2022', '2023', '2024', '2025'];
    const months = [
        '1', '2', '3', '4', '5', '6',
        '7', '8', '9', '10', '11', '12'
    ];

    const [selectedYear, setSelectedYear] = useState<string>('2025');
    const [selectedMonth, setSelectedMonth] = useState<string>('6');
    const [revenueData, setRevenueData] = useState<MovieRevenue[]>([]);

    const fetchData = async (year: string, month: string) => {
        try {
            const response = await axiosClient.get(API.getAnalystRevenue, {
                params: {
                    year: year,
                    month: month
                },
            })
            const data = response.data as MovieRevenue[];
            if (data && data.length > 0) {
                setRevenueData(data);
            } else {
                setRevenueData(movieSales); // Dữ liệu mẫu nếu không có dữ liệu từ server
            }
        } catch (error) {
            console.error('Error fetching revenue data:', error);
            setRevenueData(movieSales); // Fallback to sample data
        }
    }

    const handleFindByTime = async () => {
        console.log(`Tìm kiếm doanh thu cho năm ${selectedYear} và tháng ${selectedMonth}`);
        // await fetchData(selectedYear, selectedMonth);
        if (selectedYear === '2025') {
            setRevenueData(data2025[selectedMonth])
        } else if (selectedYear === '2024') {
            setRevenueData(data2024[selectedMonth])
        } else {
            setRevenueData([]); // Không có dữ liệu cho năm khác
        }
    }

    useEffect(() => {
        // setRevenueData(movieSales);
        if (selectedYear === '2025') {
            setRevenueData(data2025[selectedMonth])
        } else if (selectedYear === '2024') {
            setRevenueData(data2024[selectedMonth])
        } else {
            setRevenueData([])
        }
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 90 }}>
                <Text className="text-2xl font-bold mb-4">📊 Báo cáo doanh thu</Text>

                {/* Horizontal Scrollable Chart */}
                <ScrollViewHorizontal horizontal showsHorizontalScrollIndicator={false}>
                    {revenueData.length === 0 ? (
                        <View style={{ width: 700, height: 320, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#888', fontSize: 16 }}>Dữ liệu chưa có tại thời điểm này</Text>
                        </View>
                    ) : (
                        <GroupedBarChart 
                            data={revenueData} 
                            width={Math.max(700, revenueData.length * 120)} 
                            height={320} 
                        />
                    )}
                </ScrollViewHorizontal>

                {/* Bộ lọc thời gian */}
                <View className="mt-6 space-y-4">
                    <View className="bg-gray-100 p-3 rounded-lg mb-2">
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

                    <View className="bg-gray-100 p-3 rounded-lg mb-2">
                        <Text className="text-base font-medium text-gray-600 mb-1">Chọn tháng</Text>
                        <Picker
                            selectedValue={selectedMonth}
                            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                            mode="dropdown"
                        >
                            {months.map((month, index) => (
                                <Picker.Item key={index} label={`Tháng ${month}`} value={month} />
                            ))}
                        </Picker>
                    </View>

                    <TouchableOpacity className="bg-blue-600 p-3 rounded-lg items-center"
                        onPress={handleFindByTime}>
                        <Text className="text-white font-semibold text-base">🔍 Tìm theo thời gian</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Statistics;