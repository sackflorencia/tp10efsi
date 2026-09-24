import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
    ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import FormField from "./FormField";

export default function Form({ onSubmit, lastEmail }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid, isSubmitting },
    } = useForm({
        mode: "onChange",

        defaultValues: {
            fullName: "",
            email: lastEmail || "",
            age: "",
            entryType: "",
            phone: "",
        },
    });

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={styles.form}>
                <Text style={styles.title}>Formulario de inscripción</Text>

                <Controller
                    control={control}
                    name="fullName"
                    rules={{
                        required: "Ingresá tu nombre completo",
                        minLength: {
                            value: 3,
                            message: "Ingresá tu nombre completo",
                        },
                        validate: (value) =>
                            value.trim().length >= 3 ||
                            "Ingresá tu nombre completo",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Nombre completo"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu nombre completo"
                            error={errors.fullName?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="email"
                    rules={{
                        required: "Ingresá un email válido",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingresá un email válido",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Email"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu email"
                            keyboardType="email-address"
                            error={errors.email?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="age"
                    rules={{
                        required: "La edad tiene que ser mayor a 12",
                        validate: (value) => {
                            const age = Number(value);

                            if (age < 12 || age > 99) {
                                return "La edad tiene que ser mayor a 12 y menor a 99";
                            }

                            return true;
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Edad"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu edad"
                            keyboardType="numeric"
                            error={errors.age?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="phone"
                    rules={{
                        pattern: {
                            value: /^[0-9]+$/,
                            message: "Solo se permiten números",
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Teléfono"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu teléfono"
                            keyboardType="phone-pad"
                            error={errors.phone?.message}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="entryType"
                    rules={{
                        required: "Elegí un tipo de entrada",
                    }}
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.options}>
                            <Text style={styles.label}>Tipo de entrada</Text>

                            <View style={styles.optionsRow}>
                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        value === "general" &&
                                        styles.selectedOption,
                                    ]}
                                    onPress={() => onChange("general")}
                                >
                                    <Text>General</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[
                                        styles.option,
                                        value === "vip" &&
                                        styles.selectedOption,
                                    ]}
                                    onPress={() => onChange("vip")}
                                >
                                    <Text>VIP</Text>
                                </TouchableOpacity>
                            </View>

                            {errors.entryType && (
                                <Text style={styles.error}>
                                    {errors.entryType.message}
                                </Text>
                            )}
                        </View>
                    )}
                />

                <TouchableOpacity
                    style={[
                        styles.submitButton,
                        (!isValid || isSubmitting) && styles.disabledButton,
                    ]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid || isSubmitting}
                >
                    {isSubmitting ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator color="white" />
                            <Text style={styles.submitText}>Enviando...</Text>
                        </View>
                    ) : (
                        <Text style={styles.submitText}>
                            Confirmar inscripción
                        </Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "transparent",
    },

    loadingContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },

    form: {
        padding: 24,
        paddingBottom: 40,
        backgroundColor: "rgba(225, 239, 242, 0.50)",
        borderRadius: 20,
        margin: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#224E6B",
        marginBottom: 28,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#224E6B",
        marginBottom: 8,
    },

    options: {
        marginBottom: 20,
    },

    optionsRow: {
        flexDirection: "row",
        gap: 12,
    },

    option: {
        flex: 1,
        padding: 14,
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#45749C",
        borderRadius: 10,
        alignItems: "center",
        backgroundColor: "rgba(225, 255, 255, 0.70)",
    },

    selectedOption: {
        backgroundColor: "#45749C",
        borderColor: "#224E6B",
    },

    submitButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: "#224E6B",
        alignItems: "center",
        marginTop: 8,
    },

    disabledButton: {
        opacity: 0.5,
    },

    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },

    error: {
        color: "#B23A48",
        marginTop: 5,
        fontSize: 13,
        fontWeight: "500",
    },
});