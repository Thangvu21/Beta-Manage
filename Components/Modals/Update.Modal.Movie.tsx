import { AgeRating, MovieData, Status } from "@/constants/film";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Alert, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import ImagePickerScreen from "../Camera/ImagePicker";
import { imagesUrl } from "@/constants/image";
import { MovieDetailData } from "@/constants/film";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from '@react-native-community/datetimepicker';
import axiosClient from "@/constants/axiosClient";
import { API } from "@/constants/api";

interface props {
    modalUpdateVisible: boolean,
    setModalUpdateVisible: (visible: boolean) => void
    movie: MovieDetailData, // sau sẽ thay bằng moviedetaildata
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


const UpdateModalMovie = ({
    modalUpdateVisible,
    setModalUpdateVisible,
    movie,
    listMovie,
    setListMovie
}: props) => {



    // const [image, setImage] = useState<string>(movie?.posterUrl || '');
    const [title, setTitle] = useState<string>(movie.title || '');
    const [description, setDescription] = useState<string>(movie.description || '');
    const [releaseDate, setReleaseDate] = useState<Date>(movie.releaseDate || '');
    const [language, setLanguage] = useState<string>(movie.language || '');
    const [director, setDirector] = useState<string>(movie.director || '');
    const [actors, setActors] = useState<string[]>(movie.actors || []);
    const [duration, setDuration] = useState<string>(movie.duration.toString() || '');
    const [genres, setGenres] = useState<string[]>(movie.genres || []);
    const [posterUrl, setPosterUrl] = useState<string>(movie.posterUrl || '');
    const [trailerUrl, setTrailerUrl] = useState<string>(movie.trailerUrl || '');
    const [status, setStatus] = useState<string>(movie.status || '');
    const [ageRating, setAgeRating] = useState<string>(movie.ageRating || '');


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

    const handelAfterUpdateMovie = () => {
        setTitle(title);
        setDescription(description);
        setReleaseDate(releaseDate);
        setLanguage(language);
        setDirector(director);
        setActors(actors);
        setDuration(duration);
        setGenres(genres);
        setPosterUrl(posterUrl);
        setTrailerUrl(trailerUrl);
        setStatus(status);
        setAgeRating(ageRating);

        movie.title = title;
        movie.description = description;
        movie.releaseDate = releaseDate;
        movie.language = language;
        movie.director = director;
        movie.actors = actors;
        movie.duration = Number(duration);
        movie.genres = genres;
        movie.posterUrl = posterUrl;
        movie.trailerUrl = trailerUrl;
        movie.status = status;
        movie.ageRating = ageRating;
    }

    const handleUpdateListMovie = () => {
        const updateMovie: MovieData = {
            id: movie.id,
            title: title,
            posterUrl: posterUrl,
            releaseDate: new Date(releaseDate),
            ageRating: ageRating,
        }
        const updatedListMovie = listMovie.map((item) => {
            if (item.id === movie.id) {
                return { ...item, ...updateMovie };
            }
            return item;
        });
        setListMovie(updatedListMovie);
    }

    // ban ddaua fetch
    useEffect(() => {
        setTitle(movie.title);
        setDescription(movie.description);
        setReleaseDate(movie.releaseDate);
        setLanguage(movie.language);
        setDirector(movie.director);
        setActors(movie.actors);
        setDuration(movie.duration.toString());
        setGenres(movie.genres);
        setPosterUrl(movie.posterUrl);
        setTrailerUrl(movie.trailerUrl);
        setStatus(movie.status);
        setAgeRating(movie.ageRating);
    }, [movie])

    const handelUpdateMovie = async () => {

        if (!title || !releaseDate || !posterUrl) {
            Alert.alert("Please fill all fields");
            return;
        }

        try {
            const response = await axiosClient.patch(`${API.updateFilm}/${movie.id}`, {
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
            console.log("Update movie response:", response.data);
            if (response.status === 200) {
                Alert.alert("Success", "Movie updated successfully");
            }
        } catch (error) {
            console.error("Error updating movie:", error);
            Alert.alert("Error", "Failed to update movie");

        }

        handelAfterUpdateMovie();
        handleUpdateListMovie();
        // Gửi API
        setModalUpdateVisible(!modalUpdateVisible);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalUpdateVisible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setModalUpdateVisible(false);
            }}
        >
            <View style={styles.modalWrapper}>
                <View style={styles.modalContainer}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>Update Movie</Text>
                        <Pressable onPress={() => setModalUpdateVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </Pressable>
                        <TouchableOpacity
                            style={{ padding: 10 }}
                            onPress={() => setModalUpdateVisible(false)}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    {/* Body */}
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
                            // multiline = {true}
                            // numberOfLines={2}
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
                                {movie && (
                                    <Text style={styles.dateText}>
                                        {formatDate(new Date(releaseDate)) ? formatDate(new Date(releaseDate)) : 'Select date'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                            {showDatePicker && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={new Date(releaseDate)}
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
                        {/* <ImagePickerScreen imageUri={posterUrl} setImageUri={setPosterUrl} /> */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>📸 Movie Poster URL</Text>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Enter movie poster URL"
                                placeholderTextColor="#888"
                                value={posterUrl}
                                onChangeText={setPosterUrl}
                            />
                        </View>

                    </ScrollView>

                    {/* Footer */}
                    <View className="mt-1 mb-1">
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handelUpdateMovie}>
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Update</Text>

                        </TouchableOpacity>
                    </View>
                    <View className="mt-1 mb-1">
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => setModalUpdateVisible(false)}
                        >
                            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        paddingBottom: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    body: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 5,
        color: '#444',
    },
    textInput: {
        height: 45,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#f5f5f5',
    },
    button: {
        backgroundColor: '#5cb85c',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 5,
    },


    // New
    inputGroup: {
        marginBottom: 10,
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
    picker: {
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
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
    actorInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
});


export default UpdateModalMovie;