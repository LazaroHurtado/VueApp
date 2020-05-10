<template v-if="this.$props.data">
  <div>
    <div class="profilecontainer">
      <div v-if="!this.updateProfile" class="topbar">
        <Logout v-if="ownAccount" />
        <div v-if="ownAccount" class="options">
          <button v-if="this.toggleOptions" v-on:click="editProfile" id="options">Edit Profile</button>
          <Delete v-if="this.toggleOptions" :username="data.username" />
          <font-awesome-icon v-if="this.toggleOptions" v-on:click="this.seeOptions" icon="times" id="times" />
          <button v-else v-on:click="seeOptions" id="options">
            <font-awesome-icon icon="cog" id="cog" />
          </button>
        </div>
      </div>
      <div v-if="!this.updateProfile" class="profile">
        <div class="imagediv">
          <img :src="data.image" alt="profile picture" />
        </div>
      </div>
      <div v-if="this.updateProfile" class="profile">
        <div class="imagediv">
          <img :src="userInfo.image || data.image" alt="profile picture" />
        </div>
        <label for="img" id="uploadimg">
          <font-awesome-icon icon="upload" id="uploadicon" />Upload image
        </label>
        <input
          @change="onFileChange"
          type="file"
          ref="fileInput"
          id="img"
          name="img"
          accept="image/png, image/jpeg"
          class="inputfile"
        />
      </div>
      <div v-if="refreshEdits">
        <h3 id="refreshedits">Refresh page to view changes</h3>
      </div>
      <div class="userInfo" v-if="!this.updateProfile">
        <h1>@{{ data.username }}</h1>
        <h2>{{ data.first_name}} {{ data.last_name }}</h2>
        <h3>{{ data.address }}</h3>
        <h3>{{ data.state }}, {{ data.city }}</h3>
      </div>
      <div class="userEdits" v-if="this.updateProfile">
        <p>Leave what you don't want to update empty</p>
        <div id="inputoption">
          <label for="username">Username:</label>
          <input
            type="text"
            name="username"
            :placeholder="[[ data.username ]]"
            v-model="userInfo.username"
          />
        </div>
        <div id="inputoption">
          <label for="password">Password:</label>
          <input type="text" name="password" placeholder="********" v-model="userInfo.password" />
        </div>
        <div id="inputoption">
          <label for="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            :placeholder="[[ data.first_name ]]"
            v-model="userInfo.first_name"
          />
        </div>
        <div id="inputoption">
          <label for="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            :placeholder="[[ data.last_name ]]"
            v-model="userInfo.last_name"
          />
        </div>
        <div id="inputoption">
          <label for="address">Address:</label>
          <input
            type="text"
            name="address"
            :placeholder="[[ data.address ]]"
            v-model="userInfo.address"
          />
        </div>
        <div id="inputoption">
          <label for="state">State:</label>
          <input type="text" name="state" :placeholder="[[ data.state ]]" v-model="userInfo.state" />
        </div>
        <div id="inputoption">
          <label for="city">City:</label>
          <input type="text" name="city" :placeholder="[[ data.city ]]" v-model="userInfo.city" />
        </div>
      </div>
      <div class="updateoption" v-if="this.updateProfile">
        <button v-on:click="editProfile" id="options">Cancel</button>
        <Update v-on:click.native="editDone" :data="this.userInfo" :username="this.data.username" />
      </div>
    </div>
    <Favorites v-if="!this.updateProfile" />
  </div>
</template>

<script>
import Logout from "../components/Logout.vue";
import Update from "../components/Update.vue";
import Delete from "../components/Delete.vue";
import Favorites from "../components/Favorites.vue"

export default {
  name: "ProfileCard",
  components: {
    Logout,
    Update,
    Delete,
    Favorites
  },
  data() {
    return {
      toggleOptions: false,
      updateProfile: false,
      refreshEdits: false,
      userInfo: {
        image: "",
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        address: "",
        city: "",
        state: ""
      }
    };
  },
  props: {
    data: Object
  },
  computed: {
    ownAccount() {
      return this.data.username == this.$store.getters.username;
    }
  },
  methods: {
    editDone() {
      setTimeout(() => {
        this.toggleOptions = !this.toggleOptions;
        this.updateProfile = !this.updateProfile;
        this.refreshEdits = true;
      }, 1000);
    },
    onFileChange() {
      const input = this.$refs.fileInput;
      const files = input.files;
      if (files && files[0]) {
        const reader = new FileReader();
        reader.onload = e => {
          this.userInfo.image = e.target.result;
        };
        reader.readAsDataURL(files[0]);
      }
    },
    seeOptions() {
      this.toggleOptions = !this.toggleOptions;
    },
    editProfile() {
      this.updateProfile = !this.updateProfile;
    }
  }
};
</script>

<style scoped>
#cog {
  color: #293250;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

#uploadimg,
#uploadicon {
  color: #fff;
}

#refreshedits {
  color: #fff;
}

.labels,
.inputs {
  display: flex;
  flex-direction: column;
}

label:hover {
  cursor: pointer;
}

button:hover {
  cursor: pointer;
}

.updateoption {
  display: flex;
  justify-content: center;
  align-items: center;
}

.topbar {
  display: flex;
  justify-content: space-between;
}

.options {
  display: flex;
}

.imagediv {
  width: 200px;
  height: 200px;
}

#options {
  color: #293250;
  text-align: center;
  font-size: 15px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  outline: 0;
  border-radius: 15px;
  background: #6dd47e;
}

#times {
  color: #293250;
  text-align: center;
  font-size: 15px;
  height: 30px;
  padding: 0 10px;
  margin-left: 20px;
  border: 0;
  outline: 0;
  border-radius: 15px;
  background: #fc5918;
}

img {
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 500px;
}

h1,
h2,
h3 {
  margin: 0;
  color: #293250;
}

h1,
h2 {
  margin-top: 5px;
  margin-bottom: 5px;
}

.profilecontainer {
  border-radius: 10px;
  margin-top: 25px;
  margin-left: auto;
  margin-right: auto;
  border: 5px solid #6dd47e;
  background: #293250;
  width: 50%;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
}

.profile {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.userInfo {
  margin-top: 15px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  color: black;
  background: #fff;
  border-radius: 10px;
}

.userEdits {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 10px 0px;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  color: black;
  background: #fff;
  border-radius: 10px;
}

#inputoption {
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0;
}

label {
  color: #293250;
}

input {
  margin-left: 10px;
  border-radius: 10px;
  text-align: center;
  height: 20px;
  border: 2px solid #293250;
  outline: 0;
}
</style>
