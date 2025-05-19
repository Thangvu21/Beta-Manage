import React from 'react';
import { View, Text, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const Statistics = () => {

    const revenueData = {
        labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        datasets: [
            {
                data: [500, 700, 800, 650, 1000, 1200],
                strokeWidth: 2,
            },
        ],
    };

    const pieData = [
        { name: 'Đồ uống', population: 5000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 14 },
        { name: 'Đồ ăn vặt', population: 2000, color: '#0F0', legendFontColor: '#7F7F7F', legendFontSize: 14 },
        { name: 'Khác', population: 3000, color: '#00F', legendFontColor: '#7F7F7F', legendFontSize: 14 },
    ];

    const movieSales = [
        { title: 'Avatar 2', ticketsSold: 320 },
        { title: 'Endgame', ticketsSold: 280 },
        { title: 'Fast X', ticketsSold: 220 },
        { title: 'Barbie', ticketsSold: 150 },
        { title: 'Oppenheimer', ticketsSold: 180 },
        { title: 'Mario', ticketsSold: 100 },
    ];

    const labels = movieSales.map(item => item.title);
    const dataValues = movieSales.map(item => item.ticketsSold);

    const chartData = {
        labels,
        datasets: [{ data: dataValues }],
    };

    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43]
            }
        ]
    };

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <ScrollView className="flex-1 bg-white p-4" contentContainerStyle={{ paddingBottom: 90 }} >
                <Text className="text-2xl font-bold mb-4">📊 Báo cáo doanh thu</Text>


                <BarChart
                    
                    width={Dimensions.get('window').width - 32} // padding horizontal
                    height={280}
                    data={data}
                    fromZero
                    
                    yAxisSuffix=" triệu"
                    yAxisLabel="$"
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    
                    verticalLabelRotation={30}
                />

                {/* Line Chart */}
                <LineChart
                    data={revenueData}
                    width={screenWidth - 32}
                    height={220}
                    chartConfig={{
                        backgroundGradientFrom: '#fff',
                        backgroundGradientTo: '#fff',
                        color: () => '#FF5722',
                        labelColor: () => '#333',
                        decimalPlaces: 0,
                    }}
                    bezier
                    style={{ borderRadius: 8, marginBottom: 16 }}
                />

                {/* Summary Box */}
                <View className="flex-row justify-between bg-gray-100 p-4 rounded-lg mb-4">
                    <View>
                        <Text className="text-gray-500">Tổng doanh thu</Text>
                        <Text className="text-xl font-bold text-green-700">15.500.000đ</Text>
                    </View>
                    <View>
                        <Text className="text-gray-500">Tổng đơn hàng</Text>
                        <Text className="text-xl font-bold text-blue-700">320</Text>
                    </View>
                </View>

                {/* Pie Chart */}
                <PieChart
                    data={pieData}
                    width={screenWidth - 32}
                    height={220}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                    chartConfig={{
                        color: () => '#000',
                    }}
                />

                {/* Top Products */}
                <Text className="text-lg font-semibold mt-6 mb-2">🔥 Top sản phẩm</Text>
                <View className="space-y-2">
                    <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-md">
                        <Text>🥤 Trà đào</Text>
                        <Text className="text-green-600 font-semibold">2.500.000đ</Text>
                    </View>
                    <View className="flex-row justify-between items-center bg-gray-100 p-3 rounded-md">
                        <Text>🍟 Khoai tây chiên</Text>
                        <Text className="text-green-600 font-semibold">1.800.000đ</Text>
                    </View>
                </View>

                <BarChart
                    data={chartData}
                    width={Dimensions.get('window').width - 32} // padding horizontal
                    height={280}
                    fromZero
                    yAxisSuffix=" vé"
                    chartConfig={{
                        backgroundColor: '#1cc910',
                        backgroundGradientFrom: '#eff3ff',
                        backgroundGradientTo: '#efefef',
                        decimalPlaces: 0,
                        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: '6',
                            strokeWidth: '2',
                            stroke: '#ffa726',
                        },
                    }}
                    xAxisLabel=''
                    yAxisLabel=''
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default Statistics;
