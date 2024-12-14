<template>
  <div class="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 hidden transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:block sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <h1 class="text-3xl font-extrabold text-center text-cyan-600">Login</h1>
          <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <input
                v-model="email"
                type="email"
                id="email"
                autocomplete="email"
                required
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
              <p v-if="v$.email.$error" class="mt-1 text-sm text-red-600">{{ v$.email.$errors[0].$message }}</p>
            </div>
            <div>
              <label for="senha" class="block text-sm font-medium text-gray-700">Senha</label>
              <input
                v-model="senha"
                type="password"
                id="senha"
                autocomplete="current-password"
                required
                class="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500"
              />
              <p v-if="v$.senha.$error" class="mt-1 text-sm text-red-600">{{ v$.senha.$errors[0].$message }}</p>
            </div>
            <button
              type="submit"
              class="w-full px-4 py-2 text-sm font-medium text-white rounded-md shadow-sm bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Entrar
            </button>
          </form>
          <p v-if="error" class="mt-4 text-sm text-center text-red-600">{{ error }}</p>
          <p class="mt-4 text-sm text-center">
            Não tem uma conta?
            <router-link to="/register" class="font-medium text-cyan-600 hover:text-cyan-500">
              Crie uma agora
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email as emailValidator } from '@vuelidate/validators'

const router = useRouter()
const email = ref('')
const senha = ref('')
const error = ref(null)

const rules = {
  email: { required, email: emailValidator },
  senha: { required }
}

const v$ = useVuelidate(rules, { email, senha })

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate();
  if (!isFormCorrect) return;

  try {
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: senha.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Credenciais inválidas');
    }

    const data = await response.json();

    localStorage.setItem('token', data.token);
    console.log('Token armazenado:', localStorage.getItem('token')); 
       
    if (localStorage.getItem('token')) {
      router.push('/profile');
    }
  } catch (err) {
    error.value = 'Erro ao fazer login, tente novamente.';
    console.error(err);
  }
}
</script>
