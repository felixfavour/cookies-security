<template>
  <div class="cookies-home">
    <div class="inner">
      <h1>Log in to generate Token</h1>
      <form @submit.prevent>
        <label for="email">
          Email
          <input v-model="email" type="email" id="email">
        </label>
        <label for="password">
          Password
          <input v-model="password" type="password" id="pass">
        </label>
        <button :disabled="!(email.length > 4 && password.length > 1)" type="submit" @click="logIn">
          Log in
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
  import Cookies from 'js-cookie'
  import CryptoJS from 'crypto-js'

  const email = ref('')
  const password = ref('')
  const config = useRuntimeConfig()

  if (process.server) {
    console.log('SERVER-SIDE')
  }

  if (process.client) {
    console.log('CLIENT-SIDE')
  }

  const logIn = () => {
    storeEncryptedCookie()
    alert('Token generated')
  }

  const storeEncryptedCookie = () => {
    const inSixHours = 0.25
    const randomJWT = generateRandomFakeJWT()

    /**
     * Encrypt JWT with encryptionKey from ENV variable
     * [-NOTE-: Comment above is only used for educative purpose, should not be used similarly in practice]
     * When an attacker knows where to look, information security is compromised by a step;
     * With diligence from attacker, whole system can be easily compromised.
     */
    const encryptedRandomJWT = CryptoJS.AES.encrypt(randomJWT, config.encKey).toString()
    console.log(encryptedRandomJWT)
    
    /**
     * [secure] attribute set to true to ensure that cookie is inaccessible by unsecure(HTTP) domains/host
     * [sameSite] attribute set to 'Strict' to ensure that the client sends the cookie to only sites with similar domain/origin as itself.
     * [expires] attribute set to 0.25 (six hours) to ensure that Cookie is gone before attackers can break down all walls of protection.
     */
    Cookies.set('jwt', encryptedRandomJWT, {
      secure: true,
      sameSite: 'Strict',
      expires: inSixHours
    })
  }

  /**
   * Function to generate a random string that looks similar to a JWT string.
   */
  const generateRandomFakeJWT = () => {
    return `${Math.ceil(Math.random() * 1000)}-${Math.ceil(Math.random() * 1000)}-${Math.ceil(Math.random() * 1000)}-${Math.ceil(Math.random() * 1000)}`
  }
</script>

<style scoped>
  
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
  }
  .cookies-home {
    display: grid;
    place-items: center;
  }
  .cookies-home .inner {
    max-width: 400px;
  }
</style>