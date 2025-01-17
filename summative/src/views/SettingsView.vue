<template>
  <div class="settings-container">
    <h1>Settings</h1>

    <form @submit="handleSubmit" class="form">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input
          v-model="firstName"
          type="text"
          id="firstName"
          class="input-field"
          :disabled="isGoogleUser" 
        />
      </div>

      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input
          v-model="lastName"
          type="text"
          id="lastName"
          class="input-field"
          :disabled="isGoogleUser" 
        />
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          v-model="email"
          type="email"
          id="email"
          class="input-field"
          disabled 
        />
      </div>

      <div class="form-group" v-if="!isGoogleUser">
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          id="password"
          class="input-field"
          placeholder="Enter new password"
        />
      </div>


      <button type="submit" class="button save" :disabled="isGoogleUser">Save Changes</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from '@/stores'; 

const store = useStore(); 

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');

const isGoogleUser = computed(() => {
  return store.user?.providerData?.some(provider => provider.providerId === 'google.com');
});

onMounted(() => {
  if (store.user) {
    firstName.value = store.user.firstName || '';
    lastName.value = store.user.lastName || '';
    email.value = store.user.email || '';
  }
});


const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isGoogleUser.value) {
    if (password.value) {
      try {
        await store.updateUserPassword(password.value);
        alert('Password updated successfully!');
      } catch (error) {
        console.error('Failed to update password:', error);
        alert('Failed to update password.');
      }
    }

    await store.updateUserProfile(firstName.value, lastName.value);

    alert('Settings updated!');
  } else {
    alert('You cannot edit your details as you signed in with Google.');
  }
};
</script>


<style scoped>
body {
  background-color: black;
  color: white;
  margin: 0;
  font-family: 'Trebuchet MS', Arial, sans-serif;
}

.settings-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  padding: 20px;
}

h1 {
  color: black;
  font-size: 2rem;
  margin-bottom: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.form {
  width: 100%;
  max-width: 500px;
  background-color: #222;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #333;
  color: white;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

button.save {
  background-color: #571295;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 20px;
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

button.save:hover {
  background-color: #5e1eaf;
}

label {
  font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  color: white;
}
</style>
