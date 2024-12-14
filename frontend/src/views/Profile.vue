<template>
  <div class="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div class="absolute inset-0 hidden transform -skew-y-6 shadow-lg bg-gradient-to-r from-cyan-400 to-light-blue-500 sm:block sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div v-if="user">
            <div class="divide-y divide-gray-200">
              <div class="py-8 space-y-4 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7">
                <h2 class="text-3xl font-extrabold text-cyan-600">Perfil do Usuário</h2>
                <div class="flex items-center">
                  <User class="w-5 h-5 mr-2 text-cyan-500" />
                  <p class="font-medium">Nome: {{ user.name }}</p>
                </div>
                <div class="flex items-center">
                  <Mail class="w-5 h-5 mr-2 text-cyan-500" />
                  <p class="font-medium">Email: {{ user.email }}</p>
                </div>
                <div class="flex items-center">
                  <Lock class="w-5 h-5 mr-2 text-cyan-500" />
                  <p class="font-medium">Senha: ********</p>
                </div>
              </div>
              <div class="pt-6 text-base font-bold leading-6 sm:text-lg sm:leading-7">
                <p class="text-cyan-600 hover:text-cyan-700">
                  <button @click="logout" class="flex items-center">
                    <LogOut class="w-5 h-5 mr-2" />
                    Sair
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, Mail, Lock, LogOut } from 'lucide-vue-next'

const router = useRouter()
const user = ref(null)
const showChangePasswordModal = ref(false)

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      throw new Error('Não autenticado')
    }
    const response = await fetch('http://localhost:5000/api/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Não autenticado')
      }
      throw new Error('Falha ao carregar o perfil')
    }

    user.value = await response.json()
  } catch (err) {
    console.error('Erro ao buscar perfil:', err)
    router.push('/login')
  }
}

const logout = () => {
  sessionStorage.removeItem('token')
  router.push('/login')
}

onMounted(fetchUserProfile)
</script>
