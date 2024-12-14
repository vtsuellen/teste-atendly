<template>
  <div class="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 hidden transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:block sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <h1 class="mb-6 text-2xl font-bold text-center text-cyan-600">Registro</h1>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="nome" class="block text-sm font-medium text-gray-700">Nome</label>
            <input
              v-model="nome"
              type="text" 
              id="nome"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
            <p v-if="v$.nome.$error" class="mt-1 text-sm text-red-600">{{ v$.nome.$errors[0].$message }}</p>
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
            <p v-if="v$.email.$error" class="mt-1 text-sm text-red-600">{{ v$.email.$errors[0].$message }}</p>
          </div>
          <div>
            <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
            <input
              v-model="senha"
              type="password"
              id="senha"
              class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
            />
            <p v-if="v$.senha.$error" class="mt-1 text-sm text-red-600">{{ v$.senha.$errors[0].$message }}</p>
          </div>
          <button
            type="submit"
            class="flex justify-center w-full px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            Cadastrar
          </button>
        </form>
        <p v-if="error" class="mt-4 text-sm text-center text-red-600">{{ error }}</p>
        <p class="mt-4 text-sm text-center">
          Já tem uma conta?
          <router-link to="/login" class="font-medium text-cyan-600 hover:text-cyan-800">
            Faça login
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator, minLength } from '@vuelidate/validators'

const router = useRouter()
const nome = ref('')
const email = ref('')
const senha = ref('')
const error = ref(null)

const rules = {
  nome: { required, minLength: minLength(2) },
  email: { required, email: emailValidator },
  senha: { required, minLength: minLength(6) }
}

const v$ = useVuelidate(rules, { nome, email, senha })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  try {
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: nome.value,
        email: email.value,
        password: senha.value,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Erro ao registrar');
    }

    console.log('Registro bem-sucedido:', result);
    
    if (localStorage.getItem('token')) {
      router.push('/profile');
    }
  } catch (err) {
    error.value = err.message;
  }
};
</script>
