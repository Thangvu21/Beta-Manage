import { Alert, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, TextInputBase, TextInputComponent, Platform } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";
import ImagePickerScreen from "../Camera/ImagePicker";
import { AgeRating, MovieData, MovieDetailData, Status } from "@/constants/film";
import { imagesUrl } from "@/constants/image";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

interface Props {
    modalCreateVisible: boolean,
    setModalCreateVisible: (visible: boolean) => void,
    listMovie: MovieData[],
    setListMovie: (listMovie: MovieData[]) => void;
}

const ageRatingLabels = {
    [AgeRating.P]: 'P - Phổ biến',
    [AgeRating.C13]: 'C13 - Cấm dưới 13 tuổi',
    [AgeRating.C16]: 'C16 - Cấm dưới 16 tuổi',
    [AgeRating.C18]: 'C18 - Cấm dưới 18 tuổi',
};

// Các label hiển thị tương ứng cho Status
const statusLabels = {
    [Status.ComingSoon]: 'Sắp chiếu',
    [Status.NowShowing]: 'Đang chiếu',
    [Status.Ended]: 'Đã kết thúc',
};


const CreateModalMovie = ({
    modalCreateVisible,
    setModalCreateVisible,
    listMovie,
    setListMovie
}: Props) => {

    // const [image, setImage] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [releaseDate, setReleaseDate] = useState(new Date());
    const [language, setLanguage] = useState<string>('');
    const [director, setDirector] = useState<string>('');
    const [actors, setActors] = useState<string[]>([]);
    const [duration, setDuration] = useState<string>('');
    const [genres, setGenres] = useState<string[]>([]);
    const [posterUrl, setPosterUrl] = useState<string>('');
    const [trailerUrl, setTrailerUrl] = useState<string>('');
    const [status, setStatus] = useState<string>(Status.NowShowing);
    const [ageRating, setAgeRating] = useState<string>(AgeRating.C13);
    const [id, setId] = useState<string>('');

    // UI state
    const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
    const [newActor, setNewActor] = useState<string>('');
    const [newGenre, setNewGenre] = useState<string>('');

    // vấn đề chọn trong form nữa
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setShowDatePicker(Platform.OS === 'ios');
        setReleaseDate(currentDate);
        setShowDatePicker(false);
    };

    const formatDate = (date: Date) => {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    const formatTime = (date: Date) => {
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setReleaseDate(new Date());
        setLanguage('');
        setDuration('');
        setGenres([]);
        setAgeRating(AgeRating.P);
        setDirector('');
        setActors([]);
        setPosterUrl('');
        setTrailerUrl('');
        setStatus(Status.NowShowing);
    };

    const updateListMovie = () => {
        const newMovie: MovieData = {
            id: id,
            title: title,
            ageRating: ageRating,
            posterUrl: posterUrl,
            releaseDate: releaseDate,
        }

        setListMovie([...listMovie, newMovie]);
    }

    //them aysnc await cho fetch API
    const handelCreateMovie = async () => {
        if (!title || !description || !releaseDate || !language || !duration || !genres.length || !ageRating || !director || !actors.length || !trailerUrl) {
            Alert.alert("Please fill all fields");
            return;
        }

        try {
            const response = await axiosClient.post(API.createFilm, {
                title: title,
                description: description,
                releaseDate: new Date(releaseDate).toDateString(),
                language: language,
                duration: Number.parseInt(duration),
                genres: genres,
                ageRating: ageRating,
                director: director,
                actors: actors,
                posterUrl: posterUrl,
                trailerUrl: trailerUrl,
                status: status,
            })

            console.log('Movie created successfully:',response.data);
            setId(response.data.id);
            Alert.alert("Movie created successfully");
        } catch (error) {
            console.error('Error creating movie:', error);
            Alert.alert("Error creating movie");
        }



        // setListMovie
        updateListMovie();
        // setImage('');
        resetForm();

        setModalCreateVisible(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalCreateVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalCreateVisible(false);
            }}>
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>Create Movie</Text>
                        <Pressable onPress={() => {
                            setModalCreateVisible(false)
                            resetForm();
                        }}>
                            <AntDesign name="closecircleo" size={24} color="#555" />
                        </Pressable>
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => setModalCreateVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.body}>
                        {/* Title */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎬 Movie Title</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie title"
                                placeholderTextColor="#888"
                                value={title}
                                onChangeText={setTitle}
                            />
                        </View>

                        {/* Description */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📝 Movie Description</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie description"
                                placeholderTextColor="#888"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🌐 Movie Language</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie language"
                                placeholderTextColor="#888"
                                value={language}
                                onChangeText={setLanguage}
                                multiline
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>⏱️ Movie Duration</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie duration"
                                placeholderTextColor="#888"
                                value={duration}
                                onChangeText={setDuration}
                                multiline
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📢 Movie Director</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie director"
                                placeholderTextColor="#888"
                                value={director}
                                onChangeText={setDirector}
                                multiline
                            />
                        </View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🌟 Movie Actors</Text>
                            <View style={styles.actorInputContainer}>
                                <TextInput
                                    style={styles.actorInput}
                                    placeholder="Enter actor name"
                                    placeholderTextColor="#888"
                                    value={newActor}
                                    onChangeText={setNewActor}
                                />
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        if (newActor) {
                                            setActors([...actors, newActor]);
                                            setNewActor('');
                                        }
                                    }}>
                                    <AntDesign name="plus" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.actorsList}>
                                {actors.map((actor, index) => (
                                    <View key={index} style={styles.actorTag}>
                                        <Text style={styles.actorName}>{actor}</Text>
                                        <TouchableOpacity onPress={() => setActors(actors.filter((_, i) => i !== index))}>
                                            <AntDesign name="close" size={14} color="#e74c3c" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                        {/* Genre */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎭 Movie Genre</Text>
                            <View style={styles.actorInputContainer}>
                                <TextInput
                                    style={styles.actorInput}
                                    placeholder="Enter genre name"
                                    placeholderTextColor="#888"
                                    value={newGenre}
                                    onChangeText={setNewGenre}
                                />
                                <TouchableOpacity
                                    style={styles.addButton}
                                    onPress={() => {
                                        if (newGenre) {
                                            setGenres([...genres, newGenre]);
                                            setNewGenre('');
                                        }
                                    }}>
                                    <AntDesign name="plus" size={18} color="#fff" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.actorsList}>
                                {genres.map((genre, index) => (
                                    <View key={index} style={styles.actorTag}>
                                        <Text style={styles.actorName}>{genre}</Text>
                                        <TouchableOpacity onPress={() => setGenres(genres.filter((_, i) => i !== index))}>
                                            <AntDesign name="close" size={14} color="#e74c3c" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        </View>
                        {/* Release Date */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📅 Release Date</Text>
                            <TouchableOpacity
                                style={styles.datePickerButton}
                                onPress={() => setShowDatePicker(true)}>
                                <Text style={styles.dateText}>
                                    {formatDate(releaseDate) ? formatDate(releaseDate) : 'Select date'}
                                </Text>
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={releaseDate}
                                    mode="date"
                                    is24Hour={true}
                                    display="default"
                                    onChange={onChange}
                                    minimumDate={new Date(2020, 0, 1)}
                                    maximumDate={new Date(2030, 11, 31)}
                                />
                            )}
                        </View>
                        {/* Age Rating */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Xếp hạng độ tuổi:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={ageRating}
                                    onValueChange={(itemValue) => setAgeRating(itemValue.toString())}
                                    style={styles.picker}
                                >
                                    {Object.entries(ageRatingLabels).map(([key, value]) => (
                                        <Picker.Item key={key} label={value} value={key} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* Status Picker */}
                        <View style={styles.fieldContainer}>
                            <Text style={styles.label}>Trạng thái phim:</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={status}
                                    onValueChange={(itemValue) => setStatus(itemValue)}
                                    style={styles.picker}
                                >
                                    {Object.entries(statusLabels).map(([key, value]) => (
                                        <Picker.Item key={key} label={value} value={key} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                        {/* Trailer URL */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎬 Movie Trailer URL</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie trailer URL"
                                placeholderTextColor="#888"
                                value={trailerUrl}
                                onChangeText={setTrailerUrl}
                            />
                        </View>
                        {/* Image */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>🎬 Movie Poster URL</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie poster URL"
                                placeholderTextColor="#888"
                                value={posterUrl}
                                onChangeText={setPosterUrl}
                            />
                        </View>
                        {/* <ImagePickerScreen imageUri={posterUrl} setImageUri={setPosterUrl} /> */}

                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity style={styles.createButton} onPress={() => handelCreateMovie()}>
                            <Text style={styles.createButtonText}>Create</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                {/* Footer */}

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 24,
        paddingHorizontal: 25,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 15,
        elevation: 10,
        maxHeight: '95%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    headerTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#333',
    },
    body: {
        paddingVertical: 5,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    required: {
        color: '#e74c3c',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    textAreaInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    datePickerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        backgroundColor: '#f9f9f9',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
    },
    dropdown: {
        borderColor: '#ddd',
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: '#f9f9f9',
        height: 50,
    },
    dropdownContainer: {
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    actorInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actorInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    addButton: {
        backgroundColor: '#0275d8',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    actorsList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
    },
    actorTag: {
        backgroundColor: '#e1f0ff',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
        marginBottom: 8,
    },
    actorName: {
        color: '#0275d8',
        marginRight: 5,
        fontSize: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
        backgroundColor: '#f8f9fa',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        color: '#555',
        fontSize: 16,
        fontWeight: '600',
    },
    createButton: {
        marginTop: 10,
        flex: 1,
        backgroundColor: '#0275d8',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    fieldContainer: {
        marginBottom: 15,
    },
    pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    marginBottom: 10,
  },
  picker: {
    height: 50,
  },
});

export default CreateModalMovie;
