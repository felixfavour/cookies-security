<template>
  <div class="cookies-home">
    <div class="inner">
      <h1>Log in to generate Token</h1>
      <form @submit.prevent>
        <label for="email">
          Email
          <input v-model="email" type="email" name="" id="">
        </label>
        <label for="password">
          Password
          <input v-model="password" type="password" name="" id="">
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

  const email = ref('')
  const password = ref('')

  const logIn = () => {
    const inSixHours = 0.25
    /**
     * [secure] attribute set to true to ensure that cookie is inaccessible by unsecure(HTTP) domains/host
     * [sameSite] attribute set to 'Strict' to ensure that the client sends the cookie to only sites with similar domain/origin as itself.
     * [expires] attribute set to 0.25 (six hours) to ensure that Cookie is gone before attackers can break down all walls of protection.
     */
    Cookies.set('jwt', generateRandomFakeJWT(), {
      secure: true,
      sameSite: 'Strict',
      expires: inSixHours
    })
    alert('Token generated')
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