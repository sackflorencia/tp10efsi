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
    const { control, handleSubmit } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            age: "",
            entryType: "general",
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
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Nombre completo"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu nombre completo"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Email"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu email"
                            keyboardType="email-address"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="age"
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Edad"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu edad"
                            keyboardType="numeric"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="phone"
                    render={({ field: { onChange, value } }) => (
                        <FormField
                            label="Teléfono"
                            value={value}
                            onChangeText={onChange}
                            placeholder="Ingresá tu teléfono"
                            keyboardType="phone-pad"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="entryType"
                    render={({ field: { onChange, value } }) => (
                        <View style={styles.options}>
                            <TouchableOpacity
                                style={[
                                    styles.option,
                                    value === "general" && styles.selectedOption,
                                ]}
                                onPress={() => onChange("general")}
                            >
                                <Text>General</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[
                                    styles.option,
                                    value === "vip" && styles.selectedOption,
                                ]}
                                onPress={() => onChange("vip")}
                            >
                                <Text>VIP</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(onSubmit)}
                >
                    <Text style={styles.submitText}>Inscribirse</Text>
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
});