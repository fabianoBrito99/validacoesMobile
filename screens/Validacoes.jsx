import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

const Formulario = () => {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [celular, setCelular] = useState("");
  const [cep, setCep] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [mostrarCamposPais, setMostrarCamposPais] = useState(false);
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [errors, setErrors] = useState({});

  const validateNome = (value) => /^[A-Za-zÀ-ÿ]+\s[A-Za-zÀ-ÿ]+$/.test(value);
  const validateNomePai = (value) => /^[A-Za-zÀ-ÿ]+\s[A-Za-zÀ-ÿ]+$/.test(value);
  const validateNomeMae = (value) => /^[A-Za-zÀ-ÿ]+\s[A-Za-zÀ-ÿ]+$/.test(value);
  const validateCPF = (value) => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(value);
  const validatePhone = (value, type = "mobile") =>
    type === "landline"
      ? /^\(\d{2}\) \d{4}-\d{4}$/.test(value)
      : /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
  const validateCEP = (value) => /^\d{5}-\d{3}$/.test(value);
  const validateEmail = (value) => /^[\w-.]+@[\w-]+\.[a-z]{2,}$/.test(value);
  const validateSenha = (value) => /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
  const validateDataNascimento = (value) => /^\d{2}\/\d{2}\/\d{4}$/.test(value);

  const calcularIdade = (data) => {
    const hoje = new Date();
    const partes = data.split("/");
    if (partes.length !== 3) return 0;
    const nascimento = new Date(`${partes[2]}-${partes[1]}-${partes[0]}`);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  };

  const handleValidation = (field, value) => {
    let errorMsg = "";
    switch (field) {
      case "nome":
        if (!validateNome(value)) errorMsg = "Insira nome e sobrenome";
        break;
      case "nomePai":
        if (!validateNomePai(value))
          errorMsg = "Insira nome e sobrenome do seu Pai";
        break;
      case "nomeMae":
        if (!validateNomeMae(value))
          errorMsg = "Insira nome e sobrenome da sua Mãe";
        break;

      case "dataNascimento":
        if (!validateDataNascimento(value)) errorMsg = "Formato inválido";
        else setMostrarCamposPais(calcularIdade(value) < 18);
        break;
      case "cpf":
        if (!validateCPF(value)) errorMsg = "CPF inválido";
        break;
      case "telefone":
        if (!validatePhone(value, "landline")) errorMsg = "Formato inválido";
        break;
      case "celular":
        if (!validatePhone(value)) errorMsg = "Formato inválido";
        break;
      case "cep":
        if (!validateCEP(value)) errorMsg = "CEP inválido";
        break;
      case "email":
        if (!validateEmail(value)) errorMsg = "Email inválido";
        break;
      case "senha":
        if (!validateSenha(value)) errorMsg = "Senha fraca";
        break;
      case "confirmarSenha":
        if (value !== senha) errorMsg = "Senhas não coincidem";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        {step === 1 && (
          <>
            <Text>Nome Completo:</Text>
            <TextInput
              style={[styles.input, errors.nome && styles.errorInput]}
              onChangeText={(text) => {
                setNome(text);
                handleValidation("nome", text);
              }}
              value={nome}
            />
            {errors.nome && <Text style={styles.errorText}>{errors.nome}</Text>}

            <Text>Data de Nascimento:</Text>
            <TextInput
              style={[styles.input, errors.dataNascimento && styles.errorInput]}
              onChangeText={(text) => {
                setDataNascimento(text);
                handleValidation("dataNascimento", text);
              }}
              value={dataNascimento}
            />
            {errors.dataNascimento && (
              <Text style={styles.errorText}>{errors.dataNascimento}</Text>
            )}

            {mostrarCamposPais && (
              <>
                <Text style={styles.menor}>
                  Como Você é de Menor, informe os dados dos seus reponsaveis
                </Text>

                <Text>Nome do Pai:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNomePai}
                  value={nomePai}
                />

                <Text>Nome da Mãe:</Text>
                <TextInput
                  style={styles.input}
                  onChangeText={setNomeMae}
                  value={nomeMae}
                />
              </>
            )}

            <Text>CPF:</Text>
            <TextInput
              style={[styles.input, errors.cpf && styles.errorInput]}
              onChangeText={(text) => {
                setCpf(text);
                handleValidation("cpf", text);
              }}
              value={cpf}
              keyboardType="numeric"
            />
            {errors.cpf && <Text style={styles.errorText}>{errors.cpf}</Text>}

            <Text>Telefone:</Text>
            <TextInput
              style={[styles.input, errors.telefone && styles.errorInput]}
              onChangeText={(text) => {
                setTelefone(text);
                handleValidation("telefone", text);
              }}
              value={telefone}
            />
            {errors.telefone && (
              <Text style={styles.errorText}>{errors.telefone}</Text>
            )}

            <Text>Celular:</Text>
            <TextInput
              style={[styles.input, errors.celular && styles.errorInput]}
              onChangeText={(text) => {
                setCelular(text);
                handleValidation("celular", text);
              }}
              value={celular}
            />
            {errors.celular && (
              <Text style={styles.errorText}>{errors.celular}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text>CEP:</Text>
            <TextInput
              style={[styles.input, errors.cep && styles.errorInput]}
              onChangeText={(text) => {
                setCep(text);
                handleValidation("cep", text);
              }}
              value={cep}
            />
            {errors.cep && <Text style={styles.errorText}>{errors.cep}</Text>}

            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Próximo</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text>Email:</Text>
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              onChangeText={(text) => {
                setEmail(text);
                handleValidation("email", text);
              }}
              value={email}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <Text>Senha:</Text>
            <TextInput
              style={[styles.input, errors.senha && styles.errorInput]}
              onChangeText={(text) => {
                setSenha(text);
                handleValidation("senha", text);
              }}
              value={senha}
              secureTextEntry
            />
            {errors.senha && (
              <Text style={styles.errorText}>{errors.senha}</Text>
            )}

            <Text>Confirmar Senha:</Text>
            <TextInput
              style={[styles.input, errors.confirmarSenha && styles.errorInput]}
              onChangeText={(text) => {
                setConfirmarSenha(text);
                handleValidation("confirmarSenha", text);
              }}
              value={confirmarSenha}
              secureTextEntry
            />
            {errors.confirmarSenha && (
              <Text style={styles.errorText}>{errors.confirmarSenha}</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  menor: {
    backgroundColor: "yellow",
    color: "#000",
    padding: 15,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});

export default Formulario;
