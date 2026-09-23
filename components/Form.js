import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
} from "react-native";

import { useForm, Controller } from "react-hook-form";

import FormField from "./FormField";

export default function Form({ onSubmit }) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        mode: "onChange",

        defaultValues: {
            fullName: "",
            email: "",
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
                                return "La edad tiene que ser mayor a 12";
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
                        !isValid && styles.disabledButton,
                    ]}
                    onPress={handleSubmit(onSubmit)}
                    disabled={!isValid}
                >
                    <Text style={styles.submitText}>
                        Confirmar inscripción
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    form: {
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },

    label: {
        fontSize: 16,
        marginBottom: 8,
    },

    options: {
        marginBottom: 16,
    },

    optionsRow: {
        flexDirection: "row",
        gap: 10,
    },

    option: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 8,
    },

    selectedOption: {
        backgroundColor: "#ddd",
    },

    submitButton: {
        padding: 14,
        borderRadius: 8,
        backgroundColor: "#333",
        alignItems: "center",
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
        color: "red",
        marginTop: 4,
    },
});