<template>
  <div>
    <img
      ref="avatarImageRef"
      :src="avatarImage"
      :uk-tooltip="$t('user.avatarUpdate')"
      uk-toggle="target: #avatarModalBox"
      class="cursor-pointer img-avatar"
      uk-img
    />
    <div v-if="val" class="uk-position-top-right">
      <span
        uk-icon="icon: trash"
        class="uk-text-danger cursor-pointer"
        :uk-tooltip="$t('user.avatarRemove')"
        @click="avatarRemove"
      ></span>
    </div>

    <!-- MODAL BOX -->
    <div id="avatarModalBox" uk-modal>
      <div class="uk-modal-dialog uk-modal-body">
        <h2 class="uk-modal-title">{{ $t("avatar.userAvatar") }}</h2>
        <p>{{ $t("avatar.makeChoice") }}</p>
        <div>
          <div class="uk-card uk-card-default uk-card-hover uk-text-center">
            <vue-cropper
              ref="cropper"
              :img-style="{ width: '450px', height: '450px' }"
              :guides="true"
              :background="false"
              :min-container-width="540"
              :min-container-height="450"
              :aspect-ratio="1 / 1"
              :src="avatarImage"
              :view-mode="2"
              :modal="true"
            />
            <div class="actions">
              <button
                class="uk-button uk-button-secondary uk-width-1-1"
                @click="showFileChooser"
              >
                {{ $t("avatar.choosePhoto") }}
              </button>
            </div>
          </div>
        </div>

        <p class="uk-text-right">
          <button
            class="uk-button uk-button-primary uk-width-1-2"
            type="button"
            @click="setAvatar"
          >
            {{ $t("avatar.ok") }}
          </button>
          <button
            class="uk-button uk-button-danger uk-modal-close uk-width-1-2"
            type="button"
          >
            {{ $t("avatar.cancel") }}
          </button>
        </p>
      </div>
    </div>

    <!-- File Chooser -->
    <input
      ref="dialogAvatarChoose"
      type="file"
      accept="image/"
      class="uk-hidden"
      @change="setImage"
    />
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { computed, ref } from "vue";
import { useToast } from "vue-toastification";

export default {
  components: { VueCropper },
  props: {
    modelValue: { type: String, required: false },
    url: {type: String, required: false}
  },
  setup(props, { emit }) {
    let avatarImage = ref(new String)
    const app_api = process.env.VUE_APP_API;
    const dialogAvatarChoose = ref();
    const cropper = ref();
    const avatarImageRef = ref();
    const toast = useToast();
    let avatarUpdated = false;

    const val = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    if(val.value){
      avatarImage.value = `${props.url}/uploads/${val.value}`
    } else {
      avatarImage.value = '/no-avatar.png'
    }
    //avatarImageRef.value.src = `${props.url}/uploads/${props.modelValue}`
    // `${props.url}/uploads/${props.modelValue}`
    //val.value = `${props.url}/uploads/${props.modelValue}`

    // Methods
    const showFileChooser = () => {
      dialogAvatarChoose.value.click();
    };

    const setAvatar = () => {
      UIkit.modal("#avatarModalBox").hide();
      avatarImageRef.value.src = cropper.value
        .getCroppedCanvas({ width: 500, height: 500 })
        .toDataURL();
      val.value = avatarImageRef.value.src;
      avatarUpdated = true;
    };

    const setImage = (e) => {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        toast.error("Пожалуйста выберите изображение!");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          cropper.value.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        toast.error("К сожалению, FileReader API не поддерживается!");
      }
    };

    const avatarRemove = () => {
      UIkit.modal.confirm(`Удалить аватар для пользователя ${this.name}?`).then(
        () => {
          axios
            .patch(
              `${app_api}/user/${this.user._id}`,
              {
                avatarRemove: true,
              },
              requestOptions.headersData()
            )
            .then((response) => {
              toast.success(response.data.message);
              avatarImageRef.value.src = "/no-avatar.png";
            })
            .catch((err) => this.toast.error(err.message));
        },
        () => toast.success(`Вы отменили удаление аватара`)
      );
    };

    return {
      dialogAvatarChoose,
      avatarUpdated,
      cropper,
      avatarImageRef,
      avatarImage,
      val,
      setAvatar,
      setImage,
      showFileChooser,
      avatarRemove,
    };
  },
};
</script>

<style>
</style>