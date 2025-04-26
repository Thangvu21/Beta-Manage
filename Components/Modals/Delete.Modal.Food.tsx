import { FoodItem } from "@/constants/food";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface props {
    modalDeleteVisible: boolean,
    setModalDeleteVisible: (visible: boolean) => void
    food: FoodItem | undefined
}

const DeleteModalFood = (props: props) => {

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={props.modalDeleteVisible}
                onRequestClose={() => {
                    props.setModalDeleteVisible(!props.modalDeleteVisible);
                }
                }>
                <View className="bg-white rounded-lg shadow-lg p-4">
                    <View className="flex-row items-center justify-between mb-4">
                        <Text className="text-lg font-bold">Xóa món ăn</Text>
                        <TouchableOpacity onPress={() => { props.setModalDeleteVisible(false) }} className="bg-gray-200 rounded-full p-2">
                            <Text className="text-red-500">X</Text>
                        </TouchableOpacity>
                    </View>
                    <Text className="text-gray-700">Bạn có chắc chắn muốn xóa món ăn {props.food?.name} không?</Text>
                    <View className="flex-row justify-end mt-4">
                        <TouchableOpacity onPress={() => { }} className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2">
                            <Text className="text-white">Xóa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { props.setModalDeleteVisible(false)}} className="bg-gray-300 text-black px-4 py-2 rounded-lg">
                            <Text className="text-black">Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )

}

export default DeleteModalFood;